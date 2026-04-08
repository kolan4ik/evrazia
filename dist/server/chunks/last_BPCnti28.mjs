import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { C as maybeRenderHead, a4 as addAttribute, T as renderTemplate } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { A as AUTH_TOKEN_KEY, a as API_BASE_URL } from './config_B9oekYbR.mjs';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';
import { g as getAuthorizedProfile, $ as $$CabinetMenu, C as CabinetLeft } from './getAuthorizedProfile_DhOUSnsb.mjs';
import { c as createServerApi } from './server_Ci6swuQU.mjs';
import 'clsx';
import { g as getNominationHref } from './nominations_HFBSSkrC.mjs';

const $$NominationCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NominationCard;
  const { title, text, textFor, img } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="group style-card h-full relative flex flex-col items-center justify-between overflow-hidden bg-[#F5F5F5]/80 backdrop-blur-[2px] shadow-[0px_20px_40px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out hover:scale-105" data-astro-cid-diixrnvy> <div class="mt-[20px] relative z-10 flex flex-col items-center justify-between text-center" data-astro-cid-diixrnvy> <img${addAttribute(img, "src")}${addAttribute(title, "alt")} class="style-icon mx-auto transition-transform duration-500 ease-out group-hover:scale-110" loading="lazy" decoding="async" data-astro-cid-diixrnvy> <h3 class="style-title font-medium text-accent mt-[20px]" data-astro-cid-diixrnvy> ${title} </h3> <p class="style-text font-light" data-astro-cid-diixrnvy> ${text} </p> </div> ${textFor ? renderTemplate`<div class="style-text-for text-center mt-[10px]  font-medium " data-astro-cid-diixrnvy>${textFor}</div>` : null} </div>`;
}, "/Users/mac/Documents/Work/React/evrazia/src/components/shared/nomitationCard/NominationCard.astro", void 0);

const prerender = false;
const $$Last = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Last;
  const token = Astro2.cookies.get(AUTH_TOKEN_KEY)?.value;
  if (!token) {
    return Astro2.redirect(PATHS.auth.register);
  }
  const requestCookie = Astro2.request.headers.get("cookie") ?? "";
  const profileResult = await getAuthorizedProfile({
    origin: Astro2.url.origin,
    cookieHeader: requestCookie,
    token
  });
  if (profileResult.status === "error") {
    return Astro2.redirect(PATHS.auth.register);
  }
  const profile = profileResult.payload;
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: requestCookie
  });
  const nominationsResult = await serverApi.dictionaries.getNominationsList();
  const nominations = nominationsResult.status === "ok" ? nominationsResult.payload : [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "CabinetMenu", $$CabinetMenu, { "type": "lightBg", "profile": profile })} <div class="flex flex-col min-[1000px]:flex-row lg:pt-18 pt-4 -mb-20 gap-[50px]"> ${renderComponent($$result2, "CabinetLeft", CabinetLeft, { "profile": profile })} <div class="flex flex-col"> <h1 class="text-[50px] leading-[50px] max-[900px]:text-[36px] max-[900px]:leading-[36px] font-light uppercase font-nyght-serif text-accent">
Номинации
</h1> <div class="mt-[20px] mb-[42px] max-[900px]:mt-[10px] max-[900px]:mb-[20px] text-[18px] leading-[27px] font-regular max-[900px]:text-[14px] max-[900px]:leading-[21px] max-[900px]:max-w-[410px]">
Вы можете подать до 3х заявок: по одной в каждую номинцию
</div> <div class="grid grid-cols-2 gap-[10px] min-[900px]:grid-cols-3 min-[1200px]:gap-[40px] items-stretch"> ${nominations.map((item) => renderTemplate`<a${addAttribute(getNominationHref(item), "href")} class="block h-full cursor-pointer focus:outline-none"> ${renderComponent($$result2, "NominationCard", $$NominationCard, { "img": item.picture ? API_BASE_URL + item.picture : "", "title": item.name, "text": item.text || "", "textFor": item.label || "" })} </a>`)} </div> </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/last.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/last.astro";
const $$url = "/last/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Last,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
