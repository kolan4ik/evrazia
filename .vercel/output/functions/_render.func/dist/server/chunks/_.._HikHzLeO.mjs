import { A as AUTH_TOKEN_KEY, U as UPSTREAM_SESSION_KEY, a as API_BASE_URL, b as API_PREFIX } from './config_B9oekYbR.mjs';

const prerender = false;
function buildUpstreamUrl(requestUrl, path) {
  const upstreamUrl = new URL(`${API_BASE_URL}${API_PREFIX}/${path ?? ""}`);
  for (const [key, value] of requestUrl.searchParams.entries()) {
    upstreamUrl.searchParams.append(key, value);
  }
  return upstreamUrl.toString();
}
function copyResponseHeaders(headers) {
  const responseHeaders = new Headers();
  for (const [key, value] of headers.entries()) {
    if (key.toLowerCase() === "content-encoding") continue;
    if (key.toLowerCase() === "content-length") continue;
    if (key.toLowerCase() === "set-cookie") continue;
    responseHeaders.set(key, value);
  }
  return responseHeaders;
}
function extractPhpSessionId(headers) {
  const setCookieEntries = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : headers.get("set-cookie") ? [headers.get("set-cookie")] : [];
  for (const entry of setCookieEntries) {
    const match = entry.match(/(?:^|;\s*)PHPSESSID=([^;]+)/i);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}
async function proxyRequest(context) {
  const requestUrl = new URL(context.request.url);
  const upstreamUrl = buildUpstreamUrl(requestUrl, context.params.path);
  const headers = new Headers();
  const authToken = context.cookies.get(AUTH_TOKEN_KEY)?.value;
  const upstreamSessionId = context.cookies.get(UPSTREAM_SESSION_KEY)?.value;
  for (const [key, value] of context.request.headers.entries()) {
    const lowerKey = key.toLowerCase();
    if (lowerKey === "host") continue;
    if (lowerKey === "content-length") continue;
    if (lowerKey === "cookie") continue;
    if (lowerKey === "authorization") continue;
    headers.set(key, value);
  }
  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }
  if (upstreamSessionId) {
    headers.set("Cookie", `PHPSESSID=${upstreamSessionId}`);
  }
  const init = {
    method: context.request.method,
    headers
  };
  if (context.request.method !== "GET" && context.request.method !== "HEAD") {
    init.body = await context.request.arrayBuffer();
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const upstreamResponse = await fetch(upstreamUrl, init);
  const bodyText = await upstreamResponse.text();
  const responseHeaders = copyResponseHeaders(upstreamResponse.headers);
  const phpSessionId = extractPhpSessionId(upstreamResponse.headers);
  if (phpSessionId) {
    context.cookies.set(UPSTREAM_SESSION_KEY, phpSessionId, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: requestUrl.protocol === "https:",
      maxAge: 60 * 60 * 24 * 30
    });
  }
  if (context.params.path === "users/authentification/login" && upstreamResponse.ok && bodyText) {
    try {
      const payload = JSON.parse(bodyText);
      const token = payload.data?.authToken;
      if (token) {
        context.cookies.set(AUTH_TOKEN_KEY, token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: requestUrl.protocol === "https:",
          maxAge: 60 * 60 * 24 * 30
        });
      }
    } catch {
    }
  }
  if (context.params.path === "users/authentification/logout" || upstreamResponse.status === 401 || upstreamResponse.status === 403) {
    context.cookies.delete(AUTH_TOKEN_KEY, {
      path: "/"
    });
    context.cookies.delete(UPSTREAM_SESSION_KEY, {
      path: "/"
    });
  }
  return new Response(bodyText, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders
  });
}
const handleProxy = async (context) => {
  try {
    return await proxyRequest(context);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Proxy request failed";
    return Response.json(
      {
        success: false,
        data: null,
        errors: [
          {
            message,
            code: "PROXY_ERROR"
          }
        ]
      },
      { status: 502 }
    );
  }
};
const GET = handleProxy;
const POST = handleProxy;
const PATCH = handleProxy;
const PUT = handleProxy;
const DELETE = handleProxy;
const OPTIONS = handleProxy;
const HEAD = handleProxy;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	HEAD,
	OPTIONS,
	PATCH,
	POST,
	PUT,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
