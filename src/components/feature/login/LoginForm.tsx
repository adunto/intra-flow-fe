"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TypographyH1, TypographySmall } from "@/components/ui/typography";
import { login } from "@/dal/auth";
import { loginSchema } from "@/schemas/auth";

type LoginFormType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema), // zod 스키마 검증
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onLoginSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType,
  ) => {
    try {
      await login(data);

      // 로그인 성공
      startTransition(() => {
        router.replace("/");
        router.refresh();
      });
    } catch (err) {
      // 실패
      console.error(err);
      // TODO: 사용자에게 에러 알림

      alert("로그인 실패");
    }
  };

  return (
    <Card className="min-w-100 min-h-110 flex justify-center">
      <TypographyH1 className="text-center">로그인</TypographyH1>
      <form onSubmit={handleSubmit(onLoginSubmit)} className="m-4 space-y-4">
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </Button>

        <div className="my-4 justify-self-center">
          <TypographySmall>계정이 없으신가요?</TypographySmall>
          <Button
            type="button"
            variant="link"
            onClick={() => router.push("/signup")}
          >
            회원가입
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
