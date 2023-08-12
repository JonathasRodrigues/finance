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
      for (let i = 0; i <= totalInstallment; i++) {
        const pEx = { ...expense };
        pEx.dueDate = addMonths(expense.dueDate, i);
        pEx.currentInstallment = i + 1;

        const newExpense = await ctx.prisma.expense.create({
          data: {
            name: pEx.name,
            value: pEx.value,
            dueDate: pEx.dueDate,
            paymentMethodId: pEx.paymentMethodId,
            categoryId: pEx.categoryId,
            typeId: pEx.typeId,
            currentInstallment: pEx.currentInstallment ?? 0,
            totalInstallment: pEx.totalInstallment ?? 0,
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
        expenses.push(newExpense);
      }
      return expenses;
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
});
