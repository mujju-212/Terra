import { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import NearViewportMount from './NearViewportMount';

interface FormationGlobeProps {
  stageIndex: number;
}

// True 2:1 Equirectangular Spherical Planetary Textures for Stages 01 - 06 (using optimized 2K maps)
const stageTexturePaths = [
  '/textures/stage-01-nebula-sphere.jpg',
  '/textures/stage-02-accretion-sphere.jpg',
  '/textures/stage-03-magma-sphere.jpg',
  '/textures/stage-04-cooling-sphere.jpg',
  '/textures/stage-05-water-sphere.jpg',
  '/textures/earth-albedo-2k.jpg',
];

// Stage Specific Atmospheric Glow Colors
const stageGlowColors = [
  new THREE.Color('#f59e0b'), // 01 Nebula: warm solar gold
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

/**
 * Stage 01: Authentic 3D Swirling Solar Nebula Vortex System
 * Optimized with GPU group rotation instead of expensive CPU buffer re-uploads.
 */
function SolarNebulaSystem() {
  const diskRef = useRef<THREE.Mesh>(null);
  const innerDiskRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const particlesGroupRef = useRef<THREE.Group>(null);

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Authentic spiral cosmic nebula vortex texture (matches card thumbnail)
  const nebulaTex = useMemo(() => {
    const tex = textureLoader.load('/images/stage-01-nebula.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureLoader]);

  // Static Keplerian dust coordinates - rotated via GPU group transform
  const particleCount = 110;
  const initialPositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.75 + Math.random() * 2.0;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.12 * (radius / 2);
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    // 1. Primary outer spiral arm vortex rotation
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 0.15;
    }
    // 2. Secondary inner density wave rotation
    if (innerDiskRef.current) {
      innerDiskRef.current.rotation.z += delta * 0.28;
    }
    // 3. Nascent Proto-Sun thermal pulsation
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 2.4) * 0.035;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (coronaRef.current) {
      const pulseCorona = 1.0 + Math.sin(state.clock.elapsedTime * 1.8 + 1.2) * 0.05;
      coronaRef.current.scale.set(pulseCorona, pulseCorona, pulseCorona);
    }
    // 4. Smooth GPU Keplerian particle rotation (zero CPU buffer writes)
    if (particlesGroupRef.current) {
      particlesGroupRef.current.rotation.z += delta * 0.22;
    }
  });

  return (
    <group>
      {/* ── 1. PRIMARY ACCRETION VORTEX DISK (High-res Spiral Nebula) ── */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.35, 0.12, 0]}>
        <planeGeometry args={[4.6, 4.6]} />
        <meshBasicMaterial
          map={nebulaTex}
          transparent={true}
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── 2. SECONDARY INNER SWIRLING DENSITY WAVES DISK ── */}
      <mesh ref={innerDiskRef} rotation={[Math.PI / 2.35, 0.12, 0.4]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          map={nebulaTex}
          transparent={true}
          opacity={0.68}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── 3. ORBITING KEPLERIAN DUST & GAS PARTICLES (Zero CPU uploads) ── */}
      <group rotation={[Math.PI / 2.35, 0.12, 0]} ref={particlesGroupRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#fbbf24"
            transparent
            opacity={0.92}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* ── 4. INCANDESCENT PROTO-SUN CORE ── */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.34, 28, 28]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Radiant Solar Corona Halo */}
      <mesh ref={coronaRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 28, 28]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Radiant Point Light from the Proto-Sun */}
      <pointLight color="#fbbf24" intensity={4.5} distance={8} />
    </group>
  );
}

/**
 * Accretion fragments that orbit during the Heavy Bombardment epoch (Stage 02)
 * Optimized with GPU group rotation.
 */
