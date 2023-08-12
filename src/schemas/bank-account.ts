"use client";

import * as z from "zod";

export const bankAccountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  balance: z.union([z.string(), z.number()]).transform((x) => {
    if (typeof x === "number") return x;
    const n = x.replaceAll("R$", "").replaceAll(".", "").replaceAll(",", ".");
    return Number(n);
  }),
});

export type BankAccountType = z.infer<typeof bankAccountSchema>;
