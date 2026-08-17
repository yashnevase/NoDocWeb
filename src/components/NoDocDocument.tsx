/**
 * NoDocDocument.tsx
 * Premium procedural 3D NoDoc document — faithfully matches the official logo:
 *   ■ Deep crimson rounded rectangular cover (3:4 proportions, thick depth)
 *   ■ Folded upper-right page corner — white underside revealed
 *   ■ Recessed "N" letterform on cover face (same dark-red hue, sunken)
 *   ■ White page stack visible from side/top edge
 *   ■ Matte, physically-plausible materials — not shiny plastic
 *
 * Animations via `action` prop:
 *   'hero'     → entrance + floating
 *   'default'  → idle 3/4 view
 *   'organize' → page explosion then reorder
 *   'merge'    → two stacks converge
 *   'split'    → one document separates into two
 *   'edit'     → pages fan/spread open
 *   'search'   → pages ripple
 */

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// ─── BRAND CONSTANTS ─────────────────────────────────────────────────────────
const CW = 3;          // cover width
const CH = 4;          // cover height
const CD = 0.45;       // cover depth — thick & chunky like the logo
const PW = 2.76;       // page width
const PH = 3.76;       // page height
const PD = 0.032;      // single page thickness
const N_PAGES = 5;

// Colors — matched to the official logo render
const COL_COVER_FACE = "#C41A2C";   // bright crimson front face
const COL_COVER_BODY = "#901525";   // darker side/back body
const COL_COVER_DEEP = "#6B0E1A";   // deepest shadow — for recessed N
const COL_PAGE_FACE  = "#F6F4F0";   // warm white page surface
const COL_PAGE_EDGE  = "#D8D4CB";   // page edge, slightly greyed

// ─── TYPES ───────────────────────────────────────────────────────────────────
export interface NoDocDocumentProps {
  action?: string;
  isHero?: boolean;
  scrollY?: number;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function pageBasePos(i: number): [number, number, number] {
  return [
    0.015 + i * 0.004,
    0,
    -CD / 2 + 0.008 + i * (PD + 0.003),
  ];
}

// ─── FOLDED CORNER ───────────────────────────────────────────────────────────
/**
 * Accurate folded dog-ear corner matching the logo:
 * - A triangular flap of the cover folds back
 * - Reveals the white page underneath
 * - The fold crease sits at the exact upper-right corner
 */
function FoldedCorner() {
  // How big the fold triangle is (relative to cover size)
  const FOLD = 0.78;

  // Outer cover-colored flap (the part that folded over)
  const flapShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(-FOLD, 0);
    s.lineTo(0, -FOLD);
    s.closePath();
    return s;
  }, []);

  // Inner white underside (slightly smaller so we see the white)
  const underShape = useMemo(() => {
    const inset = 0.04;
    const s = new THREE.Shape();
    s.moveTo(-inset, -inset);
    s.lineTo(-(FOLD - 0.06), -inset);
    s.lineTo(-inset, -(FOLD - 0.06));
    s.closePath();
    return s;
  }, []);

  const flapExtrude = useMemo(() => ({ depth: 0.04, bevelEnabled: false }), []);
  const underExtrude = useMemo(() => ({ depth: 0.015, bevelEnabled: false }), []);

  // Place at upper-right corner of cover face
  const px = CW / 2;
  const py = CH / 2;
  const pz = CD / 2 + 0.001;

  return (
    <group position={[px, py, pz]}>
      {/* Dark-red cover flap */}
      <mesh>
        <extrudeGeometry args={[flapShape, flapExtrude]} />
        <meshStandardMaterial color={COL_COVER_BODY} roughness={0.65} metalness={0.02} />
      </mesh>
      {/* White page underside */}
      <mesh position={[0, 0, 0.041]}>
        <extrudeGeometry args={[underShape, underExtrude]} />
        <meshStandardMaterial color={COL_PAGE_FACE} roughness={0.88} metalness={0} />
      </mesh>
    </group>
  );
}

