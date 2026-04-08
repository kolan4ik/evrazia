import { c as createComponent } from './astro-component_BDiEcpf7.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead } from './sequence_5BlAyHOu.mjs';
import { r as renderComponent } from './entrypoint_COL4YtEh.mjs';
import { A as AUTH_TOKEN_KEY } from './config_B9oekYbR.mjs';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { $ as $$Layout } from './Layout_wpoGtldb.mjs';
import { g as getAuthorizedProfile, $ as $$CabinetMenu, C as CabinetLeft } from './getAuthorizedProfile_BYUlOERe.mjs';
import { c as createServerApi } from './server_Ci6swuQU.mjs';

const prerender = false;
const $$Requests = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Requests;
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
  const requestsResult = await serverApi.requests.list();
  console.log("[requests page] requests.list result:", requestsResult);
  const requests = requestsResult.status === "ok" ? requestsResult.payload : [];
  const requestEntries = await Promise.all(
    requests.map(async (item) => {
      const requestId = item.id;
      if (requestId === void 0 || requestId === null || requestId === "") {
        console.log("[requests page] request without id:", item);
        return { listItem: item, details: null };
      }
      const detailsResult = await serverApi.requests.getById(requestId);
      console.log("[requests page] request details result:", {
        id: requestId,
        result: detailsResult
      });
      if (detailsResult.status === "error") {
        console.log("[requests page] request details error payload:", {
          id: requestId,
          code: detailsResult.payload.code,
          status: detailsResult.payload.status,
          message: detailsResult.payload.message,
          details: detailsResult.payload.details
        });
        console.log(
          "[requests page] request details error json:",
          JSON.stringify(detailsResult.payload.details, null, 2)
        );
      }
      return {
        listItem: item,
        details: detailsResult.status === "ok" ? detailsResult.payload : null
      };
    })
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "CabinetMenu", $$CabinetMenu, { "type": "lightBg", "profile": profile })} <div class="flex flex-col min-[1000px]:flex-row lg:pt-18 pt-4 -mb-20 gap-[50px]"> ${renderComponent($$result2, "CabinetLeft", CabinetLeft, { "profile": profile })} <div class="flex flex-col min-w-0 flex-1"> <h1 class="text-[50px] leading-[50px] max-[900px]:text-[36px] max-[900px]:leading-[36px] font-light uppercase font-nyght-serif text-accent">
Мои заявки
</h1> <div class="mt-[20px] flex flex-col gap-[16px] text-[14px] leading-[20px] max-[900px]:mt-[10px] max-[900px]:text-[13px] max-[900px]:leading-[19px]"> ${requestEntries.length > 0 ? requestEntries.map(({ listItem, details }) => renderTemplate`<div class="border-b border-[#dcdcdc] pb-[16px]"> <pre class="m-0 whitespace-pre-wrap break-words font-sans">${JSON.stringify(listItem, null, 2)}</pre> ${details ? renderTemplate`<pre class="mt-[10px] m-0 whitespace-pre-wrap break-words font-sans text-[13px] leading-[18px] text-[#666]">

												${JSON.stringify(details, null, 2)}
											</pre>` : null} </div>`) : renderTemplate`<div>Список заявок пуст</div>`} </div> </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/requests.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/requests.astro";
const $$url = "/requests";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Requests,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
