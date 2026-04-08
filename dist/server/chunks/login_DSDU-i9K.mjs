import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead, a4 as addAttribute } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { $ as $$RegularMenu } from './RegularMenu_DMoBXt3a.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { a as api } from './index_BGfC7bBd.mjs';
import { g as getApiErrorMessage, c as createServerApi } from './server_Ci6swuQU.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const email = watch("email");
  const password = watch("password");
  const onSubmit = handleSubmit(async (values) => {
    if (isLoading) return;
    setSubmitError("");
    setIsLoading(true);
    try {
      const result = await api.auth.login({
        email: values.email.trim(),
        password: values.password
      });
      if (result.status === "error") {
        setSubmitError(getApiErrorMessage(result.payload, "Неверный email или пароль"));
        setIsLoading(false);
        return;
      }
      window.location.assign(PATHS.root);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Неверный email или пароль"));
      setIsLoading(false);
    }
  });
  const submitDisabled = isLoading || !email.trim() || !password.trim();
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: `form flex flex-col ${isLoading ? "loading" : ""}`,
      onSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "Электронная почта",
              disabled: isLoading,
              ...register("email", {
                required: "Введите корректный email",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Введите корректный email"
                }
              })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.email ? "" : "hidden"}`, children: errors.email?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              placeholder: "Пароль",
              disabled: isLoading,
              ...register("password", {
                required: "Неверный пароль",
                minLength: {
                  value: 6,
                  message: "Неверный пароль"
                }
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `error ${errors.password ? "" : "hidden"}`, children: errors.password?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-fit", children: [
          /* @__PURE__ */ jsx("div", { className: `absolute left-0 top-[8px] w-full text-center text-accent ${submitError ? "" : "invisible"}`, children: submitError || "Неверный email или пароль" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: ` action-btn ${isLoading ? "loading" : ""} ${submitDisabled && !isLoading ? "disabled" : ""}`,
              disabled: submitDisabled,
              children: "Войти"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: PATHS.auth.restore,
            className: "text-link mt-[16px] self-start",
            children: "Забыли пароль?"
          }
        )
      ]
    }
  );
}

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: Astro2.request.headers.get("cookie") ?? ""
  });
  const profileResult = await serverApi.users.getProfile();
  if (profileResult.status === "ok") {
    return Astro2.redirect(PATHS.root);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} <div class="inner-content grid grid-cols-1 min-[1000px]:grid-cols-2 items-start justify-start gap-y-[60px]"> <div class="flex flex-col justify-start"> <h1 class="max-w-[300px]">Вход в кабинет участника</h1> <div class="max-w-[600px] mt-[10px]">Еще нет аккаунта?</div> <a${addAttribute(PATHS.auth.register, "href")} class="text-link mt-[5px] self-start">
Зарегистрироваться
</a> </div> <div> ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/auth/loginForm/LoginForm", "client:component-export": "LoginForm" })} </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/login.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/login.astro";
const $$url = "/auth/login/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
