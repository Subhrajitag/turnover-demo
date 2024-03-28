import { z } from "zod";
import argon2, { hash } from "argon2";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEmail } from "~/utils/nodemailer";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        email: z
          .string({ required_error: "Email is required" })
          .email("Invalid email "),
        otp: z
          .number({ required_error: "Otp is required" })
          .min(8, "Invalid  otp"),
      }),
    )
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await sendEmail(input.email, input.otp);
      return { success: true };
    }),

  confirmSignup: publicProcedure
    .input(
      z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z
          .string({ required_error: "Email is required" })
          .email("Invalid email"),
        password: z.string({ required_error: "Password is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { name, email, password } = input;

      const userExists = await ctx.db.user.findFirst({ where: { email } });

      if (userExists) {
        throw Error("User already exists.");
      }

      const hashedPassword = await hash(password);

      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return {
        status: 201,
        message: "Account created successfully",
        result: user,
      };
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string({ required_error: "Email is required" }).email(),
        password: z.string({ required_error: "Password is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { email, password } = input;
      const user = await ctx.db.user.findFirstOrThrow({ where: { email } });
      if (await argon2.verify(user.password, password)) {
        const { id, email, name } = user;
        const data = {
          user: {
            id,
            email,
            name,
          },
        };
        const jwtToken = jwt.sign(data, secret);
        return { jwtToken, success: true };
      }
      return { success: false };
    }),
  updateUserCategories: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        categoryIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(input);
      const { userId, categoryIds } = input;

      try {
        const user = await ctx.db.user.update({
          where: { id: userId },
          data: {
            categories: {
              set: categoryIds.map((id) => ({ id })),
            },
          },
          include: {
            categories: true,
          },
        });
        return user;
      } catch (e) {
        console.log(e);
      }
    }),

  getUserById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input },
        include: {
          categories: true,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),
});
