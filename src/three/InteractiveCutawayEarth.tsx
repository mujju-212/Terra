import { useMemo, useState, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import NearViewportMount from './NearViewportMount';


export type LayerKey = 'crust' | 'mantle' | 'outer' | 'inner';

interface CutawayEarthProps {
  selectedLayer: LayerKey;
  onSelectLayer: (layer: LayerKey) => void;
  onOpenLayerModal?: (layer: LayerKey) => void;
}

interface GlobeSceneProps {
  selectedLayer: LayerKey;
  onSelectLayer: (layer: LayerKey) => void;
  hoveredLayer: LayerKey | null;
  setHoveredLayer: (layer: LayerKey | null) => void;
  isAutoRotating: boolean;
  isInteracting: boolean;
  onProjectAnchors: (anchors: Record<LayerKey, { x: number; y: number; visible: boolean }>) => void;
  globeGroupRef: React.RefObject<THREE.Group | null>;
}

/**
 * Procedural lithospheric crust strata texture for the cut rim:
 * Generates geological rock layers (sediment, continental granite, oceanic basalt)
 * without stretching or distorting a world map over a thin rim.
 */
function createCrustStrataTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0.0, '#44403c'); // Oceanic Basalt
  grad.addColorStop(0.35, '#78716c'); // Gabbro/Lower Crust
  grad.addColorStop(0.7, '#a8a29e'); // Continental Granite
  grad.addColorStop(1.0, '#d6c7a1'); // Surface Sedimentary / Weathered Sandstone
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 240; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.09)' : 'rgba(28, 25, 23, 0.1)';
    ctx.fillRect(rx, ry, 1 + Math.random() * 2, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function GlobeCutawayScene({
  selectedLayer,
  onSelectLayer,
  hoveredLayer,
  setHoveredLayer,
  isAutoRotating,
  isInteracting,
  onProjectAnchors,
  globeGroupRef,
}: GlobeSceneProps) {
  const innerCoreRef = useRef<THREE.Mesh>(null);

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Crisp NASA Earth Albedo texture (optimized 2K map)
  const earthAlbedo = useMemo(() => {
    const tex = textureLoader.load('/textures/earth-albedo-2k.jpg', (t) => {
      t.needsUpdate = true;
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [textureLoader]);

  // Elevation relief bump map (optimized 2K map)
  const earthBump = useMemo(() => {
    const tex = textureLoader.load('/textures/earth-bump-2k.jpg', (t) => {
      t.needsUpdate = true;
    });
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [textureLoader]);

  // Molten magma / convective cellular texture for outer core (restoring the cellular magma structure)
  const magmaTex = useMemo(() => {
    const tex = textureLoader.load('/textures/stage-03-magma-sphere.jpg', (t) => {
      t.needsUpdate = true;
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [textureLoader]);

  // Incandescent crystalline iron-nickel texture for inner core
  const innerCoreTex = useMemo(() => {
    const tex = textureLoader.load('/textures/stage-02-accretion-sphere.jpg', (t) => {
      t.needsUpdate = true;
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [textureLoader]);

  // Cooling silicate tectonic / cracked magma texture for mantle (restoring the mantle fissure structure)
  const mantleTex = useMemo(() => {
    const tex = textureLoader.load('/textures/stage-04-cooling-sphere.jpg', (t) => {
      t.needsUpdate = true;
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [textureLoader]);

  // Crust strata cross-section texture for the cut rim
  const crustStrataTex = useMemo(() => createCrustStrataTexture(), []);

  // Accurately proportioned layer radii:
  // Globe Radius: 1.08 (fits comfortably in 340px viewport)
  // Crust: thin outer lithosphere rim (0.99 to 1.08)
  // Mantle: thick silicate mantle (0.64 to 0.99)
  // Outer Core: liquid iron-nickel dynamo (0.34 to 0.64)
  // Inner Core: solid incandescent core (0 to 0.34)
  const globeRadius = 1.08;
  const rMantle = 0.99;
  const rOuter = 0.64;
  const rInner = 0.34;

  // Front-Right 90° cutaway wedge (from phi = 90° to 180°):
  // Sphere geometry spans 270° from phi = 180° (Math.PI) to 450° (2.5 * Math.PI)
  const cutStart = Math.PI;
  const cutAngle = Math.PI * 1.5;

  const activeLayer = hoveredLayer || selectedLayer;

  const handlePointerOver = (layer: LayerKey) => {
    setHoveredLayer(layer);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHoveredLayer(null);
    document.body.style.cursor = 'default';
  };

  // Reusable projection math vectors
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const normalVec = useMemo(() => new THREE.Vector3(), []);
  const camVec = useMemo(() => new THREE.Vector3(), []);

  // 4 Local layer anchor points on Cut Face 1 (Plane z = 0, x >= 0)
  const localAnchors = useMemo(() => ({
    crust: new THREE.Vector3(1.035 * Math.cos(0.48), 1.035 * Math.sin(0.48), 0.002),
    mantle: new THREE.Vector3(0.815 * Math.cos(0.32), 0.815 * Math.sin(0.32), 0.002),
    outer: new THREE.Vector3(0.490 * Math.cos(0.14), 0.490 * Math.sin(0.14), 0.002),
    inner: new THREE.Vector3(0.170, 0, 0.002),
  }), []);

  const projectedOnceRef = useRef(false);
  const lastProjectTimeRef = useRef(0);

  // Frame Loop:
  // 1. Pulses the incandescent thermal glow of the inner core
  // 2. Projects 3D layer anchors to 2D SVG screen space only when interacting (zero-overhead when idle)
  useFrame(({ camera }) => {
    // 1. Inner core thermal breathing pulse
    if (innerCoreRef.current) {
      const pulse = 1.0 + Math.sin(Date.now() * 0.003) * 0.035;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // 2. Only calculate SVG anchor projections if interacting OR on first render
    const now = performance.now();
    const shouldProject = !projectedOnceRef.current || (isInteracting && now - lastProjectTimeRef.current > 32);

    if (shouldProject && globeGroupRef.current) {
      lastProjectTimeRef.current = now;
      projectedOnceRef.current = true;

      normalVec.set(0, 0, 1).transformDirection(globeGroupRef.current.matrixWorld);
      camVec.subVectors(camera.position, globeGroupRef.current.position).normalize();
      const dot = normalVec.dot(camVec);
      const isFacing = dot > 0.05;

      const updatedAnchors: Record<LayerKey, { x: number; y: number; visible: boolean }> = {
        crust: { x: 314, y: 96, visible: isFacing },
        mantle: { x: 297, y: 128, visible: isFacing },
        outer: { x: 261, y: 154, visible: isFacing },
        inner: { x: 222, y: 167, visible: isFacing },
      };

      (Object.keys(localAnchors) as LayerKey[]).forEach((key) => {
        worldPos.copy(localAnchors[key]).applyMatrix4(globeGroupRef.current!.matrixWorld);
        tempVec.copy(worldPos).project(camera);
        const svgX = (tempVec.x * 0.5 + 0.5) * 440;
        const svgY = (-tempVec.y * 0.5 + 0.5) * 340;
        updatedAnchors[key] = {
          x: Math.round(svgX),
          y: Math.round(svgY),
          visible: isFacing && tempVec.z < 1,
        };
      });

      onProjectAnchors(updatedAnchors);
    }
  });

  return (
    <group ref={globeGroupRef as any} position={[-0.15, 0, 0]} rotation={[0.22, 0.42, 0]}>
      {/* ── 1. INNER CORE (Full 3D Incandescent Metallic Iron-Nickel Sphere in Center) ── */}
      <mesh
        ref={innerCoreRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('inner');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          handlePointerOver('inner');
        }}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[rInner, 32, 32]} />
        <meshStandardMaterial
          map={innerCoreTex}
          color="#fffbe6"
          emissive="#f59e0b"
          emissiveIntensity={activeLayer === 'inner' ? 1.4 : 0.8}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Internal Core Thermal Radiance Point Light — localized to inner core cavity */}
      <pointLight color="#fbbf24" intensity={activeLayer === 'inner' ? 0.6 : 0.3} distance={0.9} />

      {/* ── 2. OUTER CORE (3D Liquid Molten Shell with 270° Cutaway) ── */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('outer');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          handlePointerOver('outer');
        }}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[rOuter, 36, 36, cutStart, cutAngle]} />
        <meshStandardMaterial
          map={magmaTex}
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={activeLayer === 'outer' ? 0.9 : 0.45}
          roughness={0.35}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 3. MANTLE (3D Semi-Solid Silicate Magma Shell with 270° Cutaway) ── */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('mantle');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          handlePointerOver('mantle');
        }}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[rMantle, 40, 40, cutStart, cutAngle]} />
        <meshStandardMaterial
          map={mantleTex}
          color="#b45309"
          emissive="#7c2d12"
          emissiveIntensity={activeLayer === 'mantle' ? 0.65 : 0.25}
          roughness={0.65}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 4. CRUST & EARTH SURFACE (270° NASA Blue Marble Outer Shell with Continents) ── */}
      {/* Kept 100% free of orange emissive tint so oceans remain vivid natural blue */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('crust');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          handlePointerOver('crust');
        }}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[globeRadius, 48, 48, cutStart, cutAngle]} />
        <meshStandardMaterial
          map={earthAlbedo}
          bumpMap={earthBump}
          bumpScale={0.025}
          roughness={0.45}
          metalness={0.02}
          color="#ffffff"
          emissive="#000000"
          emissiveIntensity={0}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── 5. CUT FACE 1: STRATA CROSS-SECTION AT phi = Math.PI (Plane z = 0, for x >= 0) ── */}
      <group position={[0, 0, 0.001]} rotation={[0, 0, 0]}>
        {/* Inner Core Disc */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('inner');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('inner');
          }}
          onPointerOut={handlePointerOut}
        >
          <circleGeometry args={[rInner, 36, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={innerCoreTex}
            color={activeLayer === 'inner' ? '#ffffff' : '#fffbe6'}
            emissive={activeLayer === 'inner' ? '#ffaa00' : '#f59e0b'}
            emissiveIntensity={activeLayer === 'inner' ? 2.4 : 1.2}
            roughness={0.2}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Core Ring */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('outer');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('outer');
          }}
          onPointerOut={handlePointerOut}
        >
          <ringGeometry args={[rInner, rOuter, 48, 1, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={magmaTex}
            color={activeLayer === 'outer' ? '#fbbf24' : '#ea580c'}
            emissive={activeLayer === 'outer' ? '#f59e0b' : '#b45309'}
            emissiveIntensity={activeLayer === 'outer' ? 1.5 : 0.7}
            roughness={0.3}
            metalness={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Mantle Ring */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('mantle');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('mantle');
          }}
          onPointerOut={handlePointerOut}
        >
          <ringGeometry args={[rOuter, rMantle, 48, 1, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={mantleTex}
            color={activeLayer === 'mantle' ? '#ea580c' : '#991b1b'}
            emissive={activeLayer === 'mantle' ? '#c2410c' : '#7f1d1d'}
            emissiveIntensity={activeLayer === 'mantle' ? 1.0 : 0.35}
            roughness={0.7}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Crust Lithosphere Outer Rim Band */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('crust');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('crust');
          }}
          onPointerOut={handlePointerOut}
        >
          <ringGeometry args={[rMantle, globeRadius, 48, 1, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={crustStrataTex}
            color={activeLayer === 'crust' ? '#fef08a' : '#d6d3d1'}
            emissive={activeLayer === 'crust' ? '#deb87a' : '#44403c'}
            emissiveIntensity={activeLayer === 'crust' ? 0.8 : 0.15}
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ── 6. CUT FACE 2: STRATA CROSS-SECTION AT phi = 2.5 * Math.PI (Plane x = 0, for z >= 0) ── */}
      <group position={[0.001, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
        {/* Inner Core Disc */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('inner');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('inner');
          }}
          onPointerOut={handlePointerOut}
        >
          <circleGeometry args={[rInner, 36, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={innerCoreTex}
            color={activeLayer === 'inner' ? '#ffffff' : '#fffbe6'}
            emissive={activeLayer === 'inner' ? '#ffaa00' : '#f59e0b'}
            emissiveIntensity={activeLayer === 'inner' ? 2.4 : 1.2}
            roughness={0.2}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Core Ring */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('outer');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('outer');
          }}
          onPointerOut={handlePointerOut}
        >
          <ringGeometry args={[rInner, rOuter, 48, 1, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={magmaTex}
            color={activeLayer === 'outer' ? '#fbbf24' : '#ea580c'}
            emissive={activeLayer === 'outer' ? '#f59e0b' : '#b45309'}
            emissiveIntensity={activeLayer === 'outer' ? 1.5 : 0.7}
            roughness={0.3}
            metalness={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Mantle Ring */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('mantle');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('mantle');
          }}
          onPointerOut={handlePointerOut}
        >
          <ringGeometry args={[rOuter, rMantle, 48, 1, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={mantleTex}
            color={activeLayer === 'mantle' ? '#ea580c' : '#991b1b'}
            emissive={activeLayer === 'mantle' ? '#c2410c' : '#7f1d1d'}
            emissiveIntensity={activeLayer === 'mantle' ? 1.0 : 0.35}
            roughness={0.7}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Crust Lithosphere Outer Rim Band */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer('crust');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlePointerOver('crust');
          }}
          onPointerOut={handlePointerOut}
        >
          <ringGeometry args={[rMantle, globeRadius, 48, 1, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial
            map={crustStrataTex}
            color={activeLayer === 'crust' ? '#fef08a' : '#d6d3d1'}
            emissive={activeLayer === 'crust' ? '#deb87a' : '#44403c'}
            emissiveIntensity={activeLayer === 'crust' ? 0.8 : 0.15}
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ── 7. CRISP GLOWING NEON HIGHLIGHT RINGS ON BOTH CUT FACES ── */}
      {activeLayer === 'inner' && (
        <>
          <mesh position={[0, 0, 0.005]}>
            <ringGeometry args={[rInner - 0.015, rInner + 0.015, 48, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.005, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
            <ringGeometry args={[rInner - 0.015, rInner + 0.015, 48, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
        </>
      )}

      {activeLayer === 'outer' && (
        <>
          <mesh position={[0, 0, 0.005]}>
            <ringGeometry args={[rOuter - 0.02, rOuter + 0.02, 48, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.005, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
            <ringGeometry args={[rOuter - 0.02, rOuter + 0.02, 48, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
        </>
      )}

      {activeLayer === 'mantle' && (
        <>
          <mesh position={[0, 0, 0.005]}>
            <ringGeometry args={[rMantle - 0.02, rMantle + 0.02, 56, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ff7a33" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.005, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
            <ringGeometry args={[rMantle - 0.02, rMantle + 0.02, 56, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ff7a33" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
        </>
      )}

      {activeLayer === 'crust' && (
        <>
          <mesh position={[0, 0, 0.005]}>
            <ringGeometry args={[globeRadius * 0.975, globeRadius * 1.01, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ffd98a" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.005, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
            <ringGeometry args={[globeRadius * 0.975, globeRadius * 1.01, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ffd98a" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
        </>
      )}
    </group>
  );
}

const layerCardsData = [
  {
    key: 'crust' as const,
    title: 'Crust',
    thickness: '< 1% Volume (5–70 km)',
    desc: 'Lithosphere & moving tectonic plates',
    icon: '/images/layer-icon-crust.png',
  },
  {
    key: 'mantle' as const,
    title: 'Mantle',
    thickness: '~2,900 km (~84% Vol)',
    desc: 'Fluidized molten silicate conveyor',
    icon: '/images/layer-icon-mantle.png',
  },
  {
    key: 'outer' as const,
    title: 'Outer Core',
    thickness: '~2,250 km thick',
    desc: 'Liquid iron-nickel magnetic dynamo',
    icon: '/images/layer-icon-outer.png',
  },
  {
    key: 'inner' as const,
    title: 'Inner Core',
    thickness: '~1,220 km radius',
    desc: 'Solid metallic core (~5,000°C)',
    icon: '/images/layer-icon-inner.png',
  },
];

export default function InteractiveCutawayEarth({
  selectedLayer,
  onSelectLayer,
  onOpenLayerModal,
}: CutawayEarthProps) {
  const [hoveredLayer, setHoveredLayer] = useState<LayerKey | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const globeGroupRef = useRef<THREE.Group>(null);
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);
  const interactionTimerRef = useRef<number | null>(null);

  // Dynamic 2D SVG screen anchor positions tracked in real time from 3D scene
  const [anchors, setAnchors] = useState<Record<LayerKey, { x: number; y: number; visible: boolean }>>({
    crust: { x: 314, y: 96, visible: true },
    mantle: { x: 297, y: 128, visible: true },
    outer: { x: 261, y: 154, visible: true },
    inner: { x: 222, y: 167, visible: true },
  });

  const handleProjectAnchors = useCallback((updated: Record<LayerKey, { x: number; y: number; visible: boolean }>) => {
    setAnchors((prev) => {
      // Avoid unnecessary state re-renders if coordinates haven't drifted by > 1.5px
      const changed = (['crust', 'mantle', 'outer', 'inner'] as LayerKey[]).some((k) => {
        return (
          Math.abs(prev[k].x - updated[k].x) > 1.5 ||
          Math.abs(prev[k].y - updated[k].y) > 1.5 ||
          prev[k].visible !== updated[k].visible
        );
      });
      return changed ? updated : prev;
    });
  }, []);

  const handleResetView = useCallback(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.set(0.18, 0, 0);
    }
  }, []);

  return (
    <div className="interactive-cutaway-container">
      {/* 3D WebGL Globe Viewport */}
      <div
        className="cutaway-earth-viewport"
        title="Interactive 3D Earth Cutaway. Click any layer directly on the 3D globe or drag to rotate."
      >
        <NearViewportMount>
        <Canvas
          camera={{ position: [0.65, 0.40, 3.25], fov: 42 }}
          dpr={[1, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.7} color="#f0f9ff" />
          <directionalLight position={[5, 4, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-3, 1, 3]} intensity={0.6} color="#e0f2fe" />
          <directionalLight position={[0, -3, 1]} intensity={0.3} color="#ffffff" />

          <GlobeCutawayScene
            selectedLayer={selectedLayer}
            onSelectLayer={onSelectLayer}
            hoveredLayer={hoveredLayer}
            setHoveredLayer={setHoveredLayer}
            isAutoRotating={isAutoRotating}
            isInteracting={isInteracting}
            onProjectAnchors={handleProjectAnchors}
            globeGroupRef={globeGroupRef}
          />

          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.08}
            rotateSpeed={0.8}
            minPolarAngle={Math.PI * 0.18}
            maxPolarAngle={Math.PI * 0.82}
            onStart={() => setIsInteracting(true)}
            onEnd={() => {
              if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
              interactionTimerRef.current = window.setTimeout(() => {
                setIsInteracting(false);
              }, 2000);
            }}
          />
        </Canvas>
        </NearViewportMount>

        {/* Real-time Dynamic Pointer lines & Callout Pins connecting 3D cutaway to cards */}
        <svg className="cutaway-pointer-lines-svg" viewBox="0 0 440 340" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cutawayGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#deb87a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#deb87a" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="cutawayDim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* 1. Crust Pin & Dogleg Pointer Line */}
          <g
            className={`pointer-line-group ${selectedLayer === 'crust' ? 'is-active-pointer' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLayer('crust');
            }}
            style={{
              cursor: 'pointer',
              pointerEvents: anchors.crust.visible ? 'auto' : 'none',
              opacity: anchors.crust.visible ? (selectedLayer === 'crust' ? 1 : 0.75) : 0.1,
              transition: 'opacity 0.25s ease',
            }}
            role="button"
            tabIndex={0}
          >
            <polyline
              points={`${anchors.crust.x},${anchors.crust.y} 365,40 435,40`}
              fill="none"
              stroke={selectedLayer === 'crust' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'crust' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'crust' ? 'none' : '3,3'}
            />
            <circle cx={anchors.crust.x} cy={anchors.crust.y} r={selectedLayer === 'crust' ? '5.5' : '3.5'} fill={selectedLayer === 'crust' ? '#deb87a' : '#ffffff'} />
            <circle cx={anchors.crust.x} cy={anchors.crust.y} r="8" fill="none" stroke="#deb87a" strokeWidth="1.2" opacity={selectedLayer === 'crust' ? '0.9' : '0'} />
          </g>

          {/* 2. Mantle Pin & Dogleg Pointer Line */}
          <g
            className={`pointer-line-group ${selectedLayer === 'mantle' ? 'is-active-pointer' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLayer('mantle');
            }}
            style={{
              cursor: 'pointer',
              pointerEvents: anchors.mantle.visible ? 'auto' : 'none',
              opacity: anchors.mantle.visible ? (selectedLayer === 'mantle' ? 1 : 0.75) : 0.1,
              transition: 'opacity 0.25s ease',
            }}
            role="button"
            tabIndex={0}
          >
            <polyline
              points={`${anchors.mantle.x},${anchors.mantle.y} 365,115 435,115`}
              fill="none"
              stroke={selectedLayer === 'mantle' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'mantle' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'mantle' ? 'none' : '3,3'}
            />
            <circle cx={anchors.mantle.x} cy={anchors.mantle.y} r={selectedLayer === 'mantle' ? '5.5' : '3.5'} fill={selectedLayer === 'mantle' ? '#deb87a' : '#ffffff'} />
            <circle cx={anchors.mantle.x} cy={anchors.mantle.y} r="8" fill="none" stroke="#deb87a" strokeWidth="1.2" opacity={selectedLayer === 'mantle' ? '0.9' : '0'} />
          </g>

          {/* 3. Outer Core Pin & Dogleg Pointer Line */}
          <g
            className={`pointer-line-group ${selectedLayer === 'outer' ? 'is-active-pointer' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLayer('outer');
            }}
            style={{
              cursor: 'pointer',
              pointerEvents: anchors.outer.visible ? 'auto' : 'none',
              opacity: anchors.outer.visible ? (selectedLayer === 'outer' ? 1 : 0.75) : 0.1,
              transition: 'opacity 0.25s ease',
            }}
            role="button"
            tabIndex={0}
          >
            <polyline
              points={`${anchors.outer.x},${anchors.outer.y} 365,190 435,190`}
              fill="none"
              stroke={selectedLayer === 'outer' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'outer' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'outer' ? 'none' : '3,3'}
            />
            <circle cx={anchors.outer.x} cy={anchors.outer.y} r={selectedLayer === 'outer' ? '5.5' : '3.5'} fill={selectedLayer === 'outer' ? '#deb87a' : '#ffffff'} />
            <circle cx={anchors.outer.x} cy={anchors.outer.y} r="8" fill="none" stroke="#deb87a" strokeWidth="1.2" opacity={selectedLayer === 'outer' ? '0.9' : '0'} />
          </g>

          {/* 4. Inner Core Pin & Dogleg Pointer Line */}
          <g
            className={`pointer-line-group ${selectedLayer === 'inner' ? 'is-active-pointer' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLayer('inner');
            }}
            style={{
              cursor: 'pointer',
              pointerEvents: anchors.inner.visible ? 'auto' : 'none',
              opacity: anchors.inner.visible ? (selectedLayer === 'inner' ? 1 : 0.75) : 0.1,
              transition: 'opacity 0.25s ease',
            }}
            role="button"
            tabIndex={0}
          >
            <polyline
              points={`${anchors.inner.x},${anchors.inner.y} 365,265 435,265`}
              fill="none"
              stroke={selectedLayer === 'inner' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'inner' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'inner' ? 'none' : '3,3'}
            />
            <circle cx={anchors.inner.x} cy={anchors.inner.y} r={selectedLayer === 'inner' ? '5.5' : '3.5'} fill={selectedLayer === 'inner' ? '#deb87a' : '#ffffff'} />
            <circle cx={anchors.inner.x} cy={anchors.inner.y} r="8" fill="none" stroke="#deb87a" strokeWidth="1.2" opacity={selectedLayer === 'inner' ? '0.9' : '0'} />
          </g>
        </svg>


      </div>

      {/* 4 Floating Layer Callout Cards on the Right */}
      <div className="cutaway-cards-column">
        {layerCardsData.map((card) => {
          const isSelected = selectedLayer === card.key;
          return (
            <div
              key={card.key}
              className={`cutaway-floating-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => {
                onSelectLayer(card.key);
                if (isSelected && onOpenLayerModal) {
                  onOpenLayerModal(card.key);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectLayer(card.key)}
              title={isSelected ? `Click again to read full ${card.title} syllabus notes` : `Select ${card.title}`}
            >
              <div className="card-thumb-wrap">
                <img src={card.icon} alt={card.title} className="card-thumb-img" />
              </div>
              <div className="card-info">
                <strong className="card-title">{card.title}</strong>
                <span className="card-thickness">{card.thickness}</span>
                <span className="card-desc">{card.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
