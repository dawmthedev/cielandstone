import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Object3D, Vector3, Mesh } from "three";

export type DisciplineKey = "architectural" | "structural" | "plumbing" | "electrical" | "hvac" | "site";

export const disciplineColors: Record<DisciplineKey, string> = {
  architectural: "#d7d3c8",
  structural: "#a7a29a",
  plumbing: "#b9a1b5",
  electrical: "#c2b48b",
  hvac: "#9fb4c4",
  site: "#8ea88f",
};

export function filterByDiscipline(gltf: GLTF, active: Set<DisciplineKey>): Mesh[] {
  const result: Mesh[] = [];
  gltf.scene.traverse((child: Object3D) => {
    if (!(child instanceof Mesh)) return;
    const name = child.name.toLowerCase();
    const matched = (Array.from(active) as DisciplineKey[]).some((key) => name.includes(key));
    if (matched) result.push(child);
  });
  return result;
}

export function explodeByDiscipline(
  gltf: GLTF,
  active: Set<DisciplineKey>,
  factor = 1.2,
): Mesh[] {
  const exploded: Mesh[] = [];
  gltf.scene.traverse((child: Object3D) => {
    if (!(child instanceof Mesh)) return;
    const name = child.name.toLowerCase();
    const matched = (Array.from(active) as DisciplineKey[]).find((key) => name.includes(key));
    if (matched) {
      const offset = getDisciplineOffset(matched);
      child.position.add(offset.clone().multiplyScalar(factor));
    }
    exploded.push(child);
  });
  return exploded;
}

function getDisciplineOffset(key: DisciplineKey) {
  const map: Record<DisciplineKey, { x: number; y: number; z: number }> = {
    architectural: { x: 0, y: 0, z: 0 },
    structural: { x: 0.8, y: 0, z: 0.2 },
    plumbing: { x: -0.6, y: 0, z: 0.4 },
    electrical: { x: 0.5, y: 0, z: -0.3 },
    hvac: { x: -0.4, y: 0.2, z: 0.6 },
    site: { x: 0, y: -0.2, z: -0.5 },
  };
  return new Vector3(map[key].x, map[key].y, map[key].z);
}
