export const ScheduleStatus = {
  ATTENDED: 'ATTENDED',
  CANCELED: 'CANCELED',
  SCHEDULED: 'SCHEDULED',
} as const;

export type ScheduleStatusEnum =
  (typeof ScheduleStatus)[keyof typeof ScheduleStatus];
