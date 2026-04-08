import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { $ as $$RegularMenu } from './RegularMenu_DMoBXt3a.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { c as createServerApi } from './server_Ci6swuQU.mjs';

function SuccessMessage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-[420px] m-auto flex items-start justify-center text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "max-[800px]:max-w-[300px]", children: "Пароль успешно изменён" }),
    /* @__PURE__ */ jsx("div", { className: "mt-[10px] max-w-[430px]", children: "Вы можете войти в личный кабинет, используя новый пароль." }),
    /* @__PURE__ */ jsx(
      "a",
      {
        type: "submit",
        className: `action-btn m-auto`,
        href: PATHS.auth.dashboard.root,
        children: "Войти в кабинет"
      }
    )
  ] }) });
}

const PASSWORD_RULES_TEXT = "Пароль: не менее 6 символов, буквы в разных регистрах, цифра и спецсимвол.";
function NewPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordRepeat: ""
    }
  });
  const password = watch("password");
  const passwordRepeat = watch("passwordRepeat");
  useEffect(() => {
    if (passwordRepeat) {
      void trigger("passwordRepeat");
    }
  }, [password, passwordRepeat, trigger]);
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isSuccess]);
  const onSubmit = handleSubmit(async (values) => {
    if (isLoading) return;
    const formData = new FormData();
    formData.set("password", values.password);
    formData.set("passwordRepeat", values.passwordRepeat);
    console.log("New Password FormData", formData);
    console.log("New Password FormData entries", Object.fromEntries(formData.entries()));
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsLoading(false);
    setIsSuccess(true);
  });
  const submitDisabled = isLoading || !password.trim() || !passwordRepeat.trim();
  if (isSuccess) {
    return /* @__PURE__ */ jsx(SuccessMessage, {});
  }
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
              type: "password",
              placeholder: "Новый пароль",
              disabled: isLoading,
              ...register("password", {
                required: "Укажите новый пароль",
                validate: (value) => {
                  if (value.length < 6) return "Пароль должен содержать минимум 6 символов";
                  if (!/[a-z]/.test(value)) return "Пароль должен содержать хотя бы одну строчную букву";
                  if (!/[A-Z]/.test(value)) return "Пароль должен содержать хотя бы одну заглавную букву";
                  if (!/\d/.test(value)) return "Пароль должен содержать хотя бы одну цифру";
                  if (!/[^A-Za-z0-9]/.test(value)) return "Пароль должен содержать хотя бы один спецсимвол";
                  return true;
                }
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `error ${errors.password ? "" : "hidden"}`, children: errors.password?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `text-[14px] mb-[20px] -mt-[10px] leading-[16px] max-w-[350px] font-normal relative ${errors.password ? "mt-[10px]" : ""}`,
            children: PASSWORD_RULES_TEXT
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              placeholder: "Повторите пароль",
              disabled: isLoading,
              ...register("passwordRepeat", {
                required: "Повторите пароль",
                validate: (value) => value === password || "Пароли должны совпадать"
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `error ${errors.passwordRepeat ? "" : "hidden"}`, children: errors.passwordRepeat?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: `action-btn ${isLoading ? "loading" : ""} ${submitDisabled && !isLoading ? "disabled" : ""}`,
            disabled: submitDisabled,
            children: "Сохранить пароль"
          }
        )
      ]
    }
  );
}

const prerender = false;
const $$NewPassword = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NewPassword;
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: Astro2.request.headers.get("cookie") ?? ""
  });
  const profileResult = await serverApi.users.getProfile();
  if (profileResult.status === "ok") {
    return Astro2.redirect(PATHS.root);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} <div class="inner-content grid grid-cols-1 min-[1000px]:grid-cols-2 items-start justify-start gap-y-[60px]"> <div class="flex flex-col justify-start"> <h1>Создание<br>нового пароля</h1> <div class="max-w-[600px] mt-[10px]">Создайте новый пароль для входа в кабинет</div> </div> <div> ${renderComponent($$result2, "NewPasswordForm", NewPasswordForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/auth/newPasswordForm/NewPasswordForm", "client:component-export": "NewPasswordForm" })} </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/new-password.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/new-password.astro";
const $$url = "/auth/new-password/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$NewPassword,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
