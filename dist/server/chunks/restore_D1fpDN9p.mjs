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

function RestoreSentSuccess() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-[420px]  m-auto flex items-start justify-center text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "max-[800px]:max-w-[300px]", children: "Проверьте почту" }),
    /* @__PURE__ */ jsx("div", { className: "mt-[10px] max-w-[430px] text-center", children: "Мы отправили ссылку для восстановления пароля на указанный email. Перейдите по ссылке в письме, чтобы задать новый пароль." }),
    /* @__PURE__ */ jsx("div", { className: "mt-[30px] max-w-[430px] text-center", children: "Если письмо не пришло, проверьте папку «Спам» или попробуйте отправить ещё раз." }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: `action-btn m-auto`,
        children: "Отправить повторно"
      }
    )
  ] }) });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function RestoreForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: ""
    }
  });
  const email = watch("email");
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isSuccess]);
  const onSubmit = handleSubmit(async (values) => {
    if (isLoading) return;
    const formData = new FormData();
    formData.set("email", values.email);
    console.log("Restore FormData", formData);
    console.log("Restore FormData entries", Object.fromEntries(formData.entries()));
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsLoading(false);
    setIsSuccess(true);
  });
  const submitDisabled = isLoading || !email.trim();
  if (isSuccess) {
    return /* @__PURE__ */ jsx(RestoreSentSuccess, {});
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
              type: "email",
              placeholder: "Электронная почта",
              disabled: isLoading,
              ...register("email", {
                required: "Укажите электронную почту",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Введите корректный email"
                }
              })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.email ? "" : "hidden"}`, children: errors.email?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: `action-btn ${isLoading ? "loading" : ""} ${submitDisabled && !isLoading ? "disabled" : ""}`,
            disabled: submitDisabled,
            children: "Отправить ссылку"
          }
        )
      ]
    }
  );
}

const prerender = false;
const $$Restore = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Restore;
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: Astro2.request.headers.get("cookie") ?? ""
  });
  const profileResult = await serverApi.users.getProfile();
  if (profileResult.status === "ok") {
    return Astro2.redirect(PATHS.root);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} <div class="inner-content grid grid-cols-1 min-[1000px]:grid-cols-2 gap-[50px] items-start justify-start gap-y-[60px]"> <div class="flex flex-col justify-start"> <h1>Восстановление<br>пароля</h1> <div class="max-w-[430px] mt-[30px]">
Введите email, указанный при регистрации. Мы отправим ссылку для создания нового пароля.
</div> </div> <div> ${renderComponent($$result2, "RestoreForm", RestoreForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/auth/restoreForm/RestoreForm", "client:component-export": "RestoreForm" })} </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/restore.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/restore.astro";
const $$url = "/auth/restore/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Restore,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
