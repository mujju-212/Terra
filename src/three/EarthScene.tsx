import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex shader with world and view normals for photorealistic atmospheric scattering
const earthVertexShader = `
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

// Fragment shader: multi-octave simplex/fbm noise continents, coastlines, oceans, night lights, clouds & atmospheric Rayleigh rim
const earthFragmentShader = `
  uniform float uTime;
  uniform vec3 uAccent;
  uniform vec3 uSunDirection;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  // Hash & noise functions
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  // Fractional Brownian Motion for procedural geography
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  // Geographic continent shape approximation
  float continentMask(vec2 uv) {
    // Spherical coordinate mapping
    float lon = (uv.x - 0.5) * 6.28318;
    float lat = (uv.y - 0.5) * 3.14159;

    // Base continental masses (Eurasia, Africa, Americas, Australia, Antarctica)
    float eurasia = smoothstep(0.48, 0.22, length(vec2(lon - 1.1, lat - 0.7) * vec2(0.65, 1.1)));
    float africa = smoothstep(0.42, 0.20, length(vec2(lon - 0.4, lat + 0.05) * vec2(0.85, 0.95)));
    float namerica = smoothstep(0.46, 0.22, length(vec2(lon + 1.8, lat - 0.75) * vec2(0.75, 1.05)));
    float samerica = smoothstep(0.42, 0.19, length(vec2(lon + 1.3, lat + 0.35) * vec2(0.9, 0.75)));
    float australia = smoothstep(0.32, 0.16, length(vec2(lon - 2.3, lat + 0.5) * vec2(1.0, 1.1)));
    float antarctica = smoothstep(0.28, 0.08, lat + 1.25);

    float baseLand = max(max(max(eurasia, africa), max(namerica, samerica)), max(australia, antarctica));
    
    // Add natural coastline detail via multi-scale noise
    float coastDetail = fbm(uv * 18.0) * 0.42 + fbm(uv * 46.0) * 0.12;
    return smoothstep(0.36, 0.46, baseLand + coastDetail - 0.18);
  }

  void main() {
    vec3 normalW = normalize(vWorldNormal);
    vec3 sunDir = normalize(uSunDirection);
    float sunDot = dot(normalW, sunDir);
    float dayLight = clamp(sunDot * 0.9 + 0.15, 0.0, 1.0);
    float nightMask = smoothstep(0.15, -0.25, sunDot);

    // Continent factor
    float land = continentMask(vUv);

    // Elevation & vegetation variations
    float elevation = fbm(vUv * 32.0);
    vec3 oceanDeep = vec3(0.012, 0.058, 0.13);
    vec3 oceanShallow = vec3(0.045, 0.21, 0.32);
    vec3 oceanColor = mix(oceanDeep, oceanShallow, fbm(vUv * 64.0 + uTime * 0.02) * 0.35);

    // Land palette: lush greenery, savannas, mountains, polar ice
    vec3 landLush = mix(vec3(0.09, 0.22, 0.08), vec3(0.18, 0.34, 0.14), elevation);
    vec3 landDesert = vec3(0.38, 0.31, 0.18);
    vec3 landMountain = vec3(0.24, 0.22, 0.20);
    vec3 polarIce = vec3(0.85, 0.92, 0.96);

    float polarZone = smoothstep(0.78, 0.94, abs(vUv.y - 0.5) * 2.0);
    vec3 surfaceLand = mix(landLush, landDesert, smoothstep(0.3, 0.65, abs(vUv.y - 0.5) * 1.8));
    surfaceLand = mix(surfaceLand, landMountain, smoothstep(0.65, 0.88, elevation));
    surfaceLand = mix(surfaceLand, polarIce, polarZone);

    // Combined ground
    vec3 groundColor = mix(oceanColor, surfaceLand, land);

    // Dynamic Cloud Layer (drifting continuously)
    vec2 cloudUv = vUv + vec2(uTime * 0.007, 0.0);
    float cloudNoise = fbm(cloudUv * 14.0) * 0.7 + fbm(cloudUv * 36.0) * 0.3;
    float cloudDensity = smoothstep(0.48, 0.72, cloudNoise);
    vec3 cloudColor = vec3(0.92, 0.95, 0.98);

    // Specular highlight on oceans
    vec3 viewDirW = normalize(cameraPosition - vWorldPosition);
    vec3 halfVec = normalize(sunDir + viewDirW);
    float specular = pow(max(dot(normalW, halfVec), 0.0), 38.0) * (1.0 - land) * (1.0 - cloudDensity * 0.8);
    vec3 oceanSpecular = vec3(1.0, 0.92, 0.82) * specular * 0.9;

    // Day side lighting
    vec3 litGround = groundColor * (dayLight * 0.85 + 0.12) + oceanSpecular;
    litGround = mix(litGround, cloudColor * (dayLight * 0.9 + 0.15), cloudDensity * 0.85);

    // Night side city lights
    float cityNoise = step(0.68, fbm(vUv * 65.0)) * step(0.35, fbm(vUv * 18.0));
    vec3 nightLights = vec3(1.0, 0.78, 0.35) * cityNoise * land * (1.0 - polarZone) * nightMask * 1.8;

    vec3 finalColor = litGround + nightLights;

    // Rayleigh scattering atmospheric rim
    vec3 normalV = normalize(vNormalView);
    vec3 viewDirV = normalize(-vPositionView);
    float fresnel = pow(1.0 - max(dot(normalV, viewDirV), 0.0), 3.2);
    
    // Atmospheric halo tinted with current world accent
    vec3 atmosphereGlow = mix(vec3(0.25, 0.6, 1.0), uAccent, 0.68) * fresnel * 0.85;
    finalColor += atmosphereGlow;

    gl_FragColor = vec4(finalColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function EarthMesh({ accent, reducedMotion }: { accent: string; reducedMotion: boolean }) {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: new THREE.Color(accent) },
        uSunDirection: { value: new THREE.Vector3(1.8, 0.8, 1.4).normalize() },
      },
    });
  }, []);

  // Update accent dynamically
  useMemo(() => {
    earthMaterial.uniforms.uAccent.value.set(accent);
  }, [accent, earthMaterial]);

  useFrame((state, delta) => {
    if (!earthRef.current || reducedMotion) return;
    earthMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Gentle natural rotation
    earthRef.current.rotation.y += delta * 0.08;

    // Interactive mouse parallax tilt
    const targetRotX = 0.22 + state.pointer.y * -0.25;
    const targetRotZ = state.pointer.x * 0.18;
    earthRef.current.rotation.x += (targetRotX - earthRef.current.rotation.x) * Math.min(1, delta * 3.0);
    earthRef.current.rotation.z += (targetRotZ - earthRef.current.rotation.z) * Math.min(1, delta * 3.0);

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={earthRef} rotation={[0.22, -0.6, 0.05]}>
      {/* Earth Surface Sphere */}
      <mesh material={earthMaterial}>
        <sphereGeometry args={[1, 128, 128]} />
      </mesh>

      {/* Outer Atmospheric Aura Shell */}
      <mesh scale={1.065}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft Ambient Inner Glow */}
      <mesh scale={1.018} ref={cloudsRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Starfield() {
  const geometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Star hues: warm gold, clean white, cool cyan
      const r = 0.85 + Math.random() * 0.15;
      const g = 0.88 + Math.random() * 0.12;
      const b = 0.95 + Math.random() * 0.05;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
      />
    </points>
  );
}

export default function EarthScene({
  accent = '#c9a15a',
  reducedMotion = false,
}: {
  accent: string;
  reducedMotion?: boolean;
}) {
  return (
    <div className="earth-scene" aria-hidden="true">
      <div
        className="earth-scene-fallback"
        style={{ '--scene-accent': accent } as React.CSSProperties}
      />
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 2.85], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 1.5, 2]} intensity={1.2} />
        <Starfield />
        <EarthMesh accent={accent} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
