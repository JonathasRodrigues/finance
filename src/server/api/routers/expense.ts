import { addMonths } from "date-fns";
import { expenseSchema, listExpenseSchema } from "~/schemas/expense";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure.input(expenseSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.expense.create({
      data: {
        name: input.name,
        value: input.value,
        dueDate: input.dueDate,
        paymentMethodId: input.paymentMethodId,
        categoryId: input.categoryId,
        typeId: input.typeId,
        currentInstallment: input.currentInstallment ?? 0,
        totalInstallment: input.totalInstallment ?? 0,
        userId: ctx.session.user.id,
      },
      include: {
        paymentMethod: {
          include: {
            bankAccount: true,
          },
        },
        category: true,
        type: true,
      },
    });
  }),
  createInstallment: protectedProcedure
    .input(expenseSchema)
    .mutation(async ({ ctx, input }) => {
      const expense = input;
      const totalInstallment = expense?.totalInstallment ?? 0;
      const expenses = [];
      for (let i = 0; i < totalInstallment; i++) {
        const pEx = { ...expense, ...{ userId: ctx.session.user.id } };
        pEx.dueDate = addMonths(expense.dueDate, i);
        pEx.currentInstallment = i + 1;
        expenses.push(pEx);
      }
      return await ctx.prisma.expense.createMany({ data: expenses });
    }),
  getAll: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.findMany({
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
        include: {
          paymentMethod: {
            include: {
              bankAccount: true,
            },
          },
          category: true,
          type: true,
        },
        orderBy: {
          dueDate: "asc",
        },
      });
    }),

  getTotalValue: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.aggregate({
        _sum: {
          value: true,
        },
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
      });
    }),

  getTotalInstallmentValue: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.aggregate({
        _sum: {
          value: true,
        },
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
          totalInstallment: {
            gt: 0,
          },
        },
      });
    }),

  getLast10: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.findMany({
        take: 10,
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
        orderBy: {
          dueDate: "desc",
        },
      });
    }),

  getTotalByType: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.groupBy({
        by: ["typeId"],
        _sum: { value: true },
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
      });
    }),

  getTotalByCategory: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.groupBy({
        by: ["categoryId"],
        _sum: { value: true },
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
      });
    }),
  getTotalByPaymentMethod: protectedProcedure
    .input(listExpenseSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.expense.groupBy({
        by: ["paymentMethodId"],
        _sum: { value: true },
        where: {
          dueDate: {
            gte: input?.startDate ?? undefined,
            lte: input?.endDate ?? undefined,
          },
        },
      });
    }),
});
