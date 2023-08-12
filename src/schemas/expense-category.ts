import { z } from "zod";

export const expenseCategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type ExpenseCategoryType = z.infer<typeof expenseCategorySchema>;





