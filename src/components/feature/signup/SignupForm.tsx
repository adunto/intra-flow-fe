"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { signup } from "@/dal/auth";
import { signupSchema } from "@/schemas/auth";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Card } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";

type SignupFormType = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSignupSubmit: SubmitHandler<SignupFormType> = async (
    data: SignupFormType,
  ) => {
    try {
      const response = await signup(data);

      // 회원가입 성공 => 로그인 페이지로 이동
      startTransition(() => {
        router.replace("/login");
        router.refresh();
      });
    } catch (err) {
      // 실패
      console.error(err);
      // TODO: 사용자에게 에러 알림
      alert("회원가입 실패");
    }
  };

  return (
    <Card className="min-w-100">
      <TypographyH1>회원가입</TypographyH1>
      <form onSubmit={handleSubmit(onSignupSubmit)} className="m-4 space-y-4">
        {/* Username 필드 */}
        <div className="flex flex-col gap-1">
          <InputGroup>
            <InputGroupInput placeholder="Username" {...register("username")} />
            <InputGroupAddon>
              <User size={18} />
            </InputGroupAddon>
          </InputGroup>
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Email 필드 */}
        <div className="flex flex-col gap-1">
          <InputGroup>
            <InputGroupInput placeholder="Email" {...register("email")} />
            <InputGroupAddon>
              <Mail size={18} />
            </InputGroupAddon>
          </InputGroup>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password 필드 */}
        <div className="flex flex-col gap-1">
          <InputGroup>
            <InputGroupInput
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <InputGroupAddon>
              <Lock size={18} />
            </InputGroupAddon>
          </InputGroup>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password 필드 */}
        <div className="flex flex-col gap-1">
          <InputGroup>
            <InputGroupInput
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <InputGroupAddon>
              <Lock size={18} />
            </InputGroupAddon>
          </InputGroup>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              가입 중...
            </>
          ) : (
            "회원가입"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default SignupForm;