function OrbitingFragments({ count = 35 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.35 + Math.random() * 0.45;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.7;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#fbbf24"
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function CelestialGlobeScene({ stageIndex }: { stageIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // On-demand texture cache: Only loads textures when the stage is viewed
  const textureCache = useRef<Map<string, THREE.Texture>>(new Map());

  const getTexture = useCallback((src: string) => {
    if (!textureCache.current.has(src)) {
      const tex = textureLoader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      textureCache.current.set(src, tex);
    }
    return textureCache.current.get(src)!;
  }, [textureLoader]);

  // Optimized 2K Cloud Map (only loaded if stage 06 is viewed)
  const getEarthClouds = useCallback(() => {
    return getTexture('/images/earth-clouds-2k.jpg');
  }, [getTexture]);

  // Optimized 2K Specular Mask
  const getOceanMask = useCallback(() => {
    return getTexture('/textures/earth-land-ocean-mask-2k.png');
  }, [getTexture]);

  const glowColor = stageGlowColors[stageIndex] || stageGlowColors[5];

  // Dynamically update material maps when stageIndex changes
  useEffect(() => {
    if (!meshRef.current || stageIndex === 0) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (!mat) return;

    const currentPath = stageTexturePaths[stageIndex] || stageTexturePaths[1];
    mat.map = getTexture(currentPath);

    if (stageIndex === 5) {
      // 06 Habitable Earth: Authentic NASA Blue Marble with specular oceans
      mat.roughnessMap = getOceanMask();
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
      mat.emissiveIntensity = 0.75;
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
      mat.emissiveIntensity = 0.45;
    } else if (stageIndex === 4) {
      // 05 Water & Atmosphere: Archean cyan ocean with specular mask
      mat.roughnessMap = getOceanMask();
      mat.roughness = 0.55;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#0284c7');
      mat.emissiveIntensity = 0.12;
    } else {
      mat.roughnessMap = null;
      mat.roughness = 0.4;
      mat.metalness = 0.05;
      mat.emissive = new THREE.Color('#ff7700');
      mat.emissiveIntensity = 0.5;
    }
    mat.needsUpdate = true;
  }, [stageIndex, getTexture, getOceanMask]);

  useFrame((_, delta) => {
    // Dynamic independent cloud rotation for Habitable Earth
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.06;
    }

    // Smooth atmosphere glow color transition
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms?.uColor) {
        mat.uniforms.uColor.value.lerp(glowColor, 0.08);
      }
    }
  });

  const globeRadius = 1.22;

  return (
    <group position={[0, 0, 0]}>
      {/* ── STAGE 01: SOLAR NEBULA ACCRETION DISK & PROTO-SUN ── */}
      {stageIndex === 0 ? (
        <SolarNebulaSystem />
      ) : (
        /* ── STAGES 02 - 06: CELESTIAL PLANETARY GLOBE ── */
        <>
          <mesh ref={meshRef}>
            <sphereGeometry args={[globeRadius, 48, 48]} />
            <meshStandardMaterial
              map={getTexture(stageTexturePaths[stageIndex] || stageTexturePaths[1])}
              roughness={stageIndex === 5 ? 0.65 : 0.45}
              metalness={0.05}
            />
          </mesh>

          {/* Floating 3D Cloud Atmosphere for Habitable Earth (Stage 06) */}
          {stageIndex === 5 && (
            <mesh ref={cloudsRef} scale={1.015}>
              <sphereGeometry args={[globeRadius, 48, 48]} />
              <meshStandardMaterial
                map={getEarthClouds()}
                transparent={true}
                opacity={0.68}
                blending={THREE.NormalBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Orbiting asteroid bombardment particles during Accretion */}
          {stageIndex === 1 && <OrbitingFragments count={40} />}

          {/* Soft Rayleigh Scattering Rim Glow */}
          <mesh ref={glowRef} scale={1.07}>
            <sphereGeometry args={[globeRadius, 36, 36]} />
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
        </>
      )}
    </group>
  );
}

export default function InteractiveFormationGlobe({ stageIndex }: FormationGlobeProps) {
  return (
    <div
      className="interactive-formation-viewport"
      title="Click and drag anywhere to rotate 3D Earth / Solar Nebula in full 360°"
    >
      <NearViewportMount>
        <Canvas
          camera={{ position: [0, 0, 3.85], fov: 38 }}
          dpr={[1, 1.35]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 3, 3]} intensity={2.8} color="#fffcf2" />
          <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#1b304f" />
          <CelestialGlobeScene stageIndex={stageIndex} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.85}
            autoRotate={true}
            autoRotateSpeed={0.9}
            minPolarAngle={Math.PI * 0.18}
            maxPolarAngle={Math.PI * 0.82}
          />
        </Canvas>
      </NearViewportMount>

      {/* Interactive 3D Drag Hint Badge */}
      <div className="formation-drag-badge">
        <span>{stageIndex === 0 ? 'DRAG TO ROTATE 3D NEBULA' : 'DRAG TO ROTATE 3D GLOBE'}</span>
      </div>
    </div>
  );
}

