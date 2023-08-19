import { expenseTypeSchema } from "~/schemas/expense-type";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const expenseTypeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(expenseTypeSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.expenseType.create({
        data: {
          id: input.name,
          name: input.name,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.expenseType.findMany();
  }),
});
