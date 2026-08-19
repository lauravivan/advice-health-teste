import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { z } from 'zod';

export const scheduleSchema = z.object({
  professional: z.string().min(1, 'Selecione um profissional'),

  date: z.string().min(1, ERROR_MESSAGES.required),

  price: z.string(),

  patient: z.object({
    fullName: z.string().min(1, ERROR_MESSAGES.required),
    cpf: z.string().min(1, ERROR_MESSAGES.required),
    birthDate: z.string().min(1, 'Informe a data de nascimento do(a) paciente'),
    address: z.object({
      street: z.string().min(1, ERROR_MESSAGES.required),
      number: z
        .string()
        .min(1, ERROR_MESSAGES.required)
        .refine((value) => parseInt(value) >= 0, {
          message: 'O número deve ser maior ou igual a 0',
        }),
      cep: z.string().min(1, ERROR_MESSAGES.required),
      additionalInfo: z.string().nullable(),
      neighborhood: z.string().min(1, ERROR_MESSAGES.required),
      city: z.string().min(1, ERROR_MESSAGES.required),
    }),

    additionalInfo: z.string(),
  }),

  paymentInfo: z.object({
    method: z.enum(['PIX', 'CREDIT-CARD', 'MONEY'], {
      message: 'Selecione uma forma de pagamento',
    }),
    installments: z.string().optional(),
  }),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;

export const patchScheduleSchema = scheduleSchema.partial();

export type PatchScheduleSchema = z.infer<typeof patchScheduleSchema>;
