import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead, a4 as addAttribute } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_Dg96Osvs.mjs';
import { $ as $$RegularMenu } from './RegularMenu_DMoBXt3a.mjs';
import { $ as $$Layout } from './Layout_DzAWaumG.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { P as PATHS } from './paths_CaINX1_I.mjs';
import { F as FieldMessages, a as FieldMessage } from './formPrimitives_BqpTrmDh.mjs';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { a as api } from './index_BGfC7bBd.mjs';
import { g as getApiErrorMessage, c as createServerApi } from './server_Ci6swuQU.mjs';

function RegisterConfirmation() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-[420px] m-auto flex items-start justify-center text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "max-[800px]:max-w-[300px]", children: "Подтверждение регистрации" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-[10px]", children: [
      "Не пришло письмо? Проверьте папку «Спам»",
      /* @__PURE__ */ jsx("br", {}),
      "или напишите в службу поддержки:",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "mailto:tech@premiyaevrazia.su",
          className: "text-link",
          children: "tech@premiyaevrazia.su"
        }
      )
    ] })
  ] }) });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RULES_TEXT = "Минимум 6 символов, минимум одна заглавная буква, одна строчная, одна цифра и один спецсимвол.";
function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    clearErrors,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      lastName: "",
      firstName: "",
      patronymic: "",
      noPatronymic: false,
      email: "",
      password: "",
      passwordRepeat: "",
      policyAccepted: false,
      eventsAccepted: false
    }
  });
  const {
    onChange: emailOnChange,
    ...emailFieldProps
  } = register("email", {
    required: "Введите корректный email",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Введите корректный email"
    }
  });
  const noPatronymic = watch("noPatronymic");
  const lastName = watch("lastName");
  const firstName = watch("firstName");
  const patronymic = watch("patronymic");
  const email = watch("email");
  const password = watch("password");
  const passwordRepeat = watch("passwordRepeat");
  const policyAccepted = watch("policyAccepted");
  useEffect(() => {
    if (noPatronymic) {
      clearErrors("patronymic");
    }
  }, [noPatronymic, clearErrors]);
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
    setSubmitError("");
    setIsLoading(true);
    try {
      const result = await api.auth.register({
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        second_name_empty: values.noPatronymic,
        second_name: values.noPatronymic ? null : values.patronymic.trim(),
        email: values.email.trim(),
        password: values.password,
        password_confirm: values.passwordRepeat,
        agree_processing_personal_data: true,
        want_receive_information: values.eventsAccepted
      });
      if (result.status === "error") {
        setSubmitError(getApiErrorMessage(result.payload, "Не удалось зарегистрироваться"));
        return;
      }
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Не удалось зарегистрироваться"));
    } finally {
      setIsLoading(false);
    }
  });
  const submitDisabled = isLoading || !lastName.trim() || !firstName.trim() || !noPatronymic && !patronymic.trim() || !email.trim() || !password.trim() || !passwordRepeat.trim() || !policyAccepted;
  if (isSuccess) {
    return /* @__PURE__ */ jsx(RegisterConfirmation, {});
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
              type: "text",
              placeholder: "Фамилия",
              disabled: isLoading,
              ...register("lastName", {
                required: "Укажите фамилию"
              })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.lastName ? "" : "hidden"}`, children: errors.lastName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Имя",
              disabled: isLoading,
              ...register("firstName", {
                required: "Укажите имя"
              })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.firstName ? "" : "hidden"}`, children: errors.firstName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: noPatronymic ? "Отчество отсутствует" : "Отчество",
              disabled: noPatronymic || isLoading,
              ...register("patronymic", {
                validate: (value) => noPatronymic || value.trim().length > 0 || "Укажите отчество"
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-[14px]", children: /* @__PURE__ */ jsxs("label", { className: "mt-[-24px] mb-[24px] text-[10px] leading-[10px] text-[#949494] flex flex-row gap-[10px] items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                disabled: isLoading,
                ...register("noPatronymic")
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative top-[2px]", children: "Нет отчества" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: `error ${errors.patronymic ? "" : "hidden"}`, children: errors.patronymic?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "form-control",
              type: "email",
              placeholder: "Электронная почта",
              disabled: isLoading,
              ...emailFieldProps,
              onChange: async (event) => {
                emailOnChange(event);
                await trigger("email");
              }
            }
          ),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { variant: "error", children: errors.email?.message }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: showPassword ? "text" : "password",
              placeholder: "Пароль",
              disabled: isLoading,
              ...register("password", {
                required: "Укажите пароль",
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
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute right-[20px] top-[20px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity",
              onClick: () => setShowPassword((prev) => !prev),
              "aria-label": showPassword ? "Скрыть пароль" : "Показать пароль",
              disabled: isLoading,
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: showPassword ? "/images/eye-show.svg" : "/images/eye-hide.svg",
                  alt: "",
                  width: 18,
                  height: 18
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `error ${errors.password ? "" : "hidden"}`, children: errors.password?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `text-[14px] mb-[20px] -mt-[10px] leading-[16px] max-w-[400px] font-normal relative ${errors.password ? "mt-[10px]" : ""}`,
            children: PASSWORD_RULES_TEXT
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: showPasswordRepeat ? "text" : "password",
              placeholder: "Повторите пароль",
              disabled: isLoading,
              ...register("passwordRepeat", {
                required: "Повторите пароль",
                validate: (value) => value === password || "Пароли не совпадают"
              })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute right-[20px] top-[20px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity",
              onClick: () => setShowPasswordRepeat((prev) => !prev),
              "aria-label": showPasswordRepeat ? "Скрыть пароль" : "Показать пароль",
              disabled: isLoading,
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: showPasswordRepeat ? "/images/eye-show.svg" : "/images/eye-hide.svg",
                  alt: "",
                  width: 18,
                  height: 18
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `error ${errors.passwordRepeat ? "" : "hidden"}`, children: errors.passwordRepeat?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `mb-[12px] text-center text-accent ${submitError ? "" : "hidden"}`, children: submitError }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: `action-btn ${isLoading ? "loading" : ""} ${submitDisabled && !isLoading ? "disabled" : ""}`,
            disabled: submitDisabled,
            children: isLoading ? "Отправка..." : "Отправить"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-[22px] pb-[16px] max-w-[360px]", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-[10px] leading-[16px] text-[#949494] flex flex-row gap-[10px] items-start", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                disabled: isLoading,
                ...register("policyAccepted", {
                  required: "Необходимо принять политику конфиденциальности"
                })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative -top-[2px]", children: [
              "Я принимаю",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: PATHS.privacy,
                  className: "text-link-reverse",
                  target: "_blank",
                  rel: "noreferrer",
                  children: "Политику конфиденциальности"
                }
              ),
              " ",
              "и соглашаюсь на обработку персональных данных"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `error ${errors.policyAccepted ? "" : "hidden"}`,
              style: { position: "static", marginTop: 6, paddingLeft: 22 },
              children: errors.policyAccepted?.message ?? ""
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "mb-[8px] text-[10px] leading-[16px] text-[#949494] flex flex-row gap-[10px] items-start", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              disabled: isLoading,
              ...register("eventsAccepted")
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "relative -top-px", children: "Хочу получать информацию о событиях и новостях" })
        ] })
      ]
    }
  );
}

const prerender = false;
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Register;
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
</a> </div> <div> ${renderComponent($$result2, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/auth/registerForm/RegisterForm", "client:component-export": "RegisterForm" })} </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/register.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evrazia/src/pages/auth/register.astro";
const $$url = "/auth/register/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Register,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
