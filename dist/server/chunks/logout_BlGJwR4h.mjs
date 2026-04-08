import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import './sequence_BbkuQ6gj.mjs';
import 'clsx';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { c as createServerApi } from './server_Ci6swuQU.mjs';

const prerender = false;
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: Astro2.request.headers.get("cookie") ?? ""
  });
  await serverApi.auth.logout();
  return Astro2.redirect(PATHS.auth.register);
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/logout.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/logout.astro";
const $$url = "/auth/logout/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
