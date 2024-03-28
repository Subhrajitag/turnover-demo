import { faker } from '@faker-js/faker';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .mutation(async ({ ctx }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.category.create({
        data: {
          name: faker.commerce.product(),
        },
      });
    }),

  allCategories: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.category.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),
});
