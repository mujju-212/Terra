import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── 1. OBearth: Hyper-Realistic NASA Blue Marble Surface Shader ───
const realisticEarthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vPositionView = mvPosition.xyz;
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const realisticEarthFragmentShader = `
  uniform sampler2D uDayMap;
  uniform sampler2D uBumpMap;
  uniform sampler2D uOceanMask;
  uniform sampler2D uNightMap;
  uniform sampler2D uCloudsMap;
  uniform vec3 uSunDirection;
  uniform float uCloudOffset;
  uniform float uLoaded;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 normalW = normalize(vWorldNormal);
    vec3 tangentW = normalize(cross(vec3(0.0, 1.0, 0.0), normalW));
    if (length(tangentW) < 0.001) tangentW = vec3(1.0, 0.0, 0.0);
    vec3 bitangentW = normalize(cross(normalW, tangentW));

    // ─── Ocean vs Land Specular & Mask ───
    // Ocean mask: water is near 0.0, land is near 1.0 in this mask
    float oceanFactor = 1.0 - smoothstep(0.12, 0.85, texture2D(uOceanMask, vUv).r);

    // Subtle refined topographic relief on land only (zero bump on smooth water)
    vec2 texStep = vec2(0.00045, 0.00045);
    float hC = texture2D(uBumpMap, vUv).r;
    float hR = texture2D(uBumpMap, vUv + vec2(texStep.x, 0.0)).r;
    float hU = texture2D(uBumpMap, vUv + vec2(0.0, texStep.y)).r;

    float bumpIntensity = 0.007 * (1.0 - oceanFactor * 0.95);
    vec3 perturbedNormalW = normalize(normalW - bumpIntensity * ((hR - hC) * tangentW + (hU - hC) * bitangentW));

    // ─── Solar Lighting & Luminous Atmosphere ───
    vec3 sunDir = normalize(uSunDirection);
    float sunDot = dot(perturbedNormalW, sunDir);

    // Broad luminous daylight curve so the visible hemisphere is radiant, clear and photorealistic
    float directSun = smoothstep(-0.25, 0.35, sunDot);
    // Earthshine & ambient cosmic fill so the Earth is never murky or pitch black
    float ambientFill = 0.36;
    float dayLight = clamp(directSun * 0.68 + ambientFill, 0.0, 1.0);

    // Warm golden twilight along the sunset / sunrise rim
    float twilight = smoothstep(0.40, -0.10, sunDot) * smoothstep(-0.25, 0.15, sunDot);

    // ─── Ocean Specular Glint ───
    vec3 viewDirW = normalize(cameraPosition - vWorldPosition);
    vec3 halfVec = normalize(sunDir + viewDirW);
    float specAngle = max(dot(perturbedNormalW, halfVec), 0.0);
    float specular = pow(specAngle, 56.0) * oceanFactor * 2.4 * directSun;
    vec3 oceanGlint = vec3(1.0, 0.96, 0.88) * specular;

    // ─── Cloud Shadow on Surface ───
    vec2 shadowUv = vec2(fract(vUv.x + uCloudOffset - 0.0028), vUv.y);
    float cloudShadowDensity = texture2D(uCloudsMap, shadowUv).r;
    float groundShadow = 1.0 - smoothstep(0.10, 0.55, cloudShadowDensity) * 0.35 * directSun;

    // ─── Daylight True Color NASA Blue Marble ───
    vec4 dayRaw = texture2D(uDayMap, vUv);
    // Vibrant, rich true color: deep sapphire oceans, lush green continents, snowy peaks
    vec3 dayTex = pow(dayRaw.rgb, vec3(0.96)) * vec3(1.06, 1.08, 1.15);

    vec3 twilightTint = vec3(1.15, 0.78, 0.45) * twilight * 0.35;
    vec3 daySurface = (dayTex * groundShadow + twilightTint) * dayLight + oceanGlint;

    // ─── City Lights on Shadow Rim ───
    float nightMask = smoothstep(0.10, -0.25, sunDot);
    vec4 nightTex = texture2D(uNightMap, vUv);
    vec3 nightLights = nightTex.rgb * vec3(1.35, 1.05, 0.70) * nightMask * 1.8;

    // Composite surface
    vec3 surface = mix(nightLights, daySurface, smoothstep(-0.25, 0.10, sunDot) * 0.75 + 0.25);

    // ─── Atmospheric Rayleigh Rim Across Limb ───
    vec3 normalV = normalize(vNormalView);
    vec3 viewDirV = normalize(-vPositionView);
    float rim = pow(1.0 - max(dot(normalV, viewDirV), 0.0), 3.0);
    vec3 limbColor = mix(vec3(0.24, 0.65, 1.0), vec3(1.0, 0.84, 0.52), twilight * 0.85);
    vec3 atmosphericRim = limbColor * rim * 1.20;

    vec3 finalColor = surface + atmosphericRim;
    finalColor = mix(vec3(0.04, 0.05, 0.08), finalColor, uLoaded);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ─── 2. OBclouds: Physically Layered Cloud Sphere (scale 1.014) ───
const cloudVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vPositionView;
  varying vec3 vNormalView;
  uniform float uCloudOffset;

  void main() {
    vUv = vec2(fract(uv.x + uCloudOffset), uv.y);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vPositionView = mvPosition.xyz;
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const cloudFragmentShader = `
  uniform sampler2D uCloudsMap;
  uniform vec3 uSunDirection;
  uniform float uLoaded;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vPositionView;
  varying vec3 vNormalView;

  void main() {
    vec4 cloudTex = texture2D(uCloudsMap, vUv);
    float density = cloudTex.r;
    if (density < 0.028) discard;

    vec3 normalW = normalize(vWorldNormal);
    vec3 sunDir = normalize(uSunDirection);
    float sunDot = dot(normalW, sunDir);

    float directSun = smoothstep(-0.25, 0.30, sunDot);
    float twilight = smoothstep(0.35, -0.10, sunDot) * smoothstep(-0.20, 0.12, sunDot);

    // Brilliant white sunlit clouds with warm twilight scattering
    vec3 sunCloud = mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0.86, 0.60), twilight);
    vec3 ambientCloud = vec3(0.35, 0.42, 0.52);
    vec3 cloudColor = mix(ambientCloud, sunCloud, directSun * 0.72 + 0.28);

    // Forward scattering along glancing sunlight
    vec3 viewDirW = normalize(cameraPosition - vWorldPosition);
    float forwardScatter = pow(max(dot(-viewDirW, sunDir), 0.0), 3.2) * 0.45 * directSun;
    cloudColor += vec3(1.0, 0.95, 0.85) * forwardScatter;

    float alpha = smoothstep(0.04, 0.55, density) * 0.94 * uLoaded;
    gl_FragColor = vec4(cloudColor, alpha);
  }
