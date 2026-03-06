import { type NextRequest, NextResponse } from "next/server";

// 🔓 로그인이 필요 없는 경로들
const publicPaths = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // refresh_token 쿠키 확인
  const hasRefreshToken = request.cookies.has("refresh_token");

  const isPublicPath = publicPaths.some((path) => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // ------------------------------------------------------------
  // CASE A: 비로그인 사용자 -> 보호된 페이지 접근 시 -> 로그인으로 이동
  // ------------------------------------------------------------
  if (!hasRefreshToken && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname + search);

    return NextResponse.redirect(url);
  }

  // ------------------------------------------------------------
  // CASE B: 로그인 사용자 -> 로그인/회원가입 페이지 접근 시 -> 메인으로 이동
  // ------------------------------------------------------------
  if (hasRefreshToken && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ⚠️ 정적 파일(이미지, 폰트 등)과 API는 미들웨어를 타지 않도록 설정
export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 경로에 미들웨어 적용:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - 로고, 폰트 등 정적 파일 (svg, png, jpg, jpeg, gif, webp, css, js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
