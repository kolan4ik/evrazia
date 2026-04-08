import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead, a4 as addAttribute } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { $ as $$RegularMenu } from './RegularMenu_DMoBXt3a.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { c as createServerApi } from './server_Ci6swuQU.mjs';

function EmailConfirmed(props) {
  const { confirmedEmail } = props;
  return /* @__PURE__ */ jsx("div", { className: "min-h-[420px] m-auto flex items-start justify-center text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "max-[800px]:max-w-[300px]", children: "Регистрация подтверждена" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-[10px]", children: [
      "Электронная почта подтверждена",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: confirmedEmail })
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        type: "submit",
        className: `action-btn`,
        href: PATHS.auth.dashboard.root,
        children: "Перейти в кабинет"
      }
    )
  ] }) });
}

const prerender = false;
const $$Confirmed = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Confirmed;
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: Astro2.request.headers.get("cookie") ?? ""
  });
  const profileResult = await serverApi.users.getProfile();
  if (profileResult.status === "ok") {
    return Astro2.redirect(PATHS.root);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} <div class="inner-content grid grid-cols-1 min-[1000px]:grid-cols-2 items-start justify-start gap-y-[60px]"> <div class="flex flex-col justify-start"> <h1>Регистрация</h1> <div class="max-w-[600px] mt-[10px]">Уже есть регистрация?</div> <a${addAttribute(PATHS.auth.login, "href")} class="text-link mt-[5px] self-start">
Войти в кабинет участника
</a> </div> <div> ${renderComponent($$result2, "EmailConfirmed", EmailConfirmed, { "confirmedEmail": "e.alexandrova@gmail.com" })} </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/confirmed.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/confirmed.astro";
const $$url = "/auth/confirmed/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Confirmed,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