// ─── RECESSED "N" ────────────────────────────────────────────────────────────
/**
 * Builds the "N" from three extruded strokes.
 * The geometry sits slightly INSIDE the cover face (recessed / embossed effect).
 * Color is the darkest red shade — matching the logo's sunken letter.
 */
function RecessedN() {
  const SW = 0.165;   // stroke width
  const H  = 1.15;   // total N height
  const W  = 0.88;   // total N width
  const DW = 0.20;   // diagonal bar width

  const strokes = useMemo(() => {
    // Left vertical bar
    const left = new THREE.Shape();
    left.moveTo(0, 0);
    left.lineTo(SW, 0);
    left.lineTo(SW, H);
    left.lineTo(0, H);
    left.closePath();

    // Right vertical bar
    const right = new THREE.Shape();
    right.moveTo(W - SW, 0);
    right.lineTo(W, 0);
    right.lineTo(W, H);
    right.lineTo(W - SW, H);
    right.closePath();

    // Diagonal bar — goes from top-left to bottom-right
    const diag = new THREE.Shape();
    diag.moveTo(SW, H);
    diag.lineTo(SW + DW, H);
    diag.lineTo(W - SW, 0);
    diag.lineTo(W - SW - DW, 0);
    diag.closePath();

    return [left, right, diag];
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 8,
  }), []);

  // Center the N on the cover face, recessed slightly behind face plane
  const offsetX = -W / 2;
  const offsetY = -H / 2;
  const recessZ = CD / 2 - 0.032; // slightly behind face → recessed look

  return (
    <group position={[offsetX, offsetY, recessZ]}>
      {strokes.map((shape, i) => (
        <mesh key={i} castShadow>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial
            color={COL_COVER_DEEP}
            roughness={0.70}
            metalness={0.0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── SINGLE PAGE MESH ────────────────────────────────────────────────────────
interface PageMeshProps {
  index: number;
  meshRef: React.RefObject<THREE.Mesh | null>;
}
function PageMesh({ index, meshRef }: PageMeshProps) {
  const [bx, by, bz] = pageBasePos(index);
  return (
    <mesh
      ref={meshRef as React.RefObject<THREE.Mesh>}
      position={[bx, by, bz]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[PW, PH, PD]} />
      <meshStandardMaterial color={COL_PAGE_FACE} roughness={0.93} metalness={0} />
    </mesh>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function NoDocDocument({
  action = "default",
  isHero = false,
  scrollY = 0,
}: NoDocDocumentProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Five stable page refs
  const pA = useRef<THREE.Mesh | null>(null);
  const pB = useRef<THREE.Mesh | null>(null);
  const pC = useRef<THREE.Mesh | null>(null);
  const pD = useRef<THREE.Mesh | null>(null);
  const pE = useRef<THREE.Mesh | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageRefs = useMemo(() => [pA, pB, pC, pD, pE], []);

  const prevAction = useRef<string>("");
  const clockRef = useRef(0);

  // ── INITIAL 3/4 POSE ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!groupRef.current) return;
    // 3/4 angle: slight tilt so we see front + right edge (matching logo)
    groupRef.current.rotation.x = 0.15;
    groupRef.current.rotation.y = -0.5;
    groupRef.current.rotation.z = 0;
    groupRef.current.scale.set(isHero ? 1.1 : 1, isHero ? 1.1 : 1, isHero ? 1.1 : 1);
  }, [isHero]);

  // ── ENTRANCE ANIMATION ────────────────────────────────────────────────────
  useEffect(() => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const s = isHero ? 1.1 : 1.0;
    gsap.fromTo(g.scale, { x: 0.5, y: 0.5, z: 0.5 }, { x: s, y: s, z: s, duration: 1.3, ease: "elastic.out(1,0.55)" });
    gsap.fromTo(g.rotation, { y: -2.0 }, { y: -0.5, duration: 1.5, ease: "power3.out" });
    gsap.fromTo(g.position, { y: -2 }, { y: 0, duration: 1.3, ease: "power3.out" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHero]);

  // ── ACTION ANIMATIONS ─────────────────────────────────────────────────────
  useEffect(() => {
    if (action === prevAction.current) return;
    prevAction.current = action;

    const pages = pageRefs.map((r) => r.current).filter((m): m is THREE.Mesh => m !== null);
    if (pages.length === 0) return;

    pages.forEach((p) => {
      gsap.killTweensOf(p.position);
      gsap.killTweensOf(p.rotation);
    });

    const SPREAD: number[] = [-2.0, -1.0, 0, 1.0, 2.0];
    const REORDER: number[] = [0, 3, 1, 4, 2];

    const resetPages = (delay = 0) => {
      pages.forEach((page, i) => {
        const [bx, by, bz] = pageBasePos(i);
        gsap.to(page.position, { x: bx, y: by, z: bz, duration: 0.65, delay, ease: "power3.inOut" });
        gsap.to(page.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay, ease: "power2.inOut" });
      });
    };

    if (action === "organize") {
      const tl = gsap.timeline();

      // 1. Spread pages out horizontally
      pages.forEach((page, i) => {
        tl.to(page.position, { x: SPREAD[i] ?? 0, y: 0.25, z: 0.18, duration: 0.55, ease: "power2.out" }, i * 0.07);
        tl.to(page.rotation, { z: (i - 2) * 0.06, duration: 0.55, ease: "power2.out" }, i * 0.07);
      });

      // 2. Reorder positions
      tl.addLabel("reorder", "+=0.35");
      pages.forEach((page, i) => {
        const destI = REORDER[i] ?? i;
        tl.to(page.position, { x: SPREAD[destI] ?? 0, duration: 0.5, ease: "power2.inOut" }, "reorder");
      });

      // 3. Regroup
      tl.addLabel("close", "+=0.75");
      pages.forEach((page, i) => {
        const [bx, by, bz] = pageBasePos(i);
        tl.to(page.position, { x: bx, y: by, z: bz, duration: 0.65, ease: "power3.inOut" }, `close+=${i * 0.055}`);
        tl.to(page.rotation, { z: 0, duration: 0.45, ease: "power2.out" }, "close");
      });

    } else if (action === "merge") {
      const tl = gsap.timeline();

      // Separate into two stacks
      pages.forEach((page, i) => {
        const targetX = i < 2 ? -2.4 : 2.4;
        tl.to(page.position, { x: targetX, z: 0.05, duration: 0.5, ease: "power2.out" }, (i < 2 ? i : i - 2) * 0.05);
      });

      // Converge toward center
      tl.addLabel("converge", "+=0.25");
      pages.forEach((page, i) => {
        tl.to(page.position, { x: i < 2 ? -0.3 : 0.3, duration: 0.55, ease: "power2.inOut" }, "converge");
      });

      // Snap together
      tl.addLabel("snap", "+=0.15");
      pages.forEach((page, i) => {
        const [bx, by, bz] = pageBasePos(i);
        tl.to(page.position, { x: bx, y: by, z: bz, duration: 0.45, ease: "back.out(1.7)" }, `snap+=${i * 0.04}`);
      });

    } else if (action === "split") {
      const tl = gsap.timeline();

      // Fan out into two groups
      pages.forEach((page, i) => {
        const goX = i < 2 ? -2.2 : 2.2;
        const localI = i < 2 ? i : i - 2;
        tl.to(page.position, { x: goX, y: localI * 0.12, z: localI * 0.04, duration: 0.65, ease: "power2.inOut" }, localI * 0.05);
      });

      // Pause, then reform
      tl.addLabel("reform", "+=0.85");
      pages.forEach((page, i) => {
        const [bx, by, bz] = pageBasePos(i);
        tl.to(page.position, { x: bx, y: by, z: bz, duration: 0.55, ease: "power3.inOut" }, `reform+=${i * 0.05}`);
      });

    } else if (action === "edit") {
      const tl = gsap.timeline();

      // Fan open like a book
      pages.forEach((page, i) => {
        const spread = (i - (N_PAGES - 1) / 2) * 0.44;
        const [,, bz] = pageBasePos(i);
        tl.to(page.position, { x: spread, y: 0.12, z: bz + 0.14, duration: 0.5, ease: "power2.out" }, i * 0.065);
        tl.to(page.rotation, { z: spread * 0.065, duration: 0.5, ease: "power2.out" }, i * 0.065);
      });

      tl.addLabel("close", "+=0.85");
      pages.forEach((page, i) => {
        const [bx, by, bz] = pageBasePos(i);
        tl.to(page.position, { x: bx, y: by, z: bz, duration: 0.48, ease: "power2.inOut" }, `close+=${i * 0.04}`);
        tl.to(page.rotation, { z: 0, duration: 0.38, ease: "power2.inOut" }, "close");
      });

    } else if (action === "search") {
      // Ripple pages
      const tl = gsap.timeline();
      pages.forEach((page, i) => {
        const [,, bz] = pageBasePos(i);
        tl.to(page.position, { z: bz + 0.3, y: 0.1, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, i * 0.1);
      });
      tl.addLabel("reset", "+=0.3");
      pages.forEach((page, i) => {
        const [bx, by, bz] = pageBasePos(i);
        tl.to(page.position, { x: bx, y: by, z: bz, duration: 0.3, ease: "power2.inOut" }, "reset");
      });

    } else {
      // Default / hero — reset to stack
      resetPages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  // ── SCROLL-DRIVEN ROTATION (hero) ─────────────────────────────────────────
  useEffect(() => {
    if (!groupRef.current || !isHero) return;
    // 0 → front/3/4, 0.5 → side (showing edge), 1 → back toward front
    const targetY = -0.5 + scrollY * Math.PI * 1.15;
    gsap.to(groupRef.current.rotation, { y: targetY, duration: 0.35, ease: "power2.out" });
  }, [scrollY, isHero]);

  // ── PER-FRAME FLOATING ────────────────────────────────────────────────────
  useFrame((state) => {
    clockRef.current += 0.016;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.85) * 0.13;
      if (action === "default" || action === "hero") {
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.38) * 0.016;
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>

      {/* ══ MAIN BODY — darker outer shell ══ */}
      <RoundedBox
        args={[CW, CH, CD]}
        radius={0.14}
        smoothness={16}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={COL_COVER_BODY}
          roughness={0.68}
          metalness={0.06}
        />
      </RoundedBox>

      {/* ══ FRONT FACE PANEL — brighter red ══ */}
      {/* Slightly smaller than the body so the darker edge peeks out */}
      <mesh position={[0, 0, CD / 2 + 0.001]} castShadow>
        <planeGeometry args={[CW - 0.14, CH - 0.14]} />
        <meshStandardMaterial
          color={COL_COVER_FACE}
          roughness={0.52}
          metalness={0.04}
        />
      </mesh>

      {/* ══ PAGE STACK — white pages behind cover ══ */}
      <PageMesh index={0} meshRef={pA} />
      <PageMesh index={1} meshRef={pB} />
      <PageMesh index={2} meshRef={pC} />
      <PageMesh index={3} meshRef={pD} />
      <PageMesh index={4} meshRef={pE} />

      {/* ══ RIGHT EDGE PAGE REVEAL — thin white strip visible at 3/4 angle ══ */}
      <mesh position={[CW / 2 - 0.018, 0, 0]}>
        <boxGeometry args={[0.038, CH - 0.32, CD * 0.72]} />
        <meshStandardMaterial color={COL_PAGE_EDGE} roughness={0.95} metalness={0} />
      </mesh>
      {/* Top edge page reveal */}
      <mesh position={[0, CH / 2 - 0.018, 0]}>
        <boxGeometry args={[CW - 0.32, 0.032, CD * 0.72]} />
        <meshStandardMaterial color={COL_PAGE_EDGE} roughness={0.95} metalness={0} />
      </mesh>

      {/* ══ RECESSED "N" LOGO ══ */}
      <RecessedN />

      {/* ══ FOLDED CORNER ══ */}
      <FoldedCorner />

      {/* ══ CAST SHADOW RECEIVER (floor plane) ══ */}
      <mesh
        position={[0.08, -CH / 2 - 0.008, -0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[CW * 2, CD * 3.5]} />
        <meshStandardMaterial transparent opacity={0.15} color="#000000" />
      </mesh>

    </group>
  );
}
