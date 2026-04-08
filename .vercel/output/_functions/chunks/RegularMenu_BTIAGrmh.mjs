import { c as createComponent } from './astro-component_BDiEcpf7.mjs';
import 'piccolore';
import { L as renderTemplate, a2 as addAttribute, x as maybeRenderHead } from './sequence_5BlAyHOu.mjs';
import { r as renderComponent } from './entrypoint_COL4YtEh.mjs';
import { B as BurgerLight, a as Burger, $ as $$Logo, b as $$LogoDark } from './LogoDark_DEyfQt7Q.mjs';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { a as $$SocialIcons } from './Layout_wpoGtldb.mjs';
import 'clsx';

const TOP_MENU_LINKS = [
  { label: "Номинации", href: "/#nominations" },
  { label: "Этапы", href: "/#steps" },
  { label: "Документы", href: "#docs" },
  { label: "Подать заявку", href: PATHS.participantForm }
];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BurgerMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BurgerMenu;
  const { type } = Astro2.props;
  const isSticky = type === "sticky";
  const isLightBg = type === "lightBg";
  const panelId = `burger-menu-panel-${type ?? "default"}`;
  return renderTemplate(_a || (_a = __template(["", "<div", ' data-burger-menu data-astro-cid-zhximn7x> <button type="button" class="burger transition-colors duration-200" data-burger-trigger', "", ' aria-expanded="false" aria-label="Открыть меню" data-astro-cid-zhximn7x> <span class="burger__icon" aria-hidden="true" data-astro-cid-zhximn7x></span> </button> <div class="burger-menu__overlay" data-burger-overlay aria-hidden="true" data-astro-cid-zhximn7x></div> <aside', ' class="burger-menu__panel" data-burger-panel aria-hidden="true" data-astro-cid-zhximn7x> <div class="burger-menu__scroll" data-astro-cid-zhximn7x> <div class="burger-menu__top" data-astro-cid-zhximn7x> <a href="/" class="burger-menu__logo" data-astro-cid-zhximn7x> <img src="/images/burger-menu/logo.svg" alt="Евразия" data-astro-cid-zhximn7x> </a> <button type="button" class="burger-menu__close" data-burger-close aria-label="Закрыть меню" data-astro-cid-zhximn7x> <img src="/images/burger-menu/close.svg" alt="Закрыть" data-astro-cid-zhximn7x> </button> </div> <nav class="burger-menu__links" data-astro-cid-zhximn7x> ', ' </nav> <div class="burger-menu__contacts" data-astro-cid-zhximn7x> <div class="burger-menu__contacts-title" data-astro-cid-zhximn7x>Контактный центр</div> <a href="tel:88005051823" class="burger-menu__phone" data-astro-cid-zhximn7x>\n8 800 505-18-23\n</a> <a href="tel:+74958016200" class="burger-menu__phone" data-astro-cid-zhximn7x>\n+74958016200\n</a> <div class="burger-menu__schedule" data-astro-cid-zhximn7x>Пн–Пт, 10:00–19:00 (МСК)</div> </div> <div class="burger-menu__socials" data-astro-cid-zhximn7x> ', ` </div> <div class="burger-menu__emails" data-astro-cid-zhximn7x> <div class="burger-menu__email-block" data-astro-cid-zhximn7x> <div class="burger-menu__email-label" data-astro-cid-zhximn7x>Орг. комитет:</div> <a href="mailto:org@premiyaevrazia.su" class="burger-menu__email-link" data-astro-cid-zhximn7x>
org@premiyaevrazia.su
</a> </div> <div class="burger-menu__email-block" data-astro-cid-zhximn7x> <div class="burger-menu__email-label" data-astro-cid-zhximn7x>Тех. поддержка:</div> <a href="mailto:support@premiyaevrazia.su" class="burger-menu__email-link" data-astro-cid-zhximn7x>
support@premiyaevrazia.su
</a> </div> </div> </div> </aside> </div> <script>
	;(() => {
		const burgerMenus = document.querySelectorAll('[data-burger-menu]')

		burgerMenus.forEach(root => {
			if (root.dataset.initialized === 'true') {
				return
			}
			root.dataset.initialized = 'true'

			const trigger = root.querySelector('[data-burger-trigger]')
			const panel = root.querySelector('[data-burger-panel]')
			const overlay = root.querySelector('[data-burger-overlay]')
			const closeButton = root.querySelector('[data-burger-close]')
			const links = root.querySelectorAll('[data-burger-link]')

			if (!trigger || !panel || !overlay || !closeButton) {
				return
			}

			// Safari may clip fixed descendants when an ancestor has overflow hidden.
			// Move drawer layers to body so they always render above the full page.
			if (overlay.parentElement !== document.body) {
				document.body.appendChild(overlay)
			}
			if (panel.parentElement !== document.body) {
				document.body.appendChild(panel)
			}

			const setOpen = isOpen => {
				root.setAttribute('data-open', isOpen ? 'true' : 'false')
				trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
				panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true')
				panel.setAttribute('data-open', isOpen ? 'true' : 'false')
				overlay.setAttribute('data-open', isOpen ? 'true' : 'false')
				panel.toggleAttribute('inert', !isOpen)
				document.body.classList.toggle('burger-menu-body-lock', isOpen)
				window.dispatchEvent(new Event('burger-menu:toggle'))
			}

			const close = () => setOpen(false)
			const open = () => setOpen(true)

			trigger.addEventListener('click', () => {
				const isOpen = root.getAttribute('data-open') === 'true'
				if (isOpen) {
					close()
					return
				}
				open()
			})

			closeButton.addEventListener('click', close)
			overlay.addEventListener('click', close)

			links.forEach(link => {
				link.addEventListener('click', close)
			})

			document.addEventListener('keydown', event => {
				if (event.key === 'Escape' && root.getAttribute('data-open') === 'true') {
					close()
				}
			})
		})
	})()
<\/script>`])), maybeRenderHead(), addAttribute(`burger-menu ${isSticky ? "sticky" : ""} ${isLightBg ? "dark-mode" : ""}`, "class"), addAttribute(`--burger-icon: url('${isLightBg ? BurgerLight.src : Burger.src}')`, "style"), addAttribute(panelId, "aria-controls"), addAttribute(panelId, "id"), TOP_MENU_LINKS.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="burger-menu__link" data-burger-link data-astro-cid-zhximn7x> ${link.label} </a>`), renderComponent($$result, "SocialIcons", $$SocialIcons, { "data-astro-cid-zhximn7x": true }));
}, "/Users/mac/Documents/Work/React/evrazia/src/components/shared/topMenu/widgets/BurgerMenu.astro", void 0);

const $$LineMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LineMenu;
  const { type, links = TOP_MENU_LINKS } = Astro2.props;
  const isSticky = type === "sticky";
  const isLightBg = type === "lightBg";
  const darkText = isSticky || isLightBg;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`hidden min-[1350px]:flex flex-row justify-end items-center gap-[50px] font-medium ${darkText ? "" : "text-white-text"}`, "class")}> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-[14px] leading-[14px] text-link"> ${link.label} </a>`)} </div>`;
}, "/Users/mac/Documents/Work/React/evrazia/src/components/shared/topMenu/components/LineMenu.astro", void 0);

const $$UserInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$UserInfo;
  const { name, avatarUrl = null } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="ml-auto flex items-center gap-[12px]"> ${avatarUrl ? renderTemplate`<img${addAttribute(avatarUrl, "src")}${addAttribute(name, "alt")} class="h-[32px] w-[32px] rounded-full object-cover lg:h-[40px] lg:w-[40px]" loading="lazy">` : renderTemplate`<div class="h-[32px] w-[32px] rounded-full bg-black/8 lg:h-[40px] lg:w-[40px]"></div>`} <span class="max-w-[160px] truncate text-[10px] leading-[14px] font-medium text-[#c5985e] underline decoration-transparent underline-offset-[4px] transition-colors lg:text-[16px] lg:leading-[20px]"> ${name} </span> </div>`;
}, "/Users/mac/Documents/Work/React/evrazia/src/components/cabinet/UserInfo.astro", void 0);

const $$RegularMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$RegularMenu;
  const { type, links, userInfo = null } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="w-full min-h-[73px] z-40 relative flex flex-row items-start min-[767px]:items-center justify-between"> ${type !== "lightBg" ? renderTemplate`${renderComponent($$result, "Logo", $$Logo, {})}` : renderTemplate`${renderComponent($$result, "LogoDark", $$LogoDark, {})}`} <div class="flex flex-row justify-end items-stretch gap-[80px]"> <div class="hidden min-[1100px]:flex items-center"> ${renderComponent($$result, "LineMenu", $$LineMenu, { "type": type, "links": links })} </div> ${userInfo && renderTemplate`<div class="hidden min-[900px]:flex items-center"> ${renderComponent($$result, "UserInfo", $$UserInfo, { "name": userInfo.name, "avatarUrl": userInfo.avatarUrl })} </div>`} <div class="flex justify-end items-center mt-[10px] min-[767px]:mt-0"> ${renderComponent($$result, "BurgerMenu", $$BurgerMenu, { "type": type, "links": links })} </div> </div> </nav>`;
}, "/Users/mac/Documents/Work/React/evrazia/src/components/shared/topMenu/RegularMenu.astro", void 0);

export { $$RegularMenu as $ };
