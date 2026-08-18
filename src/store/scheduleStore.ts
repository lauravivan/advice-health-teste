import { create } from "zustand";
import { v7 as uuidv7 } from "uuid";
import type { Schedule } from "@/types/Schedule";
import { isSameDay } from "date-fns";
import { getSafeDate } from "@/helpers/date";

const LS_KEY = "advice-health-schedules";

export function getStoredSchedules(): Schedule[] {
  const schedules = localStorage.getItem(LS_KEY);
  return schedules ? (JSON.parse(schedules) as Schedule[]) : [];
}

export function storeSchedules(schedules: Schedule[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(schedules));
}

interface ScheduleStoreState {
  schedules: Schedule[];
  createSchedule: (newSchedule: Omit<Schedule, "id">) => void;
  getSchedulesByDate: (date: Date) => Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
}

const useScheduleStore = create<ScheduleStoreState>((set, get) => ({
  schedules: [],
  createSchedule: (newSchedule: Omit<Schedule, "id">) =>
    set((state) => {
      const schedules = [...state.schedules];

      schedules.push({
        ...newSchedule,
        id: uuidv7(),
      });

      storeSchedules(schedules);

      return {
        ...state,
        schedules,
      };
    }),
  getSchedulesByDate: (date: Date) => {
    return get().schedules.filter((s) => isSameDay(new Date(s.date), date));
  },
  setSchedules: (schedules: Schedule[]) =>
    set(() => ({
      schedules: schedules,
    })),
}));

export default useScheduleStore;
