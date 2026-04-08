import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, a4 as addAttribute, C as maybeRenderHead } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { B as BurgerLight, a as Burger, $ as $$Logo, b as $$LogoDark } from './LogoDark_Dffe1i0B.mjs';
import { a as $$SocialIcons } from './Layout_DzAWaumG.mjs';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { A as AUTH_TOKEN_KEY } from './config_B9oekYbR.mjs';
import { d as createApiErrorResult, A as ApiClientError, c as createServerApi } from './server_Ci6swuQU.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BurgerMenuCabinet = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BurgerMenuCabinet;
  const { type } = Astro2.props;
  const navCabinet = [
    {
      label: "Мои заявки",
      href: PATHS.account.requests,
      count: ""
    },
    {
      label: "Мои задания",
      href: PATHS.account.tasks,
      count: ""
    },
    {
      label: "Уведомления",
      href: PATHS.account.notifications,
      count: "3"
    }
  ];
  const isSticky = type === "sticky";
  const isLightBg = type === "lightBg";
  const panelId = `burger-menu-panel-${type ?? "default"}`;
  return renderTemplate(_a || (_a = __template(["", "<div", ' data-burger-menu data-astro-cid-azr2i5je> <button type="button" class="burger transition-colors duration-200" data-burger-trigger', "", ' aria-expanded="false" aria-label="Открыть меню" data-astro-cid-azr2i5je> <span class="burger__icon" aria-hidden="true" data-astro-cid-azr2i5je></span> </button> <div class="burger-menu__overlay" data-burger-overlay aria-hidden="true" data-astro-cid-azr2i5je></div> <aside', ' class="burger-menu__panel " data-burger-panel aria-hidden="true" data-astro-cid-azr2i5je> <div class="burger-menu__scroll flex flex-col justify-between" data-astro-cid-azr2i5je> <div class="burger-menu__top" data-astro-cid-azr2i5je> <button type="button" class="burger-menu__close" data-burger-close aria-label="Закрыть меню" data-astro-cid-azr2i5je> <img src="/images/burger-menu/close.svg" alt="Закрыть" data-astro-cid-azr2i5je> </button> </div> <nav class="burger-menu__links" data-astro-cid-azr2i5je> ', ' </nav> <div class="burger-menu__contacts" data-astro-cid-azr2i5je> <div class="burger-menu__contacts-title" data-astro-cid-azr2i5je>Контактный центр</div> <a href="tel:88005051823" class="burger-menu__phone" data-astro-cid-azr2i5je>\n8 800 505-18-23\n</a> <a href="tel:+74958016200" class="burger-menu__phone" data-astro-cid-azr2i5je>\n+74958016200\n</a> <div class="burger-menu__schedule" data-astro-cid-azr2i5je>Пн–Пт, 10:00–19:00 (МСК)</div> </div> <div class="burger-menu__socials" data-astro-cid-azr2i5je> ', ` </div> <div class="burger-menu__emails" data-astro-cid-azr2i5je> <div class="burger-menu__email-block" data-astro-cid-azr2i5je> <div class="burger-menu__email-label" data-astro-cid-azr2i5je>Орг. комитет:</div> <a href="mailto:org@premiyaevrazia.su" class="burger-menu__email-link" data-astro-cid-azr2i5je>
org@premiyaevrazia.su
</a> </div> <div class="burger-menu__email-block" data-astro-cid-azr2i5je> <div class="burger-menu__email-label" data-astro-cid-azr2i5je>Тех. поддержка:</div> <a href="mailto:support@premiyaevrazia.su" class="burger-menu__email-link" data-astro-cid-azr2i5je>
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
<\/script>`])), maybeRenderHead(), addAttribute(`burger-menu ${isSticky ? "sticky" : ""} ${isLightBg ? "dark-mode" : ""}`, "class"), addAttribute(`--burger-icon: url('${isLightBg ? BurgerLight.src : Burger.src}')`, "style"), addAttribute(panelId, "aria-controls"), addAttribute(panelId, "id"), navCabinet.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="burger-menu__link flex gap-2" data-burger-link data-astro-cid-azr2i5je> ${link.label} ${link.count !== "" && renderTemplate`<span class="ml-1 text-xl text-white-text w-6 h-6 text-center flex items-center justify-center bg-accent rounded-full" data-astro-cid-azr2i5je> ${link.count} </span>`} </a>`), renderComponent($$result, "SocialIcons", $$SocialIcons, { "data-astro-cid-azr2i5je": true }));
}, "/Users/mac/Documents/Work/React/evrazia/src/components/shared/topMenu/widgets/BurgerMenuCabinet.astro", void 0);

const events$1 = [
  { href: "#", text: "Редактировать профиль" },
  { href: "#", text: "Изменить пароль" },
  { href: "#", text: "Выйти из аккаунта" }
];
function User(props) {
  const { profile } = props;
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  useEffect(() => {
    const handlePointerDownOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => document.removeEventListener("pointerdown", handlePointerDownOutside);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      className: "ml-auto relative",
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center text-accent! lg:text-base! text-[10px]! font-medium underline gap-3 cursor-pointer",
            onClick: () => setIsOpen((prev) => !prev),
            "aria-expanded": isOpen,
            "aria-haspopup": "menu",
            children: [
              /* @__PURE__ */ jsx("div", { className: "lg:w-10 w-8 lg:h-10 h-8 rounded-full overflow-hidden bg-[#D9D9D9]", children: profile.photo && profile.photo?.length > 10 ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: profile.photo,
                  alt: "avatar"
                }
              ) : null }),
              profile.name
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsxs("div", { className: "w-80 -top-4.5 lg:-right-2 -right-1 p-2.5 pt-5 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.2)] absolute rounded-xl bg-white", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              onClick: () => setIsOpen((prev) => false),
              className: "top-5 right-5 absolute cursor-pointer",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/close.svg",
                  alt: "close icon"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 text-left text-text-base px-2.5", children: [
            profile.photo && profile.photo?.length > 10 ? /* @__PURE__ */ jsx(
              "img",
              {
                src: profile.photo,
                className: "w-10 h-10 rounded-[75px] shrink object-cover",
                width: 150,
                height: 150,
                alt: "photo"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-[75px] shrink bg-[#D9D9D9]" }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-base mb-2 w-10", children: [
                profile.name,
                " ",
                profile.lastName
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-sm mb-1.5 underline", children: profile.email }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                "ID: ",
                profile.id
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 mt-6 pb-4.5 pt-7.5 p-2.5 border-t border-[#D2D6DF]", children: events$1.map((item) => /* @__PURE__ */ jsx(
            "a",
            {
              className: "text-base font-medium text-text-base hover:text-accent hover:underline",
              href: item.href,
              children: item.text
            },
            item.text
          )) })
        ] })
      ]
    }
  );
}

const $$CabinetMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CabinetMenu;
  const { type, profile } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const navCabinet = [
    {
      label: "Мои заявки",
      href: PATHS.account.requests,
      count: ""
    },
    {
      label: "Мои задания",
      href: PATHS.account.tasks,
      count: ""
    },
    {
      label: "Уведомления",
      href: PATHS.account.notifications,
      count: "3"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="w-full min-h-[73px] z-40 relative flex flex-row items-start min-[767px]:items-center justify-between"> ${type !== "lightBg" ? renderTemplate`${renderComponent($$result, "Logo", $$Logo, {})}` : renderTemplate`${renderComponent($$result, "LogoDark", $$LogoDark, {})}`} <div class="flex flex-row justify-end items-center lg:gap-25.5 gap-7.5 pt-1 lg:pt-0"> <div${addAttribute(`hidden lg:flex flex-row justify-end items-center gap-12.5 font-medium ${type !== "lightBg" ? "text-white-text" : ""}`, "class")}> ${navCabinet.map((link) => renderTemplate`<a${addAttribute([
    "text-sm gap-2 flex hover:no-underline! items-center hover:text-accent text-link",
    { "text-accent underline!": currentPath === link.href }
  ], "class:list")}${addAttribute(link.href, "href")}> <span>${link.label}</span> ${link.count !== "" && renderTemplate`<span class="ml-1 text-xs text-white-text bg-accent rounded-full px-1.5 py-0.5">${link.count}</span>`} </a>`)} </div> <div class="ml-auto relative"> ${renderComponent($$result, "User", User, { "client:load": true, "profile": profile, "client:component-hydration": "load", "client:component-path": "/Users/mac/Documents/Work/React/evrazia/src/components/shared/topMenu/components/User", "client:component-export": "default" })} </div> <div class="flex justify-end items-center md:hidden"> ${renderComponent($$result, "BurgerMenuCabinet", $$BurgerMenuCabinet, { "type": type })} </div> </div> </nav>`;
}, "/Users/mac/Documents/Work/React/evrazia/src/components/shared/topMenu/CabinetMenu.astro", void 0);