`;

// ─── 3. OBatmo: Atmospheric Outer Rayleigh Glow (scale 1.115) ───
const haloVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const haloFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 uSunDirection;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);
    float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.8);

    vec3 sunDir = normalize(uSunDirection);
    float sunFacing = max(dot(normal, sunDir), 0.0);

    // Glowing cyan-blue Rayleigh halo with golden sunrise rim
    vec3 cyanHalo = vec3(0.18, 0.58, 1.0);
    vec3 sunHalo = vec3(1.0, 0.84, 0.52);
    vec3 color = mix(cyanHalo, sunHalo, pow(sunFacing, 2.2) * 0.85);

    float alpha = rim * (0.45 + sunFacing * 0.55);
    gl_FragColor = vec4(color, alpha);
  }
`;

interface EarthGlobeProps {
  reducedMotion: boolean;
  userRotationY: React.MutableRefObject<number>;
  userRotationX: React.MutableRefObject<number>;
  velocityRef: React.MutableRefObject<{ x: number; y: number }>;
  isDragging: React.MutableRefObject<boolean>;
  onMeshPointerDown: (e: any) => void;
}

function EarthGlobe({
  reducedMotion,
  userRotationY,
  userRotationX,
  velocityRef,
  isDragging,
  onMeshPointerDown,
}: EarthGlobeProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const earthMatRef = useRef<THREE.ShaderMaterial>(null);
  const cloudMatRef = useRef<THREE.ShaderMaterial>(null);
  const cloudOffsetRef = useRef<number>(0);
  const { pointer, gl, viewport } = useThree();

  const [loaded, setLoaded] = useState(0);

  // Load high-resolution Blender / NASA textures
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= 3) {
        setLoaded(1);
      }
    };

    const albedo = loader.load('/earth/earth-albedo.jpg', checkAllLoaded);
    const bump = loader.load('/earth/earth-bump.jpg', checkAllLoaded);
    const oceanMask = loader.load('/earth/earth-ocean-mask.png', checkAllLoaded);
    const night = loader.load('/earth/earth-night.png', checkAllLoaded);
    const clouds = loader.load('/earth/earth-clouds.png', checkAllLoaded);

    [albedo, bump, oceanMask, night, clouds].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(maxAnisotropy, 8);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
    });

    return { albedo, bump, oceanMask, night, clouds };
  }, [gl]);

  // Sun position: High and to the right (+X, +Y, slightly forward in +Z)
  const sunDirection = useMemo(() => new THREE.Vector3(2.2, 1.1, 1.2).normalize(), []);

  // 1. OBearth: Main Earth Surface Material
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: realisticEarthVertexShader,
      fragmentShader: realisticEarthFragmentShader,
      uniforms: {
        uDayMap: { value: textures.albedo },
        uBumpMap: { value: textures.bump },
        uOceanMask: { value: textures.oceanMask },
        uNightMap: { value: textures.night },
        uCloudsMap: { value: textures.clouds },
        uSunDirection: { value: sunDirection },
        uCloudOffset: { value: 0 },
        uLoaded: { value: 0 },
      },
    });
  }, [textures, sunDirection]);

  // 2. OBclouds: Dedicated Atmospheric Cloud Sphere Material
  const cloudMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: cloudVertexShader,
      fragmentShader: cloudFragmentShader,
      uniforms: {
        uCloudsMap: { value: textures.clouds },
        uSunDirection: { value: sunDirection },
        uCloudOffset: { value: 0 },
        uLoaded: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
  }, [textures, sunDirection]);

  // 3. OBatmo: Rayleigh Atmospheric Halo Material
  const haloMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: haloVertexShader,
      fragmentShader: haloFragmentShader,
      uniforms: {
        uSunDirection: { value: sunDirection },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, [sunDirection]);

  // Frame loop for planetary spin, cloud drift, momentum decay, and drag responsiveness
  useFrame((_, delta) => {
    if (!earthGroupRef.current) return;

    if (earthMatRef.current) {
      earthMatRef.current.uniforms.uLoaded.value = THREE.MathUtils.lerp(
        earthMatRef.current.uniforms.uLoaded.value,
        loaded,
        delta * 3.5
      );
      if (!reducedMotion) {
        cloudOffsetRef.current += delta * 0.0032;
        earthMatRef.current.uniforms.uCloudOffset.value = cloudOffsetRef.current;
      }
    }

    if (cloudMatRef.current) {
      cloudMatRef.current.uniforms.uLoaded.value = THREE.MathUtils.lerp(
        cloudMatRef.current.uniforms.uLoaded.value,
        loaded,
        delta * 3.5
      );
      if (!reducedMotion) {
        cloudMatRef.current.uniforms.uCloudOffset.value = cloudOffsetRef.current;
      }
    }

    if (isDragging.current) {
      // Instant responsive follow while dragging
      earthGroupRef.current.rotation.x = userRotationX.current;
      earthGroupRef.current.rotation.y = userRotationY.current;
    } else {
      // Apply momentum decay after drag release
      if (Math.abs(velocityRef.current.x) > 0.0001 || Math.abs(velocityRef.current.y) > 0.0001) {
        userRotationY.current += velocityRef.current.x;
        userRotationX.current = Math.max(-0.55, Math.min(0.55, userRotationX.current + velocityRef.current.y));
        velocityRef.current.x *= 0.94;
        velocityRef.current.y *= 0.94;
      } else if (!reducedMotion) {
        // Natural gentle planetary rotation
        userRotationY.current += delta * 0.032;
      }

      // Smooth mouse parallax tilt
      const mouseTiltX = pointer.y * -0.08;
      const mouseTiltY = pointer.x * 0.12;
      const targetX = userRotationX.current + mouseTiltX;
      const targetY = userRotationY.current + mouseTiltY;

      earthGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        earthGroupRef.current.rotation.x,
        targetX,
        delta * 6.0
      );
      earthGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        earthGroupRef.current.rotation.y,
        targetY,
        delta * 6.0
      );
    }
  });

  const earthRadius = 1.45;

  // Responsive position matching Image 3 Reference: Upper-Right hemisphere on desktop
  const isMobile = viewport.width < 8;
  const groupPos: [number, number, number] = isMobile ? [0, 0.25, 0] : [1.18, 0.38, 0];
  const groupScale = isMobile ? 1.05 : 1.38;

  return (
    <group ref={earthGroupRef} position={groupPos} scale={groupScale}>
      {/* 1. OBearth: 3D Photorealistic Surface Sphere */}
      <mesh
        material={earthMaterial}
        onPointerDown={onMeshPointerDown}
        ref={(m) => {
          if (m) (earthMatRef as any).current = m.material;
        }}
      >
        <sphereGeometry args={[earthRadius, 128, 128]} />
      </mesh>

      {/* 2. OBclouds: Dedicated Atmospheric Cloud Sphere */}
      <mesh
        material={cloudMaterial}
        scale={1.014}
        onPointerDown={onMeshPointerDown}
        ref={(m) => {
          if (m) (cloudMatRef as any).current = m.material;
        }}
      >
        <sphereGeometry args={[earthRadius, 128, 128]} />
      </mesh>

      {/* 3. OBatmo: Atmospheric Rayleigh Halo Outer Shell */}
      <mesh material={haloMaterial} scale={1.115}>
        <sphereGeometry args={[earthRadius, 64, 64]} />
      </mesh>

      {/* 4. 3D Celestial Orbital Trajectory Rings & Satellite Beacons */}
      <OrbitalRings radius={earthRadius} />
    </group>
  );
}

