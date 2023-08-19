import { expenseCategorySchema } from "~/schemas/expense-category";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const expenseCategoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(expenseCategorySchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.expenseCategory.create({
        data: {
          id: input.name,
          name: input.name,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.expenseCategory.findMany();
  }),
});
