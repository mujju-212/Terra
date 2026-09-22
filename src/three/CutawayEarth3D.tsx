import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ChevronRight, Layers3, RotateCw, Flame, Sparkles } from 'lucide-react';

export interface LayerInfo {
  id: string;
  name: string;
  depth: string;
  thickness: string;
  temp: string;
  state: string;
  composition: string;
  description: string;
  color: string;
  emissive: string;
  emissiveIntensity: number;
  radius: number;
}

export const earthLayersData: LayerInfo[] = [
  {
    id: 'crust',
    name: 'Crust (Lithosphere)',
    depth: '0 – 40 km',
    thickness: '~35 km avg',
    temp: 'Up to 400°C',
    state: 'Solid brittle rock',
    composition: 'Silicates, granite (continental), basalt (oceanic)',
    description: 'The outermost solid shell, accounting for less than 1% of Earth’s volume. Fragmented into moving tectonic plates that float over the underlying mantle.',
    color: '#deb87a',
    emissive: '#deb87a',
    emissiveIntensity: 0.1,
    radius: 1.0,
  },
  {
    id: 'mantle',
    name: 'Mantle (Asthenosphere)',
    depth: '40 – 2,900 km',
    thickness: '~2,860 km',
    temp: '1,000°C – 3,700°C',
    state: 'Semi-molten / Plastic rock',
    composition: 'Dense silicate minerals rich in iron & magnesium (peridotite)',
    description: 'Enormous convective layer driving continental drift and volcanism. Makes up 84% of Earth’s total volume.',
    color: '#d4652a',
    emissive: '#d4652a',
    emissiveIntensity: 0.25,
    radius: 0.82,
  },
  {
    id: 'outer-core',
    name: 'Outer Core',
    depth: '2,900 – 5,150 km',
    thickness: '~2,250 km',
    temp: '4,000°C – 5,000°C',
    state: 'Liquid / Fluid metal',
    composition: 'Liquid Iron (~85%) & Nickel with sulfur/oxygen traces',
    description: 'Vigorous helical fluid convection currents in this molten metal ocean generate Earth’s planetary magnetic field (geodynamo), shielding life from solar radiation.',
    color: '#e8871e',
    emissive: '#e8871e',
    emissiveIntensity: 0.5,
    radius: 0.55,
  },
  {
    id: 'inner-core',
    name: 'Inner Core',
    depth: '5,150 – 6,371 km',
    thickness: '1,220 km radius',
    temp: '~5,000°C – 5,400°C',
    state: 'Solid metallic crystalline',
    composition: 'Solid crystalline Iron-Nickel alloy under 3.6M atm pressure',
    description: 'As hot as the surface of the Sun! Enormous gravitational pressure prevents it from melting, preserving an intensely vibrating solid crystalline core.',
    color: '#fff3b0',
    emissive: '#ffaa22',
    emissiveIntensity: 0.95,
    radius: 0.28,
  },
];

