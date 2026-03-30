import { z } from "zod";
import { USER_SCHEMA } from "./constants";

const baseSchema = z.object({
  displayName: z
    .string()
    .min(USER_SCHEMA.MIN_DISPLAY_NAME, `Display name must be at least ${USER_SCHEMA.MIN_DISPLAY_NAME} characters`)
    .max(USER_SCHEMA.MAX_DISPLAY_NAME, `Display name be at most ${USER_SCHEMA.MAX_DISPLAY_NAME} characters`)
});

export const userProfileSchema = baseSchema.pick({ displayName: true });

export type UserProfileFormSchema = z.infer<typeof userProfileSchema>;
