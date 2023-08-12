"use client";
import * as z from "zod";

export const expenseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  value: z.union([z.string(), z.number()]).transform((x) => {
    if (typeof x === "number") return x;
    const n = x.replaceAll("R$", "").replaceAll(".", "").replaceAll(",", ".");
    return Number(n);
  }),
  dueDate: z.date({ required_error: "DueDate is required" }),
  paymentMethodId: z.string({ required_error: "Payment Method is required" }),
  typeId: z.string({ required_error: "Type is required" }),
  categoryId: z.string({ required_error: "Category is required" }),
  currentInstallment: z.number().nullable().default(0),
  totalInstallment: z.number().nullable().default(0),
});

export const listExpenseSchema = z.object({
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export type ExpenseType = z.infer<typeof expenseSchema>;
