import { z } from "zod";

const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const zodSignupValidation = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(2).max(50),
  email: z
    .string()
    .regex(strictEmailRegex, { message: "Invalid email format" }),
  password: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
      {
        message:
          "Password must be atleast 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one number",
      }
    ),
});

export const zodSigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
      {
        message:
          "Password must be atleast 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one number",
      }
    ),
});

export const zodPasswordValidation = z.object({
  oldPassword: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
      {
        message:
          "Password must be atleast 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one number",
      }
    ),
  newPassword: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
      {
        message:
          "Password must be atleast 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one number",
      }
    ),
  confirmNewPassword: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
      {
        message:
          "Password must be atleast 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one number",
      }
    ),
});
