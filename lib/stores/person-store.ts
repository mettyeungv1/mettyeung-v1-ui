import { create } from 'zustand';

export interface Person {
  id: string;
  name: string;
  name_en: string;
  position: string;
  position_en: string;
  department: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  image: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  achievements: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
}

interface PersonStore {
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}

export const usePersonStore = create<PersonStore>((set) => ({
  selectedPerson: null,
  setSelectedPerson: (person) => set({ selectedPerson: person }),
}));