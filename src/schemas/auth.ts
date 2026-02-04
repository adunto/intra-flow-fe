import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z.string(),
});

export const registerSchema = z.object({
  username: z.string(),
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z.string(),
  confirmPassword: z.string(),
});
