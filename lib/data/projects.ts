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
      "Ridge House explores restraint—long spans, soft thresholds, and a plan that compresses and releases. Visualization and BIM coordination keep the envelope crisp while preserving a calm, human scale.",
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=80",
    ],
    modelUrl: undefined,
    availableSystems: ["architectural", "structural", "hvac"],
    featured: true,
  },
  {
    slug: "courtyard-studio",
    title: "Courtyard Studio",
    location: "Portland, OR",
    category: "Work / Studio",
    year: "2025",
    status: "Completed",
    size: "1,250 SF",
    constructionType: "New build + landscape",
    energyStrategy: "Daylight-first strategy + simple systems",
    shortDescription: "An inner garden that makes work feel like breathing.",
    longDescription:
      "A compact studio organized around an open-air courtyard. Trades sequencing and prefabrication strategies shorten on-site time while maintaining a refined architectural finish.",
    coverImage:
      "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2400&q=80",
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
    shortDescription: "A precise addition that feels inevitable—never louder than the site.",
    longDescription:
      "A constrained renovation requiring careful structural logic and tight coordination. BIM-driven clarity reduced uncertainty and supported a disciplined build sequence.",
    coverImage:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2400&q=80",
    ],
    modelUrl: "/media/sample-bim-model.glb",
    availableSystems: ["architectural", "structural", "plumbing"],
    featured: true,
  },
  {
    slug: "gallery-loft",
    title: "Gallery Loft",
    location: "Los Angeles, CA",
    category: "Interior",
    year: "2024",
    status: "Completed",
    size: "2,100 SF",
    constructionType: "Interior fit-out",
    energyStrategy: "Efficient lighting + ventilation optimization",
    shortDescription: "A loft interior composed as a gallery for everyday life.",
    longDescription:
      "A minimal interior fit-out focused on proportion, material continuity, and concealed systems. Documentation emphasized constructability and crisp detailing.",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2400&q=80",
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
