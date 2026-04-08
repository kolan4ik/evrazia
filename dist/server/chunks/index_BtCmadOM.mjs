import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { $ as $$RegularMenu } from './RegularMenu_DMoBXt3a.mjs';

const TARGET_DATE = (/* @__PURE__ */ new Date("2026-04-07T19:00:00+03:00")).getTime();
function pad(n) {
  return String(n).padStart(2, "0");
}
function CountdownTimer() {
  const [diff, setDiff] = useState(() => Math.max(0, TARGET_DATE - Date.now()));
  useEffect(() => {
    if (diff <= 0) return;
    const id = setInterval(() => {
      const remaining = Math.max(0, TARGET_DATE - Date.now());
      setDiff(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1e3);
    return () => clearInterval(id);
  }, [diff > 0]);
  if (diff <= 0) {
    return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-6", children: /* @__PURE__ */ jsx("p", { className: "text-[50px] text-white-text", children: "Подача заявок открыта!" }) });
  }
  const totalSeconds = Math.floor(diff / 1e3);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl text-primary text-center font-nyght", children: "До возможности подать заявку" }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4 items-center", children: [
      { value: hours, label: "часов" },
      { value: minutes, label: "минут" },
      { value: seconds, label: "секунд" }
    ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[100px] font-semibold text-accent bg-white/5 rounded-xl py-2 px-3 min-w-[120px] text-center leading-none", children: pad(item.value) }),
      /* @__PURE__ */ jsx("span", { className: "text-lg text-primary opacity-60", children: item.label })
    ] }, i)) })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} ${renderComponent($$result2, "CountdownTimer", CountdownTimer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/shared/CountdownTimer", "client:component-export": "default" })} </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/index.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
