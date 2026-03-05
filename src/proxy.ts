import { type NextRequest, NextResponse } from "next/server";

// 🔓 로그인이 필요 없는 경로들
const publicPaths = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // refresh_token 쿠키 확인
  const hasRefreshToken = request.cookies.has("refresh_token");

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // ------------------------------------------------------------
  // CASE A: 비로그인 사용자(쿠키 없음)가 보호된 페이지에 접근할 때
  // ------------------------------------------------------------
  if (!hasRefreshToken && !isPublicPath) {
    // 로그인 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // 로그인 후 원래 가려던 페이지로 돌아가기 위해 쿼리 파라미터 추가
    url.searchParams.set("callbackUrl", pathname + search);

    return NextResponse.redirect(url);
  }

  // ------------------------------------------------------------
  // CASE B: 이미 로그인한 사용자(쿠키 있음)가 로그인/회원가입 페이지에 접근할 때
  // ------------------------------------------------------------
  if (hasRefreshToken && isPublicPath) {
    // 메인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 아무 문제 없으면 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};