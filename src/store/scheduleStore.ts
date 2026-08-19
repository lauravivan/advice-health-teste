import { create } from "zustand";
import { v7 as uuidv7 } from "uuid";
import type { Schedule } from "@/types/Schedule";
import { isSameDay } from "date-fns";
import { SCHEDULE_STATUS } from "@/constants/schedule";

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
  createSchedule: (
    newSchedule: Omit<Schedule, "id" | "transferred" | "status">,
  ) => void;
  getSchedulesByDate: (date: Date) => Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  getDailyTotalSchedules: () => number;
}

const useScheduleStore = create<ScheduleStoreState>((set, get) => ({
  schedules: [],
  createSchedule: (
    newSchedule: Omit<Schedule, "id" | "transferred" | "status">,
  ) =>
    set((state) => {
      const schedules = [...state.schedules];

      schedules.push({
        ...newSchedule,
        id: uuidv7(),
        status: SCHEDULE_STATUS[2],
        transferred: false
      });

      storeSchedules(schedules);

      return {
        ...state,
        schedules,
      };
    }),
  getSchedulesByDate: (date: Date) =>
    get().schedules.filter((s) => isSameDay(new Date(s.date), date)),
  setSchedules: (schedules: Schedule[]) =>
    set(() => ({
      schedules: schedules,
    })),
  getDailyTotalSchedules: () => {
    const date = new Date();
    const schedules = get().getSchedulesByDate(date);
    return schedules.length;
  },
}));

export default useScheduleStore;
