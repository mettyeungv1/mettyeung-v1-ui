// Common types used throughout the application

export interface Post {
  id: number;
  title: string;
  title_en: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured: boolean;
  views: number;
}

export interface Video {
  id: number;
  title: string;
  title_en: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  date: string;
  thumbnail: string;
  videoId: string;
  featured: boolean;
}

export interface Project {
  id: string;
  title: string;
  title_en: string;
  description: string;
  longDescription: string;
  category: string;
  status: 'ongoing' | 'completed';
  startDate: string;
  endDate?: string;
  location: string;
  beneficiaries: number;
  volunteers: number;
  images: string[];
  featured: boolean;
  slug: string;
  tags: string[];
  budget?: number;
  budgetUsed?: number;
  duration?: string;
  objectives?: string[];
  achievements?: string[];
  team?: Array<{
    name: string;
    image: string;
    role: string;
  }>;
  testimonials?: Array<{
    text: string;
    author: string;
    role: string;
    image: string;
  }>;
  impact?: Record<string, number>;
  milestones?: Array<{
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }>;
}

export interface GalleryItem {
  id: number;
  title: string;
  title_en: string;
  category: string;
  date: string;
  image: string;
  thumbnail: string;
  description: string;
  views: number;
}

export interface TeamMember {
  name: string;
  name_en: string;
  position: string;
  position_en: string;
  bio: string;
  email: string;
  phone: string;
  image: string;
}

export interface OrganizationSection {
  id: string;
  title: string;
  title_en: string;
  icon: any;
  color: string;
  description: string;
  members: TeamMember[];
}

export interface Category {
  id: string;
  name: string;
  name_en: string;
  count?: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  message: string;
}