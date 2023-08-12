import { incomeSchema, listIncomeSchema } from "~/schemas/income";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const incomeRouter = createTRPCRouter({
  create: protectedProcedure.input(incomeSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.income.create({
      data: {
        name: input.name,
        value: input.value,
        payDay: input.payDay,
        bankAccountId: input.bankAccountId,
        userId: ctx.session.user.id,
      },
      include: {
        bankAccount: true,
      },
    });
  }),
  getAll: protectedProcedure.input(listIncomeSchema).query(({ ctx, input }) => {
    return ctx.prisma.income.findMany({
      where: {
        payDay: {
          gte: input?.startDate ?? undefined,
          lte: input?.endDate ?? undefined,
        },
      },
      include: {
        bankAccount: true,
      },
      orderBy: {
        payDay: "asc",
      },
    });
  }),
  getTotalValue: protectedProcedure
    .input(listIncomeSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.income.aggregate({
        _sum: {
          value: true,
        },
        where: {
          payDay: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
      });
    }),
});