// ─── 3D Celestial Orbital Rings & Satellite Beacons ───
function OrbitalRings({ radius }: { radius: number }) {
  const ringRef1 = useRef<THREE.Group>(null);
  const ringRef2 = useRef<THREE.Group>(null);
  const beacon1Ref = useRef<THREE.Mesh>(null);
  const beacon2Ref = useRef<THREE.Mesh>(null);

  const ringGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius * 1.42, 0, Math.sin(theta) * radius * 1.42));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  const outerRingGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius * 1.75, 0, Math.sin(theta) * radius * 1.75));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  const innerLine = useMemo(() => {
    const mat = new THREE.LineDashedMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.22,
      dashSize: 0.18,
      gapSize: 0.12,
    });
    const line = new THREE.Line(ringGeometry, mat);
    line.computeLineDistances();
    return line;
  }, [ringGeometry]);

  const outerLine = useMemo(() => {
    const mat = new THREE.LineDashedMaterial({
      color: '#deb87a',
      transparent: true,
      opacity: 0.20,
      dashSize: 0.25,
      gapSize: 0.18,
    });
    const line = new THREE.Line(outerRingGeometry, mat);
    line.computeLineDistances();
    return line;
  }, [outerRingGeometry]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ringRef1.current) {
      ringRef1.current.rotation.y += delta * 0.02;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.015;
    }
    if (beacon1Ref.current) {
      const angle = t * 0.35;
      const r = radius * 1.42;
      beacon1Ref.current.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
    }
    if (beacon2Ref.current) {
      const angle = -t * 0.22 + 1.5;
      const r = radius * 1.75;
      beacon2Ref.current.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
    }
  });

  return (
    <>
      <group ref={ringRef1} rotation={[0.42, 0.2, -0.3]}>
        <primitive object={innerLine} />
        <mesh ref={beacon1Ref}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      <group ref={ringRef2} rotation={[-0.55, -0.3, 0.4]}>
        <primitive object={outerLine} />
        <mesh ref={beacon2Ref}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshBasicMaterial color="#deb87a" />
        </mesh>
      </group>
    </>
  );
}

