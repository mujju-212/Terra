import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FormationGlobeProps {
  stageIndex: number;
}

// True 2:1 Equirectangular Spherical Planetary Textures for each Stage
const stageTexturePaths = [
  '/textures/stage-01-nebula-sphere.jpg',
  '/textures/stage-02-accretion-sphere.jpg',
  '/textures/stage-03-magma-sphere.jpg',
  '/textures/stage-04-cooling-sphere.jpg',
  '/textures/stage-05-water-sphere.jpg',
  '/textures/earth-albedo.jpg',
];

// Stage Specific Atmospheric Glow Colors (Soft, Natural Atmospheric Limbs)
const stageGlowColors = [
  new THREE.Color('#f97316'), // 01 Nebula: warm solar gold
  new THREE.Color('#f59e0b'), // 02 Accretion: asteroid amber
  new THREE.Color('#ef4444'), // 03 Early Earth: volcanic magma red
  new THREE.Color('#ea580c'), // 04 Cooling: basalt orange
  new THREE.Color('#0ea5e9'), // 05 Water: deep ocean blue
  new THREE.Color('#38bdf8'), // 06 Habitable: soft atmospheric blue
];

// Atmospheric outer haze vertex & fragment shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main() {
    float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
    gl_FragColor = vec4(uColor, 1.0) * intensity * 0.95;
  }
`;

function OrbitingFragments({ count = 30 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.6;
      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta);
    }
    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.16;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#f59e0b"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlobeMesh({
  stageIndex,
  userRotationY,
  userRotationX,
  velocityRef,
  isDragging,
}: {
  stageIndex: number;
  userRotationY: React.MutableRefObject<number>;
  userRotationX: React.MutableRefObject<number>;
  velocityRef: React.MutableRefObject<{ x: number; y: number }>;
  isDragging: React.MutableRefObject<boolean>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const diskRef = useRef<THREE.Mesh>(null);

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Preload all 6 spherical planetary maps
  const textures = useMemo(() => {
    return stageTexturePaths.map((src) => {
      const tex = textureLoader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    });
  }, [textureLoader]);

  // Real NASA Cloud Map for Habitable Earth
  const earthClouds = useMemo(() => {
    const tex = textureLoader.load('/images/earth-clouds.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [textureLoader]);

  // NASA Ocean Specular Mask
  const earthOceanMask = useMemo(() => {
    return textureLoader.load('/textures/earth-land-ocean-mask.png');
  }, [textureLoader]);

  const glowColor = stageGlowColors[stageIndex] || stageGlowColors[5];

  // Dynamically update materials when stageIndex changes
  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (!mat) return;

    mat.map = textures[stageIndex] || textures[0];

    if (stageIndex === 5) {
      // 06 Habitable Earth: Authentic 8K NASA Blue Marble with specular oceans
      mat.roughnessMap = earthOceanMask;
      mat.roughness = 0.65;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#000000');
      mat.emissiveIntensity = 0.0;
    } else if (stageIndex === 2) {
      // 03 Early Earth: Incandescent glowing magma ocean
      mat.roughnessMap = null;
      mat.roughness = 0.35;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#ff3300');
      mat.emissiveIntensity = 0.65;
    } else if (stageIndex === 3) {
      // 04 Cooling & Crust: Basalt rifts glow
      mat.roughnessMap = null;
      mat.roughness = 0.6;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#ff3300');
      mat.emissiveIntensity = 0.45;
    } else if (stageIndex === 1) {
      // 02 Accretion: Impact shock melts glow
      mat.roughnessMap = null;
      mat.roughness = 0.55;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#ff5500');
      mat.emissiveIntensity = 0.35;
    } else if (stageIndex === 4) {
      // 05 Water & Atmosphere: Archean cyan ocean with specular mask
      mat.roughnessMap = earthOceanMask;
      mat.roughness = 0.55;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#0284c7');
      mat.emissiveIntensity = 0.1;
    } else {
      // 01 Solar Nebula: Primordial golden accretion glow
      mat.roughnessMap = null;
      mat.roughness = 0.4;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#ff7700');
      mat.emissiveIntensity = 0.5;
    }
    mat.needsUpdate = true;
  }, [stageIndex, textures, earthOceanMask, glowColor]);

  useFrame((_, delta) => {
    // Smooth user rotation with velocity damping
    if (!isDragging.current) {
      userRotationY.current += 0.0016 + velocityRef.current.x;
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = userRotationY.current;
      meshRef.current.rotation.x = userRotationX.current;
    }

    // Dynamic independent cloud rotation for Habitable Earth
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = userRotationY.current * 1.05 + 0.1;
      cloudsRef.current.rotation.x = userRotationX.current;
    }

    // Rotating accretion disk for Nebula
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 0.14;
    }

    // Smooth atmosphere glow color transition
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms?.uColor) {
        mat.uniforms.uColor.value.lerp(glowColor, 0.08);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main Celestial Globe - Zoomed out to radius 1.15 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshStandardMaterial
          map={textures[stageIndex] || textures[0]}
          roughness={stageIndex === 5 ? 0.65 : 0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Floating 3D Cloud Atmosphere for Habitable Earth (Stage 06) */}
      {stageIndex === 5 && (
        <mesh ref={cloudsRef} scale={1.015}>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshStandardMaterial
            map={earthClouds}
            transparent={true}
            opacity={0.68}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Orbiting asteroid particles during Accretion & Nebula */}
      {(stageIndex === 0 || stageIndex === 1) && <OrbitingFragments count={stageIndex === 0 ? 25 : 45} />}

      {/* Rotating Solar Nebula Accretion Disk */}
      {stageIndex === 0 && (
        <mesh ref={diskRef} rotation={[Math.PI / 2.3, 0.16, 0]}>
          <ringGeometry args={[1.35, 2.4, 64]} />
          <meshBasicMaterial
            map={textures[0]}
            side={THREE.DoubleSide}
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Soft Rayleigh Scattering Rim Glow */}
      <mesh ref={glowRef} scale={1.09}>
        <sphereGeometry args={[1.15, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          uniforms={{
            uColor: { value: glowColor.clone() },
          }}
        />
      </mesh>
    </group>
  );
}

export default function InteractiveFormationGlobe({ stageIndex }: FormationGlobeProps) {
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const userRotationY = useRef(0);
  const userRotationX = useRef(0.12);
  const velocityRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    const rotDeltaY = dx * 0.006;
    const rotDeltaX = dy * 0.005;

    userRotationY.current += rotDeltaY;
    userRotationX.current = Math.max(-0.55, Math.min(0.55, userRotationX.current + rotDeltaX));
    velocityRef.current = { x: rotDeltaY, y: rotDeltaX };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      className="interactive-formation-viewport"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Click and drag anywhere on the globe to rotate in 3D"
    >
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 3, 3]} intensity={2.4} color="#fffcf2" />
        <directionalLight position={[-3, -2, -2]} intensity={0.3} color="#1b304f" />
        <GlobeMesh
          stageIndex={stageIndex}
          userRotationY={userRotationY}
          userRotationX={userRotationX}
          velocityRef={velocityRef}
          isDragging={isDragging}
        />
      </Canvas>

      {/* Interactive 3D Drag Hint Badge */}
      <div className="formation-drag-badge">
        <span>DRAG TO ROTATE 3D GLOBE</span>
      </div>
    </div>
  );
}
