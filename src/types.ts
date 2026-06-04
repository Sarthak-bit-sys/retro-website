export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  thumbnail: string; // custom visual illustration code or emoji
  difficulty: string; // design friction metrics
  tags: string[];
  problem: string;
  solution: string;
  metrics: string[];
  year: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface Hobby {
  id: string;
  name: string;
  iconName: string;
  badge: string;
  description: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}
