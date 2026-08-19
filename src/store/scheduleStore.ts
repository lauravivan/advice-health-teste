import { create } from 'zustand';
import { v7 as uuidv7 } from 'uuid';
import type { Schedule } from '@/types/Schedule';
import { ScheduleStatus } from '@/constants/schedule';

const LS_KEY = 'advice-health-schedules';

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
    newSchedule: Omit<Schedule, 'id' | 'transferred' | 'status'>
  ) => void;
  setSchedules: (schedules: Schedule[]) => void;
  updateSchedule: (id: string, schedule: Schedule) => void;
  patchSchedule: (id: string, schedule: Partial<Schedule>) => void;
}

const useScheduleStore = create<ScheduleStoreState>((set) => ({
  schedules: [],
  createSchedule: (
    newSchedule: Omit<Schedule, 'id' | 'transferred' | 'status'>
  ) =>
    set((state) => {
      const schedules = [...state.schedules];

      schedules.push({
        ...newSchedule,
        id: uuidv7(),
        status: ScheduleStatus.SCHEDULED,
        transferred: false,
      });

      storeSchedules(schedules);

      return {
        ...state,
        schedules,
      };
    }),
  setSchedules: (schedules: Schedule[]) =>
    set(() => ({
      schedules: schedules,
    })),
  updateSchedule: (id: string, schedule: Schedule) => {
    set((state) => {
      const schs = state.schedules.map((s) => (s.id === id ? schedule : s));

      storeSchedules(schs);

      return {
        ...state,
        schedules: schs,
      };
    });
  },
  patchSchedule: (id: string, schedule: Partial<Schedule>) => {
    set((state) => {
      const schs = state.schedules.map((s) =>
        s.id === id
          ? {
              ...s,
              ...schedule,
            }
          : s
      );

      storeSchedules(schs);

      return {
        ...state,
        schedules: schs,
      };
    });
  },
}));

export default useScheduleStore;
