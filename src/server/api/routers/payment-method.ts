import { paymentMethodSchema } from "~/schemas/payment-method";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const paymentMethodRouter = createTRPCRouter({
  create: protectedProcedure.input(paymentMethodSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.paymentMethod.create({ 
      data: {
        name: input.name,
        bankAccountId: input.bankAccountId
      },
      include: {
        bankAccount: true
      }
    })
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.paymentMethod.findMany({ include: {
      bankAccount: true
    }});
  })
});
