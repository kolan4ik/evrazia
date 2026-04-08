import { jsx } from 'react/jsx-runtime';
import { c as cn } from './Layout_DzAWaumG.mjs';

cn(
  "form-control group flex h-auto! w-full! justify-between gap-4 rounded-none border-0 border-b bg-transparent text-left shadow-none ring-0",
  "px-[var(--form-control-current-padding-x)] pt-[var(--form-control-padding-top)] pb-[var(--form-control-padding-bottom)]",
  "border-[var(--form-control-border-color)] focus-visible:border-[var(--form-control-focus-color)] focus-visible:ring-0",
  "data-[state=open]:border-[var(--form-control-focus-color)] max-[768px]:px-[var(--form-control-current-padding-x)]",
  "[&>span[data-slot=select-value]]:block [&>span[data-slot=select-value]]:min-w-0 [&>span[data-slot=select-value]]:flex-1 [&>span[data-slot=select-value]]:truncate",
  "[&>span[data-slot=select-value]]:text-[var(--form-control-current-font-size)] [&>span[data-slot=select-value]]:font-light [&>span[data-slot=select-value]]:leading-[var(--form-control-line-height)]",
  "[&>span[data-slot=select-value]]:text-[#152551] data-[placeholder]:[&>span[data-slot=select-value]]:text-[var(--form-control-placeholder-color)]"
);
cn(
  "select-accent-scrollbar z-50 max-h-[400px] w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] overflow-hidden rounded-[16px] border-0 bg-white p-0 shadow-[0_26px_70px_rgba(21,37,81,0.14)] ring-0",
  "max-[1200px]:max-h-[360px] max-[768px]:max-h-[320px] max-[768px]:rounded-[12px]",
  "[&_[data-slot=select-viewport]]:h-full [&_[data-slot=select-viewport]]:w-full [&_[data-slot=select-viewport]]:min-w-0! [&_[data-slot=select-viewport]]:p-[8px]",
  "max-[768px]:[&_[data-slot=select-viewport]]:p-[6px]",
  "[&_[data-slot=select-scroll-down-button]]:bg-white [&_[data-slot=select-scroll-up-button]]:bg-white",
  "[&_[data-slot=select-scroll-down-button]]:text-accent [&_[data-slot=select-scroll-up-button]]:text-accent"
);
cn(
  "min-h-0 rounded-[10px] px-[24px] py-[10px] text-left text-[22px] font-normal leading-[1.25] text-[#949494] outline-none",
  "focus:bg-[#F5F5F5] focus:text-accent data-[state=checked]:text-accent",
  "max-[1200px]:text-[18px] max-[768px]:px-[16px] max-[768px]:py-[8px] max-[768px]:text-[16px]",
  "[&_[data-slot=select-item-indicator]]:hidden"
);
function FieldMessages({ children, className }) {
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: cn("form-field-messages", className), children });
}
function FieldMessage({
  children,
  className,
  variant = "default",
  as: Component = "p"
}) {
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Component,
    {
      className: cn(
        "form-message",
        variant === "error" && "form-message--error",
        variant === "muted" && "form-message--muted",
        className
      ),
      children
    }
  );
}

export { FieldMessages as F, FieldMessage as a };
