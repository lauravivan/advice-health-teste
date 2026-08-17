import type { Professional } from "@/types/Professional";
import { create } from "zustand";
import professionals from "@/db/professionals.json";

const getProfessional = (id: string): Professional | undefined =>
  professionals.find((p) => p.id === id);

interface ProfessionalStoreState {
  professional: Professional | undefined;
  setProfessional: (id: string) => void;
}

const useProfessionalStore = create<ProfessionalStoreState>((set) => ({
  professional: undefined,
  setProfessional: (id: string) =>
    set(() => ({
      professional: getProfessional(id),
    })),
}));

export default useProfessionalStore;
