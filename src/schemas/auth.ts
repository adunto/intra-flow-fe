import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z.string(),
});

export const signupSchema = z
  .object({
    username: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다."),
    email: z.email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
