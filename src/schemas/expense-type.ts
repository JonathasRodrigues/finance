"use client"

import * as z from "zod"

export const expenseTypeSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type ExpenseType = z.infer<typeof expenseTypeSchema>;