function CutawayEarthMesh({
  activeLayer,
  cutawayAngle,
  autoRotate,
  onSelectLayer,
}: {
  activeLayer: number;
  cutawayAngle: number;
  autoRotate: boolean;
  onSelectLayer: (idx: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Load user's photorealistic Earth albedo and elevation bump map for outer crust
  const crustTextures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const albedo = loader.load('/earth/earth-albedo.jpg');
    const bump = loader.load('/earth/earth-bump.jpg');
    albedo.colorSpace = THREE.SRGBColorSpace;
    albedo.wrapS = THREE.RepeatWrapping;
    bump.wrapS = THREE.RepeatWrapping;
    return { albedo, bump };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.25;
    }

    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 3.5) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  // Theta length calculates slice cutout: full sphere is 2*PI, slice removes wedge
  const thetaLength = (Math.PI * 2) - cutawayAngle;

  return (
    <group ref={groupRef} rotation={[0.3, -0.7, 0]}>
      {/* Layer 0: Crust (Textured with User's 8K NASA Blue Marble Albedo & Elevation Relief) */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer(0);
        }}
      >
        <sphereGeometry args={[1.0, 64, 48, 0, thetaLength]} />
        <meshStandardMaterial
          map={crustTextures.albedo}
          bumpMap={crustTextures.bump}
          bumpScale={0.05}
          color={activeLayer === 0 ? '#ffffff' : '#d8d8d8'}
          roughness={0.65}
          metalness={0.15}
          emissive={activeLayer === 0 ? '#deb87a' : '#1a1814'}
          emissiveIntensity={activeLayer === 0 ? 0.35 : 0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 1: Mantle */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer(1);
        }}
      >
        <sphereGeometry args={[0.82, 64, 48, 0, thetaLength]} />
        <meshStandardMaterial
          color={activeLayer === 1 ? '#ff7e36' : '#bf551d'}
          roughness={0.6}
          metalness={0.2}
          emissive={activeLayer === 1 ? '#d4652a' : '#451703'}
          emissiveIntensity={activeLayer === 1 ? 0.8 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 2: Outer Core */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer(2);
        }}
      >
        <sphereGeometry args={[0.55, 64, 48, 0, thetaLength]} />
        <meshStandardMaterial
          color={activeLayer === 2 ? '#ffa02e' : '#d16e00'}
          roughness={0.4}
          metalness={0.5}
          emissive={activeLayer === 2 ? '#ff9900' : '#8f3e00'}
          emissiveIntensity={activeLayer === 2 ? 1.0 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 3: Inner Core (Incandescent) */}
      <mesh
        ref={coreRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer(3);
        }}
      >
        <sphereGeometry args={[0.28, 48, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.8}
          emissive={activeLayer === 3 ? '#ffcc00' : '#ff7700'}
          emissiveIntensity={activeLayer === 3 ? 2.2 : 1.4}
        />
      </mesh>

      {/* Cross section cut cap planes showing strata edges */}
      {cutawayAngle > 0.05 && (
        <group>
          {/* Start cut plane */}
          <mesh rotation={[0, 0, 0]}>
            <circleGeometry args={[1.0, 32, 0, Math.PI]} />
            <meshStandardMaterial
              color="#542c12"
              roughness={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* End cut plane */}
          <mesh rotation={[0, thetaLength, 0]}>
            <circleGeometry args={[1.0, 32, 0, Math.PI]} />
            <meshStandardMaterial
              color="#542c12"
              roughness={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {/* Atmosphere rim halo */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial
          color="#c9a15a"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function CutawayEarth3D() {
  const [activeLayer, setActiveLayer] = useState(1);
  const [cutaway, setCutaway] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [sliceDegrees, setSliceDegrees] = useState(90);

  const cutawayRads = cutaway ? (sliceDegrees * Math.PI) / 180 : 0;
  const current = earthLayersData[activeLayer];

  return (
    <div className="cutaway-3d-container">
      <div className="cutaway-header-bar">
        <div className="cutaway-title">
          <Layers3 size={15} className="text-accent" />
          <span>INTERACTIVE 3D CUTAWAY EARTH</span>
        </div>
        <div className="cutaway-controls-row">
          <button
            type="button"
            className={`cutaway-pill-btn ${cutaway ? 'active' : ''}`}
            onClick={() => setCutaway(!cutaway)}
          >
            {cutaway ? 'Slice Open' : 'Full Sphere'}
          </button>
          <button
            type="button"
            className={`cutaway-pill-btn ${autoRotate ? 'active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle rotation"
          >
            <RotateCw size={13} className={autoRotate ? 'animate-spin-slow' : ''} />
            <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
          </button>
        </div>
      </div>

      <div className="cutaway-viewport-layout">
        {/* Real Three.js Canvas */}
        <div className="cutaway-canvas-wrap">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0.4, 2.7], fov: 42 }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.65} />
            <pointLight position={[4, 3, 3]} intensity={1.5} color="#fff6e8" />
            <pointLight position={[-3, -2, -2]} intensity={0.4} color="#603010" />
            <CutawayEarthMesh
              activeLayer={activeLayer}
              cutawayAngle={cutawayRads}
              autoRotate={autoRotate}
              onSelectLayer={setActiveLayer}
            />
          </Canvas>

          {/* Interactive Slice Scrub Slider */}
          {cutaway && (
            <div className="cutaway-slice-slider">
              <span>Slice Cutout: {sliceDegrees}°</span>
              <input
                type="range"
                min="30"
                max="140"
                value={sliceDegrees}
                onChange={(e) => setSliceDegrees(Number(e.target.value))}
                aria-label="Adjust cutaway slice angle"
              />
            </div>
          )}

          <div className="cutaway-hint">
            <span>Click any layer in 3D or buttons below to inspect</span>
          </div>
        </div>

        {/* Layer Fact Card */}
        <div className="cutaway-data-panel liquid-glass">
          <div className="panel-depth-badge">
            <span>DEPTH: {current.depth}</span>
            <span className="temp-tag">
              <Flame size={12} /> {current.temp}
            </span>
          </div>

          <h3>{current.name}</h3>
          <p className="panel-desc">{current.description}</p>

          <div className="panel-spec-grid">
            <div className="spec-item">
              <small>THICKNESS / RADIUS</small>
              <strong>{current.thickness}</strong>
            </div>
            <div className="spec-item">
              <small>PHYSICAL STATE</small>
              <strong>{current.state}</strong>
            </div>
            <div className="spec-item full-width">
              <small>KEY COMPOSITION</small>
              <span>{current.composition}</span>
            </div>
          </div>

          <div className="layer-tabs">
            {earthLayersData.map((layer, idx) => (
              <button
                type="button"
                key={layer.id}
                className={`layer-tab-btn ${activeLayer === idx ? 'active' : ''}`}
                onClick={() => setActiveLayer(idx)}
              >
                <span className="layer-tab-dot" style={{ background: layer.color }} />
                <span>{layer.name.split(' ')[0]}</span>
                <ChevronRight size={13} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
