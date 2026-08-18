import type { Professional } from "@/types/Professional";
import { create } from "zustand";
import { v7 as uuidv7 } from "uuid";

interface CreateProfessional {
  name: string;
  crm: string;
  specialty: string;
}

interface ProfessionalStoreState {
  professionals: Professional[];
  createProfessional: (newProfessional: CreateProfessional) => void;
  getProfessionals: () => Professional[];
}

const useProfessionalStore = create<ProfessionalStoreState>((set, get) => ({
  professionals: [],
  createProfessional: (newProfessional: CreateProfessional) =>
    set((state) => {
      const professionals = [...state.professionals];

      professionals.push({
        ...newProfessional,
        id: uuidv7(),
      });

      return {
        ...state,
        professionals,
      };
    }),
  getProfessionals: () => get().professionals,
}));

export default useProfessionalStore;
