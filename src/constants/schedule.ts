export const SCHEDULE_STATUS = ["ATTENDED", "CANCELED", "SCHEDULED"] as const;

export type ScheduleStatus = (typeof SCHEDULE_STATUS)[number];
