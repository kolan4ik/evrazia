import type { MiddlewareHandler } from "astro";
import { AUTH_TOKEN_KEY } from "@/lib/api/config";
import { PATHS } from "@/configs/paths";

const AUTH_PAGE_PREFIX = "/auth/";
const PROTECTED_PATHS = new Set(["/participant-form/"]);

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = normalizePath(context.url.pathname);

  const shouldHandleAuth = pathname.startsWith(AUTH_PAGE_PREFIX) || PROTECTED_PATHS.has(pathname);

  if (pathname.startsWith("/api/proxy/") || !shouldHandleAuth) {
    return next();
  }

  const hasAuthCookie = Boolean(context.cookies.get(AUTH_TOKEN_KEY)?.value);

  // if (pathname.startsWith(AUTH_PAGE_PREFIX) && hasAuthCookie) {
  //   return context.redirect(PATHS.root);
  // }

  // if (PROTECTED_PATHS.has(pathname) && !hasAuthCookie) {
  //   return context.redirect(PATHS.auth.register);
  // }

  return next();
};
