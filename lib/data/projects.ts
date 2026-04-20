export type ProjectSystem =
  | "architectural"
  | "structural"
  | "plumbing"
  | "electrical"
  | "hvac"
  | "site";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  status: string;
  size: string;
  constructionType: string;
  energyStrategy: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  gallery: string[];
  modelUrl?: string;
  availableSystems: ProjectSystem[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "ridge-house",
    title: "Ridge House",
    location: "Topanga, CA",
    category: "Residential",
    year: "2026",
    status: "In progress",
    size: "3,800 SF",
    constructionType: "New build",
    energyStrategy: "Passive-first envelope + high-efficiency HVAC",
    shortDescription: "A quiet hillside retreat tuned for light, wind, and view.",
    longDescription:
      "Ridge House is a hillside residence shaped around privacy, framed views, and soft daylight. The planning balances openness and shelter, with materials and detailing chosen to feel warm, quiet, and enduring.",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607688960-8b6c0b7b5f59?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=80",
    ],
    modelUrl: undefined,
    availableSystems: ["architectural", "structural", "hvac"],
    featured: true,
  },
  {
    slug: "courtyard-studio",
    title: "Courtyard Studio",
    location: "Portland, OR",
    category: "Guest House / Studio",
    year: "2025",
    status: "Completed",
    size: "1,250 SF",
    constructionType: "New build + landscape",
    energyStrategy: "Daylight-first strategy + simple systems",
    shortDescription: "An elegant garden studio with a breezy indoor-outdoor rhythm.",
    longDescription:
      "A compact residential studio organized around a private courtyard and layered outdoor rooms. The design emphasizes natural light, storage clarity, and a refined connection to the landscape.",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80&sat=-10",
    ],
    modelUrl: undefined,
    availableSystems: ["architectural", "electrical", "site"],
    featured: true,
  },
  {
    slug: "canyon-addition",
    title: "Canyon Addition",
    location: "Seattle, WA",
    category: "Renovation",
    year: "2024",
    status: "Completed",
    size: "980 SF addition",
    constructionType: "Renovation + structural retrofit",
    energyStrategy: "Targeted upgrades + improved thermal continuity",
    shortDescription: "A seamless addition with quiet luxury and strong flow to the outdoors.",
    longDescription:
      "A residential addition tuned to preserve the character of the existing home while expanding kitchen, living, and outdoor connections. The intervention keeps the architecture calm and coherent.",
    coverImage:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1560448075-bb1736c26f3e?auto=format&fit=crop&w=2400&q=80",
    ],
    modelUrl: "/media/sample-bim-model.glb",
    availableSystems: ["architectural", "structural", "plumbing"],
    featured: true,
  },
  {
    slug: "gallery-loft",
    title: "Gallery Loft",
    location: "Los Angeles, CA",
    category: "Primary Suite + Kitchen",
    year: "2024",
    status: "Completed",
    size: "2,100 SF",
    constructionType: "Interior fit-out",
    energyStrategy: "Efficient lighting + ventilation optimization",
    shortDescription: "A warm interior renovation centered on kitchen, bath, and bedroom comfort.",
    longDescription:
      "An interior renovation focused on soft materials, custom millwork, and a relaxed luxury atmosphere. The design balances the kitchen, primary bath, and bedroom details so the entire home feels more composed.",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80&sat=-20",
    ],
    modelUrl: undefined,
    availableSystems: ["architectural", "electrical", "hvac"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
