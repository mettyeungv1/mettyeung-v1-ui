import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  tags: string[];
  featured: boolean;
  slug: string;
}

export interface ProjectFilters {
  category: string;
  year: number | null;
  month: number | null;
  status: string;
  search: string;
}

interface ProjectStore {
  projects: Project[];
  filters: ProjectFilters;
  setProjects: (projects: Project[]) => void;
  setFilters: (filters: Partial<ProjectFilters>) => void;
  resetFilters: () => void;
  getFilteredProjects: () => Project[];
  getProjectCategories: () => Array<{ id: string; name: string; count: number }>;
  getAvailableYears: () => number[];
}

const initialFilters: ProjectFilters = {
  category: 'all',
  year: null,
  month: null,
  status: 'all',
  search: '',
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      filters: initialFilters,
      
      setProjects: (projects) => set({ projects }),
      
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      
      resetFilters: () => set({ filters: initialFilters }),
      
      getFilteredProjects: () => {
        const { projects, filters } = get();
        
        return projects.filter((project) => {
          // Category filter
          if (filters.category !== 'all' && project.category !== filters.category) {
            return false;
          }
          
          // Year filter
          if (filters.year) {
            const projectYear = new Date(project.startDate).getFullYear();
            if (projectYear !== filters.year) return false;
          }
          
          // Month filter
          if (filters.month) {
            const projectMonth = new Date(project.startDate).getMonth() + 1;
            if (projectMonth !== filters.month) return false;
          }
          
          // Status filter
          if (filters.status !== 'all' && project.status !== filters.status) {
            return false;
          }
          
          // Search filter
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            return (
              project.title.toLowerCase().includes(searchTerm) ||
              project.title_en.toLowerCase().includes(searchTerm) ||
              project.description.toLowerCase().includes(searchTerm) ||
              project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
          }
          
          return true;
        });
      },
      
      getProjectCategories: () => {
        const { projects } = get();
        const categoryMap = new Map();
        
        projects.forEach((project) => {
          const count = categoryMap.get(project.category) || 0;
          categoryMap.set(project.category, count + 1);
        });
        
        const categories = [
          { id: 'all', name: 'All Projects', count: projects.length },
        ];
        
        categoryMap.forEach((count, category) => {
          categories.push({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1),
            count,
          });
        });
        
        return categories;
      },
      
      getAvailableYears: () => {
        const { projects } = get();
        const years = new Set(
          projects.map((project) => new Date(project.startDate).getFullYear())
        );
        return Array.from(years).sort((a, b) => b - a);
      },
    }),
    {
      name: 'project-store',
      partialize: (state) => ({ filters: state.filters }),
    }
  )
);