const events = [
  {
    href: "#",
    text: "Редактировать профиль"
  },
  {
    href: "#",
    text: "Изменить пароль"
  }
];
function CabinetLeft(props) {
  const { profile } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-col gap-[30px] max-[1000px]:flex-row max-[1000px]:items-start  shrink-0 text-text-base min-w-[240px]",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/user.svg",
            className: "rounded-[30px] mb-2 object-cover bg-[#D9D9D9] shrink-0 w-[150px] aspect-square max-[1000px]:w-[200px] max-[800px]:w-[150px]"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[22px] max-[1000px]:text-[16px] w-2 mb-2", children: [
            profile.name,
            " ",
            profile.lastName
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-lg underline  max-[1000px]:text-[14px]", children: profile.email }),
          /* @__PURE__ */ jsxs("div", { className: "text-lg  max-[1000px]:text-[14px]", children: [
            "ID: ",
            profile.id
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4.5 mt-9", children: events.map((item) => /* @__PURE__ */ jsx(
            "a",
            {
              className: "text-sm font-medium text-text-base hover:text-accent underline",
              href: item.href,
              children: item.text
            },
            item.text
          )) })
        ] })
      ]
    }
  );
}

async function getAuthorizedProfile({
  origin,
  cookieHeader,
  token
}) {
  if (!token) {
    return createApiErrorResult(new ApiClientError({
      message: `Missing ${AUTH_TOKEN_KEY}`,
      code: "UNAUTHORIZED"
    }));
  }
  const serverApi = createServerApi({
    origin,
    cookieHeader
  });
  return serverApi.users.getProfile();
}

export { $$CabinetMenu as $, CabinetLeft as C, getAuthorizedProfile as g };
