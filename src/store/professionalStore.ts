import type { Professional } from "@/types/Professional";
import { create } from "zustand";
import { v7 as uuidv7 } from "uuid";

const LS_KEY = "advice-health-pros";

export function getStoredPros(): Professional[] {
  const pros = localStorage.getItem(LS_KEY);
  return pros ? (JSON.parse(pros) as Professional[]) : [];
}

export function storeProfessionals(pros: Professional[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(pros));
}

interface ProfessionalStoreState {
  professionals: Professional[];
  createProfessional: (newProfessional: Omit<Professional, "id">) => void;
  getPaginatedProfessionals: () => Professional[];
  page: number;
  perPage: number;
  setProfessionals: (pros: Professional[]) => void;
  getProfessional: (id: string) => Professional | undefined;
}

const useProfessionalStore = create<ProfessionalStoreState>((set, get) => ({
  professionals: [],
  page: 1,
  perPage: 10,
  getPaginatedProfessionals: () => {
    const { professionals, page, perPage } = get();

    const start = (page - 1) * perPage;

    return professionals.slice(start, start + perPage);
  },
  createProfessional: (newProfessional: Omit<Professional, "id">) =>
    set((state) => {
      const professionals = [...state.professionals];

      professionals.push({
        ...newProfessional,
        id: uuidv7(),
      });

      storeProfessionals(professionals);

      return {
        ...state,
        professionals,
      };
    }),
  setProfessionals: (pros: Professional[]) =>
    set(() => ({
      professionals: pros,
    })),
  getProfessional: (id: string) => get().professionals.find((p) => p.id === id),
}));

export default useProfessionalStore;
