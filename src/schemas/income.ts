"use client";
import * as z from "zod";

export const incomeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  value: z.union([z.string(), z.number()]).transform((x) => {
    if (typeof x === "number") return x;
    const n = x.replaceAll("R$", "").replaceAll(".", "").replaceAll(",", ".");
    return Number(n);
  }),
  payDay: z.date({ required_error: "Payday is required" }),
  bankAccountId: z.string({ required_error: "Bank account is required" }),
});

export const listIncomeSchema = z.object({
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export type IncomeType = z.infer<typeof incomeSchema>;
