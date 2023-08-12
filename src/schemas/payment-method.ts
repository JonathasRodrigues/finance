"use client"

import * as z from "zod"

export const paymentMethodSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  bankAccountId: z.string({ required_error: 'Bank account is required'})
});

export type PaymentMethodType = z.infer<typeof paymentMethodSchema>;