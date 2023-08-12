import { bankAccountSchema } from "~/schemas/bank-account";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const bankAccountRouter = createTRPCRouter({
  create: protectedProcedure.input(bankAccountSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.bankAccount.create({ 
      data: {
        name: input.name,
        balance: input.balance,
        userId: ctx.session.user.id
      }
    })
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bankAccount.findMany({ 
      where: {
        userId: ctx.session.user.id
      }
    });
  })
});