// ─── Deep Cosmos Starfield ───
function DeepSpaceEnvironment() {
  const starsGeometry = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const dist = 14 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.cos(phi);
      positions[i * 3 + 2] = dist * Math.sin(phi) * Math.sin(theta);

      const temp = Math.random();
      if (temp > 0.8) {
        colors[i * 3] = 0.98;
        colors[i * 3 + 1] = 0.88;
        colors[i * 3 + 2] = 0.70;
      } else if (temp > 0.4) {
        colors[i * 3] = 0.88;
        colors[i * 3 + 1] = 0.95;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <points geometry={starsGeometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Main Exported RealisticEarth3D Canvas Container ───
export default function RealisticEarth3D({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  // Initial orientation: India / Asia / Himalayas centered prominently
  const userRotationY = useRef(1.82);
  const userRotationX = useRef(0.28);
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Direct grab & drag rotation handling
  const startDrag = (clientX: number, clientY: number) => {
    isDragging.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastPointer.current = { x: clientX, y: clientY };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    startDrag(e.clientX, e.clientY);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handleMeshPointerDown = (e: any) => {
    if (e.nativeEvent) {
      startDrag(e.nativeEvent.clientX, e.nativeEvent.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    const rotDeltaY = dx * 0.0055;
    const rotDeltaX = dy * 0.0050;

    userRotationY.current += rotDeltaY;
    userRotationX.current = Math.max(-0.55, Math.min(0.55, userRotationX.current + rotDeltaX));
    velocityRef.current = { x: rotDeltaY, y: rotDeltaX };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  return (
    <div
      className="realistic-earth-viewport"
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Click and drag anywhere on Earth to rotate"
    >
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 40 }}
        dpr={[1, 1.5]}
        flat={false}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.35;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <ambientLight intensity={0.42} />
        <directionalLight position={[5, 2.8, 3.5]} intensity={2.8} color="#fffcf5" />
        <DeepSpaceEnvironment />
        <EarthGlobe
          reducedMotion={reducedMotion}
          userRotationY={userRotationY}
          userRotationX={userRotationX}
          velocityRef={velocityRef}
          isDragging={isDragging}
          onMeshPointerDown={handleMeshPointerDown}
        />
      </Canvas>

      {/* Golden Sunrise Lens Flare Burst at Upper Right Limb of Earth */}
      <div className="earth-sun-flare-burst" />

      {/* Atmospheric Star Glow Backdrop */}
      <div className="earth-cosmos-nebula-glow" />

      {/* Interactive Drag Hint */}
      <div className="earth-drag-hint">
        <span>DRAG GLOBE TO ROTATE</span>
      </div>
    </div>
  );
}
