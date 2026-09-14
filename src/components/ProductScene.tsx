import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function documentShape(w = 2.35, h = 3.12, fold = 0.58) {
  const s = new THREE.Shape(),
    r = 0.1,
    x = -w / 2,
    y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - fold);
  s.lineTo(x + w - fold, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function labelTexture(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d")!;
  context.fillStyle = color;
  context.font = "500 27px Arial";
  context.textAlign = "center";
  context.fillText(text, 256, 72);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Document({
  index,
  action,
  reduced,
}: {
  index: number;
  action: string;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const shape = useMemo(() => documentShape(), []);
  const label = useMemo(
    () =>
      labelTexture(
        index === 0 ? "N O D O C   /   P D F" : "D O C U M E N T   0" + index,
        index === 0 ? "#ffdcde" : "#83868c",
      ),
    [index],
  );
  useEffect(() => () => label.dispose(), [label]);
  const material = useMemo(
    () => ({
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.02,
      curveSegments: 10,
    }),
    [],
  );
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const isSplit = action === "split",
      isMerge = action === "merge",
      isOrganize = action === "organize";
    const x =
      index === 0
        ? isSplit
          ? -0.65
          : 0
        : (index === 1 ? -1 : 1) *
          (isSplit ? 1.85 : isOrganize ? 1.58 : isMerge ? 0.16 : 1.05);
    const y = index === 0 ? 0.15 : index === 1 ? 0.46 : -0.22;
    const z = index === 0 ? 0.7 : isMerge ? 0.3 : -0.2 - index * 0.12;
    const damp = (from: number, to: number) =>
      reduced ? to : THREE.MathUtils.damp(from, to, 5, Math.min(delta, 0.05));
    g.position.x = damp(g.position.x, x);
    g.position.y = damp(
      g.position.y,
      y +
        (reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.07),
    );
    g.position.z = damp(g.position.z, z);
    g.rotation.x = damp(g.rotation.x, 0.08 + state.pointer.y * 0.09);
    g.rotation.y = damp(g.rotation.y, -0.3 + state.pointer.x * 0.16);
    g.rotation.z = damp(
      g.rotation.z,
      index === 0
        ? -0.12
        : index === 1
          ? isMerge
            ? -0.1
            : 0.19
          : isMerge
            ? -0.1
            : -0.27,
    );
  });
  return (
    <group
      ref={group}
      position={[
        index === 0 ? 0 : index === 1 ? -1.05 : 1.05,
        index === 0 ? 0.15 : index === 1 ? 0.46 : -0.22,
        index === 0 ? 0.7 : -0.2 - index * 0.12,
      ]}
      rotation={[0.08, -0.3, index === 0 ? -0.12 : index === 1 ? 0.19 : -0.27]}
    >
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, material]} />
        <meshPhysicalMaterial
          color={index === 0 ? "#b83f52" : "#f0f0f5"}
          roughness={0.36}
          metalness={index === 0 ? 0.15 : 0.02}
          clearcoat={0.5}
          clearcoatRoughness={0.42}
        />
      </mesh>
      {index === 0 ? (
        <>
          <group position={[-0.5, -0.1, 0.14]}>
            <mesh position={[0.08, 0.38, 0]}>
              <boxGeometry args={[0.18, 1.04, 0.018]} />
              <meshStandardMaterial color="#722435" roughness={0.6} />
            </mesh>
            <mesh position={[0.77, 0.38, 0]}>
              <boxGeometry args={[0.18, 1.04, 0.018]} />
              <meshStandardMaterial color="#722435" roughness={0.6} />
            </mesh>
            <mesh position={[0.425, 0.38, 0]} rotation={[0, 0, 0.59]}>
              <boxGeometry args={[0.19, 1.17, 0.018]} />
              <meshStandardMaterial color="#722435" roughness={0.6} />
            </mesh>
          </group>
          <mesh position={[0, -1.04, 0.147]}>
            <planeGeometry args={[1.5, 0.38]} />
            <meshBasicMaterial map={label} transparent depthWrite={false} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0, 1.01, 0.145]}>
            <planeGeometry args={[1.6, 0.4]} />
            <meshBasicMaterial map={label} transparent depthWrite={false} />
          </mesh>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <mesh key={i} position={[-(i % 3) * 0.06, 0.48 - i * 0.18, 0.143]}>
              <planeGeometry args={[1.55 - (i % 3) * 0.12, 0.035]} />
              <meshBasicMaterial color={i < 2 ? "#9eabb2" : "#d2d6dc"} />
            </mesh>
          ))}
          <mesh position={[-0.47, -0.97, 0.145]}>
            <planeGeometry args={[0.55, 0.22]} />
            <meshBasicMaterial color={index === 1 ? "#bfcfdb" : "#d7c7d7"} />
          </mesh>
        </>
      )}
      <mesh
        position={[0.596, 0.982, 0.13]}
        rotation={[0, 0, Math.PI]}
        castShadow
      >
        <extrudeGeometry
          args={[
            new THREE.Shape([
              new THREE.Vector2(0, 0),
              new THREE.Vector2(-0.58, 0),
              new THREE.Vector2(0, -0.58),
            ]),
            {
              depth: 0.025,
              bevelEnabled: true,
              bevelSize: 0.02,
              bevelThickness: 0.01,
              bevelSegments: 2,
            },
          ]}
        />
        <meshPhysicalMaterial
          color={index === 0 ? "#f5b2b9" : "#dedee8"}
          roughness={0.45}
          metalness={0.04}
        />
      </mesh>
    </group>
  );
}

export default function ProductScene({
  action,
  active,
  reduced,
}: {
  action: string;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 8.3], fov: 43 }}
      shadows
      frameloop={active ? (reduced ? "demand" : "always") : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      fallback={
        <img src="/assets/logo/nodoc-logo.png" alt="NoDoc document logo" />
      }
    >
      <ambientLight intensity={1.65} />
      <directionalLight
        position={[-4, 6, 7]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[5, 1, 4]} intensity={1.5} color="#d9ddff" />
      <directionalLight position={[-2, -3, 3]} intensity={0.3} />
      <Document index={2} action={action} reduced={reduced} />
      <Document index={1} action={action} reduced={reduced} />
      <Document index={0} action={action} reduced={reduced} />
    </Canvas>
  );
}
