import { A as AUTH_TOKEN_KEY } from './chunks/config_B9oekYbR.mjs';
import { ah as sequence } from './chunks/sequence_BbkuQ6gj.mjs';

const AUTH_PAGE_PREFIX = "/auth/";
const PROTECTED_PATHS = /* @__PURE__ */ new Set(["/participant-form/"]);
function normalizePath(pathname) {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}
const onRequest$1 = async (context, next) => {
  const pathname = normalizePath(context.url.pathname);
  const shouldHandleAuth = pathname.startsWith(AUTH_PAGE_PREFIX) || PROTECTED_PATHS.has(pathname);
  if (pathname.startsWith("/api/proxy/") || !shouldHandleAuth) {
    return next();
  }
  Boolean(context.cookies.get(AUTH_TOKEN_KEY)?.value);
  return next();
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
