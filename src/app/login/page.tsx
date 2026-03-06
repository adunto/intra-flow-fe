import { Suspense } from "react";
import LoginForm from "@/components/feature/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Suspense fallback={<div>로딩중...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
