import { z } from "zod";
import { AUTH_SCHEMA } from "../constants";
import { userProfileSchema } from "@/features/user/schema";

export const baseSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(AUTH_SCHEMA.MIN_PASSWORD, `Password must be at least ${AUTH_SCHEMA.MIN_PASSWORD} characters`)
    .max(AUTH_SCHEMA.MAX_PASSWORD, `Password must be at most ${AUTH_SCHEMA.MAX_PASSWORD} characters`)
});

export const loginSchema = baseSchema;

export const emailSchema = baseSchema.pick({ email: true });

export const verifyEmailSchema = z
  .object({
    displayName: userProfileSchema.shape.displayName,
    password: baseSchema.shape.password,
    confirmPassword: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Confirm password must match"
      });
    }
  });

export const changePasswordSchema = z
  .object({
    currentPassword: baseSchema.shape.password,
    newPassword: baseSchema.shape.password,
    confirmNewPassword: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmNewPassword"],
        message: "Confirm new password must match"
      });
    }
  });

export const resetPasswordSchema = z
  .object({
    password: baseSchema.shape.password,
    confirmPassword: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Confirm password must match"
      });
    }
  });

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type EmailFormSchema = z.infer<typeof emailSchema>;
export type VerifyEmailFormSchema = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormSchema = z.infer<typeof changePasswordSchema>;
