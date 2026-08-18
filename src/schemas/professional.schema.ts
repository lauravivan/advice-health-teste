import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { z } from "zod";

export const consultationInfoSchema = z.object({
  price: z.string(),
});

export const professionalSchema = z.object({
  fullName: z.string().min(1, ERROR_MESSAGES.required),
  crm: z.string().min(1, ERROR_MESSAGES.required),
  specialty: z.string().min(1, ERROR_MESSAGES.required),
  // consultation_info: consultationInfoSchema.optional(),
  // payment_options: z.array(z.string()).optional(),
});

export type ProfessionalSchema = z.infer<typeof professionalSchema>;