import { createTRPCRouter } from "~/server/api/trpc";
import { bankAccountRouter } from "./routers/bank-account";
import { expenseTypeRouter } from "./routers/expense-type";
import { expenseCategoryRouter } from "./routers/expense-category";
import { incomeRouter } from "./routers/income";
import { paymentMethodRouter } from "./routers/payment-method";
import { expenseRouter } from "./routers/expense";

export const appRouter = createTRPCRouter({
  bankAccount: bankAccountRouter,
  expense: expenseRouter,
  expenseCategory: expenseCategoryRouter,
  expenseType: expenseTypeRouter,
  income: incomeRouter,
  paymentMethod: paymentMethodRouter,
});

export type AppRouter = typeof appRouter;
