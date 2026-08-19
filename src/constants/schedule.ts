export const ScheduleStatus = {
  ATTENDED: 'ATTENDED',
  CANCELED: 'CANCELED',
  SCHEDULED: 'SCHEDULED',
} as const;

export type ScheduleStatusEnum =
  (typeof ScheduleStatus)[keyof typeof ScheduleStatus];

export const SchedulePaymentMethod = {
  PIX: 'PIX',
  'CREDIT-CARD': 'CREDIT-CARD',
  MONEY: 'MONEY',
} as const;

export type SchedulePaymentMethodEnum =
  (typeof SchedulePaymentMethod)[keyof typeof SchedulePaymentMethod];
