import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { $ as $$RegularMenu } from './RegularMenu_DMoBXt3a.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} <div class="inner-content flex flex-col"> <h1>Страница<br>не найдена</h1> <div class="max-w-[600px] mt-[10px]">
Запрашиваемая страница не существует или была перемещена.<br> Проверьте адрес или перейдите на главную страницу.
</div> <a href="/" class="action-btn">На главную</a> <button type="button" class="text-link mt-[20px] self-start" onclick="if (window.history.length > 1) { window.history.back(); } else { window.location.href = '/'; }">
Вернуться назад
</button> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/404.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/404.astro";
const $$url = "/404/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
