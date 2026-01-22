export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface BrandConcept {
  tagline: string;
  manifesto: string;
  visualDirection: string;
  colorPalette: string[];
}
