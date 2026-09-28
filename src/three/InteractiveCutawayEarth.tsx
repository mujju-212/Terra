import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type LayerKey = 'crust' | 'mantle' | 'outer' | 'inner';

interface CutawayEarthProps {
  selectedLayer: LayerKey;
  onSelectLayer: (layer: LayerKey) => void;
  onOpenLayerModal?: (layer: LayerKey) => void;
}

interface GlobeSceneProps {
  selectedLayer: LayerKey;
  onSelectLayer: (layer: LayerKey) => void;
  userRotationY: React.MutableRefObject<number>;
  userRotationX: React.MutableRefObject<number>;
  velocityRef: React.MutableRefObject<{ x: number; y: number }>;
  isDragging: React.MutableRefObject<boolean>;
}

function GlobeCutawayScene({
  selectedLayer,
  onSelectLayer,
  userRotationY,
  userRotationX,
  velocityRef,
  isDragging,
}: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const mantleRef = useRef<THREE.Mesh>(null);
  const crustRef = useRef<THREE.Mesh>(null);

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Authentic NASA 8K Blue Marble Surface Map (Deep oceans, crisp continents)
  const earthAlbedo = useMemo(() => {
    const tex = textureLoader.load('/textures/earth-albedo.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [textureLoader]);

  // Concentric Core Cross-Section Map
  const coreCrossSection = useMemo(() => {
    const tex = textureLoader.load('/textures/earth-core-cross-section.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureLoader]);

  // Magma Flow Normal/Noise texture
  const magmaTex = useMemo(() => {
    const tex = textureLoader.load('/textures/stage-03-magma-sphere.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, [textureLoader]);

  useFrame((state) => {
    // Decelerate user drag inertia ONLY - NO AUTO-ROTATION (Static standing pose)
    if (!isDragging.current) {
      if (Math.abs(velocityRef.current.x) > 0.0001 || Math.abs(velocityRef.current.y) > 0.0001) {
        userRotationY.current += velocityRef.current.x;
        userRotationX.current = Math.max(-0.45, Math.min(0.45, userRotationX.current + velocityRef.current.y));
        velocityRef.current.x *= 0.88;
        velocityRef.current.y *= 0.88;
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = userRotationY.current;
      groupRef.current.rotation.x = userRotationX.current;
    }

    // Inner core gentle heat pulsation
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 2.4) * 0.035;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  // Layer Radii:
  // Globe Radius: 1.45
  // Cutout: Front-Right quadrant (phi from Math.PI to 2.5 * Math.PI = 270 degrees sweep)
  // Missing 90° wedge is between phi = 0.5 * Math.PI (front) and Math.PI (right), i.e. x >= 0, z >= 0
  const globeRadius = 1.45;
  const cutStart = Math.PI;
  const cutAngle = Math.PI * 1.5;

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* ── 1. INNER CORE (Solid Incandescent Iron-Nickel Sphere) ── */}
      <mesh
        ref={coreRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('inner');
        }}
        scale={selectedLayer === 'inner' ? 1.08 : 1.0}
      >
        <sphereGeometry args={[0.50, 32, 32]} />
        <meshStandardMaterial
          color={selectedLayer === 'inner' ? '#ffffff' : '#fff5cc'}
          emissive={selectedLayer === 'inner' ? '#ffaa00' : '#ff9900'}
          emissiveIntensity={selectedLayer === 'inner' ? 1.3 : 0.9}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Point light shining from inner core */}
      <pointLight color="#ffc860" intensity={3.8} distance={4.2} />

      {/* ── 2. OUTER CORE (Liquid Molten Iron-Nickel Shell with Front-Right Cutaway) ── */}
      <mesh
        ref={outerCoreRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('outer');
        }}
      >
        <sphereGeometry args={[0.95, 48, 48, cutStart, cutAngle]} />
        <meshStandardMaterial
          map={magmaTex}
          color={selectedLayer === 'outer' ? '#ffffff' : '#ffa533'}
          emissive="#ff4400"
          emissiveIntensity={selectedLayer === 'outer' ? 0.95 : 0.55}
          roughness={0.35}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 3. MANTLE (Semi-Solid Convective Silicate Rock with Front-Right Cutaway) ── */}
      <mesh
        ref={mantleRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('mantle');
        }}
      >
        <sphereGeometry args={[1.38, 56, 56, cutStart, cutAngle]} />
        <meshStandardMaterial
          color={selectedLayer === 'mantle' ? '#ff6b4a' : '#d94e28'}
          emissive="#7f1d1d"
          emissiveIntensity={selectedLayer === 'mantle' ? 0.65 : 0.25}
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 4. CRUST & EARTH SURFACE (Clean NASA Blue Marble without Clouds) ── */}
      <mesh
        ref={crustRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('crust');
        }}
      >
        <sphereGeometry args={[globeRadius, 64, 64, cutStart, cutAngle]} />
        <meshStandardMaterial
          map={earthAlbedo}
          roughness={0.65}
          metalness={0.05}
          emissive={selectedLayer === 'crust' ? '#38bdf8' : '#000000'}
          emissiveIntensity={selectedLayer === 'crust' ? 0.25 : 0.0}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── 5. FLAT CUT FACES (Concentric Cross-Section Caps on Front-Right Cutaway) ── */}
      {/* Cut Face 1 (Plane along z = 0, for x >= 0, facing front toward camera) */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[globeRadius, 64, -Math.PI * 0.5, Math.PI]} />
        <meshBasicMaterial
          map={coreCrossSection}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cut Face 2 (Plane along x = 0, for z >= 0, facing right toward callout cards) */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[globeRadius, 64, -Math.PI * 0.5, Math.PI]} />
        <meshBasicMaterial
          map={coreCrossSection}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 6. ACTIVE LAYER HIGHLIGHT RINGS ON BOTH CUT FACES ── */}
      {selectedLayer === 'crust' && (
        <>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[globeRadius * 0.965, globeRadius, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#deb87a" side={THREE.DoubleSide} transparent opacity={0.85} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <ringGeometry args={[globeRadius * 0.965, globeRadius, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#deb87a" side={THREE.DoubleSide} transparent opacity={0.85} />
          </mesh>
        </>
      )}
      {selectedLayer === 'mantle' && (
        <>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[0.96, 1.38, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ea580c" side={THREE.DoubleSide} transparent opacity={0.55} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <ringGeometry args={[0.96, 1.38, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ea580c" side={THREE.DoubleSide} transparent opacity={0.55} />
          </mesh>
        </>
      )}
      {selectedLayer === 'outer' && (
        <>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[0.51, 0.95, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <ringGeometry args={[0.51, 0.95, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        </>
      )}
      {selectedLayer === 'inner' && (
        <>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[0, 0.50, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.75} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <ringGeometry args={[0, 0.50, 64, 1, -Math.PI * 0.5, Math.PI]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.75} />
          </mesh>
        </>
      )}

      {/* Subtle Atmospheric Blue Corona Rim Glow */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.025, 48, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
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
    thickness: '~2,400 km thick',
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
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const userRotationY = useRef(-0.25);
  const userRotationX = useRef(0.20);
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

    const rotDeltaY = dx * 0.005;
    const rotDeltaX = dy * 0.004;

    userRotationY.current += rotDeltaY;
    userRotationX.current = Math.max(-0.45, Math.min(0.45, userRotationX.current + rotDeltaX));
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
    <div className="interactive-cutaway-container">
      {/* 3D WebGL Globe Viewport */}
      <div
        className="cutaway-earth-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        title="Interactive 3D Earth Cutaway. Click any layer to explore."
      >
        <Canvas
          camera={{ position: [0, 0, 4.1], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 3, 3]} intensity={2.8} color="#fffcf2" />
          <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#1b304f" />
          <GlobeCutawayScene
            selectedLayer={selectedLayer}
            onSelectLayer={onSelectLayer}
            userRotationY={userRotationY}
            userRotationX={userRotationX}
            velocityRef={velocityRef}
            isDragging={isDragging}
          />
        </Canvas>

        {/* Pointer lines SVG connecting 3D cutaway to cards */}
        <svg className="cutaway-pointer-lines-svg" viewBox="0 0 500 440" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cutawayGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#deb87a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#deb87a" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="cutawayDim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* 1. Crust Dogleg Pointer Line */}
          <g className={`pointer-line-group ${selectedLayer === 'crust' ? 'is-active-pointer' : ''}`}>
            <polyline
              points="335,110 430,48 495,48"
              fill="none"
              stroke={selectedLayer === 'crust' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'crust' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'crust' ? 'none' : '3,3'}
            />
            <circle cx="335" cy="110" r={selectedLayer === 'crust' ? '5' : '3.5'} fill={selectedLayer === 'crust' ? '#deb87a' : '#ffffff'} />
            <circle cx="335" cy="110" r="8" fill="none" stroke="#deb87a" strokeWidth="1" opacity={selectedLayer === 'crust' ? '0.85' : '0'} />
          </g>

          {/* 2. Mantle Dogleg Pointer Line */}
          <g className={`pointer-line-group ${selectedLayer === 'mantle' ? 'is-active-pointer' : ''}`}>
            <polyline
              points="305,155 430,148 495,148"
              fill="none"
              stroke={selectedLayer === 'mantle' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'mantle' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'mantle' ? 'none' : '3,3'}
            />
            <circle cx="305" cy="155" r={selectedLayer === 'mantle' ? '5' : '3.5'} fill={selectedLayer === 'mantle' ? '#deb87a' : '#ffffff'} />
            <circle cx="305" cy="155" r="8" fill="none" stroke="#deb87a" strokeWidth="1" opacity={selectedLayer === 'mantle' ? '0.85' : '0'} />
          </g>

          {/* 3. Outer Core Dogleg Pointer Line */}
          <g className={`pointer-line-group ${selectedLayer === 'outer' ? 'is-active-pointer' : ''}`}>
            <polyline
              points="275,208 430,248 495,248"
              fill="none"
              stroke={selectedLayer === 'outer' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'outer' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'outer' ? 'none' : '3,3'}
            />
            <circle cx="275" cy="208" r={selectedLayer === 'outer' ? '5' : '3.5'} fill={selectedLayer === 'outer' ? '#deb87a' : '#ffffff'} />
            <circle cx="275" cy="208" r="8" fill="none" stroke="#deb87a" strokeWidth="1" opacity={selectedLayer === 'outer' ? '0.85' : '0'} />
          </g>

          {/* 4. Inner Core Dogleg Pointer Line */}
          <g className={`pointer-line-group ${selectedLayer === 'inner' ? 'is-active-pointer' : ''}`}>
            <polyline
              points="245,230 430,348 495,348"
              fill="none"
              stroke={selectedLayer === 'inner' ? 'url(#cutawayGold)' : 'url(#cutawayDim)'}
              strokeWidth={selectedLayer === 'inner' ? '2.2' : '1.2'}
              strokeDasharray={selectedLayer === 'inner' ? 'none' : '3,3'}
            />
            <circle cx="245" cy="230" r={selectedLayer === 'inner' ? '5' : '3.5'} fill={selectedLayer === 'inner' ? '#deb87a' : '#ffffff'} />
            <circle cx="245" cy="230" r="8" fill="none" stroke="#deb87a" strokeWidth="1" opacity={selectedLayer === 'inner' ? '0.85' : '0'} />
          </g>
        </svg>

        {/* 3D Drag Instruction Pill */}
        <div className="cutaway-drag-badge">
          <span>DRAG TO ROTATE 3D CUTAWAY</span>
        </div>
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
