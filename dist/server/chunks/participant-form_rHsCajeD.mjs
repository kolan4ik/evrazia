import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_jhl4VimB.mjs';
import { $ as $$RegularMenu } from './RegularMenu_C-KzrL6c.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useMemo, useEffect, useId, useRef, memo } from 'react';
import { getDefaultClassNames, DayPicker } from 'react-day-picker';
import { c as cn, $ as $$Layout } from './Layout_BHRDJuJp.mjs';
import { cva } from 'class-variance-authority';
import { Slot, Popover as Popover$1, Select as Select$1 } from 'radix-ui';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CalendarDaysIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';
import { format, getYear, parse, isValid, setMonth, setYear } from 'date-fns';
import { ru } from 'date-fns/locale';
import { F as FieldMessages, a as FieldMessage } from './formPrimitives_DezXMny1.mjs';
import { a as api } from './index_BGfC7bBd.mjs';
import { a as API_BASE_URL } from './config_B9oekYbR.mjs';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { g as getApiErrorMessage, c as createServerApi } from './server_Ci6swuQU.mjs';
import { a as getParticipantFormNominationId, f as findNominationByRouteValue, b as getDictionaryRouteValue } from './nominations_HFBSSkrC.mjs';

function ChevronIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      width: "20",
      height: "11",
      viewBox: "0 0 20 11",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18.7695 0.461095L9.61953 9.62109L0.459533 0.461093",
          stroke: "currentColor",
          strokeWidth: "1.3",
          strokeMiterlimit: "10"
        }
      )
    }
  );
}

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      locale,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label" ? "text-sm" : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: ({ ...props2 }) => /* @__PURE__ */ jsx(CalendarDayButton, { locale, ...props2 }),
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(locale?.code),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}

function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      ),
      ...props
    }
  ) });
}

const popover = "_popover_159vg_1";
const calendar = "_calendar_159vg_10";
const styles$2 = {
	popover: popover,
	calendar: calendar
};

const INPUT_PLACEHOLDER = "ГГГГ-ММ-ДД";
const MIN_YEAR = 1900;
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => ({
  value: index,
  label: format(new Date(2024, index, 1), "LLLL", { locale: ru })
}));
function getToday() {
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
function formatInputValue(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}
function parseDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const parsed = parse(value, "yyyy-MM-dd", /* @__PURE__ */ new Date());
  if (!isValid(parsed)) {
    return null;
  }
  return format(parsed, "yyyy-MM-dd") === value ? parsed : null;
}
function DatePicker({ date, setDate, placeholder = "Дата рождения" }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(date);
  const [isFocused, setIsFocused] = useState(false);
  const today = useMemo(() => getToday(), []);
  const selectedDate = useMemo(() => parseDateString(date), [date]);
  const draftDate = useMemo(() => parseDateString(draft), [draft]);
  const activeDate = useMemo(() => {
    if (draftDate && draftDate <= today) {
      return draftDate;
    }
    if (selectedDate && selectedDate <= today) {
      return selectedDate;
    }
    return null;
  }, [draftDate, selectedDate, today]);
  const [displayMonth, setDisplayMonth] = useState(selectedDate ?? today);
  const yearOptions = useMemo(
    () => Array.from({ length: getYear(today) - MIN_YEAR + 1 }, (_, index) => getYear(today) - index),
    [today]
  );
  useEffect(() => {
    setDraft(date);
  }, [date]);
  useEffect(() => {
    if (activeDate) {
      setDisplayMonth(activeDate);
      return;
    }
    setDisplayMonth(today);
  }, [activeDate, today]);
  const commitManualValue = (nextDraft) => {
    const parsed = parseDateString(nextDraft);
    if (!parsed) {
      return false;
    }
    if (parsed > today) {
      return false;
    }
    setDate(nextDraft);
    return true;
  };
  const handleMonthChange = (nextMonthIndex) => {
    const nextMonth = setMonth(displayMonth, nextMonthIndex);
    setDisplayMonth(nextMonth > today ? today : nextMonth);
  };
  const handleYearChange = (nextYear) => {
    const nextMonth = setYear(displayMonth, nextYear);
    setDisplayMonth(nextMonth > today ? today : nextMonth);
  };
  const handleInputChange = (value) => {
    const formattedValue = formatInputValue(value);
    setDraft(formattedValue);
    if (formattedValue.length < INPUT_PLACEHOLDER.length) {
      setDate(formattedValue);
      return;
    }
    if (!commitManualValue(formattedValue)) {
      return;
    }
  };
  const handleInputBlur = () => {
    setIsFocused(false);
    if (!draft) {
      setDate("");
      return;
    }
    if (draft.length < INPUT_PLACEHOLDER.length) {
      setDraft(date);
      return;
    }
    if (!commitManualValue(draft)) {
      setDraft(date);
    }
  };
  const handleCalendarSelect = (value) => {
    if (!value) {
      return;
    }
    const nextDate = format(value, "yyyy-MM-dd");
    setDate(nextDate);
    setDraft(nextDate);
    setOpen(false);
  };
  return /* @__PURE__ */ jsx(
    Popover,
    {
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "form-control pr-[52px]!",
              type: "text",
              inputMode: "numeric",
              placeholder: isFocused ? INPUT_PLACEHOLDER : placeholder,
              value: draft,
              maxLength: INPUT_PLACEHOLDER.length,
              onChange: (event) => handleInputChange(event.target.value),
              onFocus: () => setIsFocused(true),
              onBlur: handleInputBlur
            }
          ),
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: cn(
                "absolute right-[18px] top-[16px] flex items-center justify-center text-accent transition-colors duration-200 hover:text-[#A87242]",
                "max-[768px]:right-[12px] max-[768px]:top-[14px]"
              ),
              "aria-label": "Выбрать дату",
              children: /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "size-5 max-[768px]:size-4" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(
          PopoverContent,
          {
            align: "end",
            side: "bottom",
            sideOffset: 12,
            collisionPadding: { right: 20, left: 12, top: 12, bottom: 12 },
            className: styles$2.popover,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 max-[768px]:mb-3", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    className: "sr-only",
                    htmlFor: "date-picker-month",
                    children: "Месяц"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    id: "date-picker-month",
                    value: displayMonth.getMonth(),
                    onChange: (event) => handleMonthChange(Number(event.target.value)),
                    className: "h-10 min-w-0 flex-1 rounded-full border border-[#dcdcdc] bg-white px-4 text-[16px] font-medium text-[#152551] outline-none transition-colors focus:border-[var(--accent)]",
                    children: MONTH_OPTIONS.map((month) => /* @__PURE__ */ jsx(
                      "option",
                      {
                        value: month.value,
                        children: month.label
                      },
                      month.value
                    ))
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    className: "sr-only",
                    htmlFor: "date-picker-year",
                    children: "Год"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    id: "date-picker-year",
                    value: displayMonth.getFullYear(),
                    onChange: (event) => handleYearChange(Number(event.target.value)),
                    className: "h-10 w-[112px] shrink-0 rounded-full border border-[#dcdcdc] bg-white px-4 text-[16px] font-medium text-[#152551] outline-none transition-colors focus:border-[var(--accent)]",
                    children: yearOptions.map((year) => /* @__PURE__ */ jsx(
                      "option",
                      {
                        value: year,
                        children: year
                      },
                      year
                    ))
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Calendar,
                {
                  mode: "single",
                  locale: ru,
                  month: displayMonth,
                  onMonthChange: setDisplayMonth,
                  selected: activeDate ?? void 0,
                  onSelect: handleCalendarSelect,
                  disabled: { after: today },
                  startMonth: new Date(MIN_YEAR, 0, 1),
                  endMonth: today,
                  hideNavigation: true,
                  className: styles$2.calendar,
                  classNames: {
                    month_caption: "hidden",
                    caption_label: "hidden",
                    nav: "hidden",
                    button_previous: "flex size-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#949494] hover:bg-[#f5f5f5] hover:text-accent",
                    button_next: "flex size-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#949494] hover:bg-[#f5f5f5] hover:text-accent",
                    weekdays: "mb-2 flex",
                    weekday: "flex-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[#949494]",
                    week: "mt-1 flex w-full",
                    day: "relative aspect-square h-full w-full p-0 text-center",
                    today: "rounded-full bg-[#f5f5f5] text-[#152551]",
                    selected: "rounded-full bg-[var(--accent)] text-white hover:bg-[#A87242]",
                    disabled: "text-[#d0d0d0] opacity-100",
                    outside: "text-[#d0d0d0]"
                  },
                  components: {
                    DayButton: ({ className, ...props }) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: cn(
                          "flex size-10 items-center justify-center rounded-full border-0 bg-transparent text-[14px] font-normal text-[#152551] transition-colors outline-none hover:bg-[#f5f5f5] hover:text-accent",
                          "aria-selected:bg-[var(--accent)] aria-selected:text-white",
                          "max-[768px]:size-9 max-[768px]:text-[12px]",
                          className
                        ),
                        ...props
                      }
                    )
                  }
                }
              )
            ]
          }
        )
      ] })
    }
  );
}

const root$1 = "_root_iebsq_1";
const zone$1 = "_zone_iebsq_5";
const zoneActive$1 = "_zoneActive_iebsq_18";
const zoneEmpty = "_zoneEmpty_iebsq_22";
const hiddenInput$1 = "_hiddenInput_iebsq_28";
const emptyStateButton = "_emptyStateButton_iebsq_40";
const content$1 = "_content_iebsq_66";
const fileList = "_fileList_iebsq_72";
const fileItem = "_fileItem_iebsq_78";
const fileRow = "_fileRow_iebsq_84";
const fileMeta = "_fileMeta_iebsq_91";
const fileMetaError = "_fileMetaError_iebsq_100";
const fileIconWrap = "_fileIconWrap_iebsq_104";
const fileIcon = "_fileIcon_iebsq_104";
const fileTitle = "_fileTitle_iebsq_115";
const fileActions = "_fileActions_iebsq_125";
const uploadState = "_uploadState_iebsq_133";
const progressValue = "_progressValue_iebsq_141";
const fileSize = "_fileSize_iebsq_142";
const fileSizeError = "_fileSizeError_iebsq_149";
const progressTrack = "_progressTrack_iebsq_153";
const progressFill = "_progressFill_iebsq_161";
const iconButton = "_iconButton_iebsq_168";
const retryButton = "_retryButton_iebsq_169";
const addFileButton = "_addFileButton_iebsq_170";
const fileErrorRow = "_fileErrorRow_iebsq_190";
const generalError = "_generalError_iebsq_219";
const styles$1 = {
	root: root$1,
	zone: zone$1,
	zoneActive: zoneActive$1,
	zoneEmpty: zoneEmpty,
	hiddenInput: hiddenInput$1,
	emptyStateButton: emptyStateButton,
	content: content$1,
	fileList: fileList,
	fileItem: fileItem,
	fileRow: fileRow,
	fileMeta: fileMeta,
	fileMetaError: fileMetaError,
	fileIconWrap: fileIconWrap,
	fileIcon: fileIcon,
	fileTitle: fileTitle,
	fileActions: fileActions,
	uploadState: uploadState,
	progressValue: progressValue,
	fileSize: fileSize,
	fileSizeError: fileSizeError,
	progressTrack: progressTrack,
	progressFill: progressFill,
	iconButton: iconButton,
	retryButton: retryButton,
	addFileButton: addFileButton,
	fileErrorRow: fileErrorRow,
	generalError: generalError
};

const DEFAULT_FORMATS = ["jpg", "jpeg", "png", "webp", "doc", "docx", "pdf", "txt", "rtf"];
const MIME_BY_EXTENSION = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  doc: ".doc",
  docx: ".docx",
  pdf: "application/pdf",
  txt: "text/plain",
  rtf: "application/rtf"
};
function getDefaultFormats() {
  return [...DEFAULT_FORMATS];
}
function normalizeFormats(formats) {
  if (!formats?.length) {
    return getDefaultFormats();
  }
  return formats.map((format) => format.trim().toLowerCase());
}
function getFileExtension(fileName) {
  const parts = fileName.split(".");
  if (parts.length < 2) {
    return "";
  }
  return parts.at(-1)?.toLowerCase() ?? "";
}
function toSizeMb(bytes) {
  return Number((bytes / (1024 * 1024)).toFixed(3));
}
function formatSizeMb(sizeMb) {
  return `${sizeMb.toFixed(2)} MB`;
}
function isAllowedExtension(extension, formats) {
  if (!extension) {
    return false;
  }
  return formats.includes(extension.toLowerCase());
}
function buildAcceptValue(formats) {
  return formats.map((format) => MIME_BY_EXTENSION[format] ?? `.${format}`).join(",");
}
function createDropZoneFileId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `drop-zone-file-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function UploadProgressBar({ progress }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: styles$1.progressTrack,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: styles$1.progressFill,
          style: { width: `${Math.max(0, Math.min(progress, 100))}%` }
        }
      )
    }
  );
}

function FileIcon({ hasError }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: styles$1.fileIcon,
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M5.16663 1.66669H11.8333L15.8333 5.66669V16.6667C15.8333 17.5872 15.0871 18.3334 14.1666 18.3334H5.83329C4.91282 18.3334 4.16663 17.5872 4.16663 16.6667V3.33335C4.16663 2.41288 4.91282 1.66669 5.83329 1.66669H5.16663Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11.6666 1.66669V5.83335H15.8333",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M7.5 10H12.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M7.5 13.3333H11.6667",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function RemoveIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2 2L10 10",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M10 2L2 10",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function DropZoneFileItem({ file, onRemove, onRetry }) {
  const isUploading = file.status === "uploading";
  const isError = file.status === "error";
  return /* @__PURE__ */ jsxs("div", { className: styles$1.fileItem, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$1.fileRow, children: [
      /* @__PURE__ */ jsxs("div", { className: `${styles$1.fileMeta} ${isError ? styles$1.fileMetaError : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: styles$1.fileIconWrap, children: /* @__PURE__ */ jsx(FileIcon, { hasError: isError }) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: styles$1.fileTitle,
            title: file.title,
            children: file.title
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$1.fileActions, children: [
        isUploading ? /* @__PURE__ */ jsxs("div", { className: styles$1.uploadState, children: [
          /* @__PURE__ */ jsxs("span", { className: styles$1.progressValue, children: [
            file.progress,
            "%"
          ] }),
          /* @__PURE__ */ jsx(UploadProgressBar, { progress: file.progress })
        ] }) : /* @__PURE__ */ jsx("span", { className: `${styles$1.fileSize} ${isError ? styles$1.fileSizeError : ""}`, children: formatSizeMb(file.sizeMb) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: styles$1.iconButton,
            onClick: (event) => {
              event.stopPropagation();
              onRemove(file.id);
            },
            "aria-label": `Удалить файл ${file.title}`,
            children: /* @__PURE__ */ jsx(RemoveIcon, {})
          }
        )
      ] })
    ] }),
    isError && /* @__PURE__ */ jsxs("div", { className: styles$1.fileErrorRow, children: [
      /* @__PURE__ */ jsx("span", { children: file.errorMessage ?? "не удалось загрузить файл" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: styles$1.retryButton,
          onClick: (event) => {
            event.stopPropagation();
            onRetry(file.id);
          },
          children: "повторить"
        }
      )
    ] })
  ] });
}

async function uploadFileMock({ file, onProgress }) {
  const totalDurationMs = 3e3;
  const tickMs = 150;
  const maxTicks = Math.ceil(totalDurationMs / tickMs);
  return new Promise((resolve) => {
    let tick = 0;
    onProgress?.(0);
    const timer = window.setInterval(() => {
      tick += 1;
      const progress = Math.min(100, Math.round(tick / maxTicks * 100));
      onProgress?.(progress);
      if (tick < maxTicks) {
        return;
      }
      window.clearInterval(timer);
      const safeFileName = encodeURIComponent(file.name.replace(/\s+/g, "-").toLowerCase());
      resolve(["success", `https://mock-s3.local/${Date.now()}-${safeFileName}`]);
    }, tickMs);
  });
}

function DropZone({ files, setFiles, maxFiles, maxFileMb, formats, addonText }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const uploadTokensRef = useRef(/* @__PURE__ */ new Map());
  const [isDragActive, setIsDragActive] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const allowedFormats = normalizeFormats(formats);
  const acceptValue = buildAcceptValue(allowedFormats);
  const openFilePicker = () => {
    inputRef.current?.click();
  };
  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const removeFile = (fileId) => {
    uploadTokensRef.current.delete(fileId);
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    console.log("deleted");
  };
  const updateFile = (fileId, updater) => {
    setFiles(
      (prevFiles) => prevFiles.map((file) => {
        if (file.id !== fileId) {
          return file;
        }
        return updater(file);
      })
    );
  };
  const startUpload = async (fileId, sourceFile) => {
    const uploadToken = Symbol(fileId);
    uploadTokensRef.current.set(fileId, uploadToken);
    const result = await uploadFileMock({
      file: sourceFile,
      onProgress: (progress) => {
        if (uploadTokensRef.current.get(fileId) !== uploadToken) {
          return;
        }
        updateFile(fileId, (file) => ({
          ...file,
          progress
        }));
      }
    });
    if (uploadTokensRef.current.get(fileId) !== uploadToken) {
      return;
    }
    if (result[0] === "success") {
      updateFile(fileId, (file) => ({
        ...file,
        status: "success",
        progress: 100,
        uri: result[1],
        errorMessage: null
      }));
      return;
    }
    updateFile(fileId, (file) => ({
      ...file,
      status: "error",
      progress: 0,
      uri: null,
      errorMessage: "не удалось загрузить файл"
    }));
  };
  const retryUpload = (fileId) => {
    const fileToRetry = files.find((file) => file.id === fileId);
    if (!fileToRetry?.file) {
      return;
    }
    updateFile(fileId, (file) => ({
      ...file,
      status: "uploading",
      progress: 0,
      uri: null,
      errorMessage: null
    }));
    void startUpload(fileId, fileToRetry.file);
  };
  const addFiles = (nextFiles) => {
    if (!nextFiles.length) {
      return;
    }
    if (files.length + nextFiles.length > maxFiles) {
      setGeneralError(`Можно загрузить до ${maxFiles} файлов`);
      clearFileInput();
      return;
    }
    setGeneralError(null);
    const preparedFiles = nextFiles.map((file) => {
      const extension = getFileExtension(file.name);
      const sizeMb = toSizeMb(file.size);
      const isFormatAllowed = isAllowedExtension(extension, allowedFormats);
      const isSizeAllowed = sizeMb <= maxFileMb;
      if (!isFormatAllowed) {
        return {
          id: createDropZoneFileId(),
          file,
          title: file.name,
          extension,
          sizeMb,
          uri: null,
          status: "error",
          progress: 0,
          errorMessage: "недопустимый формат файла"
        };
      }
      if (!isSizeAllowed) {
        return {
          id: createDropZoneFileId(),
          file,
          title: file.name,
          extension,
          sizeMb,
          uri: null,
          status: "error",
          progress: 0,
          errorMessage: "Превышен максимальный размер файла"
        };
      }
      return {
        id: createDropZoneFileId(),
        file,
        title: file.name,
        extension,
        sizeMb,
        uri: null,
        status: "uploading",
        progress: 0,
        errorMessage: null
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...preparedFiles]);
    preparedFiles.forEach((file) => {
      if (file.status !== "uploading" || !file.file) {
        return;
      }
      void startUpload(file.id, file.file);
    });
    clearFileInput();
  };
  const handleInputChange = (event) => {
    addFiles(Array.from(event.target.files ?? []));
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragActive(false);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragActive(false);
    addFiles(Array.from(event.dataTransfer.files));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$1.root, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(styles$1.zone, isDragActive && styles$1.zoneActive, files.length === 0 && styles$1.zoneEmpty),
        onClick: openFilePicker,
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onKeyDown: handleKeyDown,
        role: "button",
        tabIndex: 0,
        "aria-label": "Зона загрузки файлов",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              id: inputId,
              className: styles$1.hiddenInput,
              type: "file",
              multiple: true,
              accept: acceptValue,
              onChange: handleInputChange
            }
          ),
          files.length === 0 ? /* @__PURE__ */ jsxs(
            "button",
            {
              id: `${inputId}-empty-text`,
              type: "button",
              className: styles$1.emptyStateButton,
              onClick: (event) => {
                event.stopPropagation();
                openFilePicker();
              },
              children: [
                /* @__PURE__ */ jsx("span", { children: "Перетащите файлы" }),
                /* @__PURE__ */ jsx("span", { children: "или нажмите для загрузки" }),
                addonText ? /* @__PURE__ */ jsx("div", { className: "mt-1", children: addonText }) : null
              ]
            }
          ) : /* @__PURE__ */ jsxs("div", { className: styles$1.content, children: [
            /* @__PURE__ */ jsx("div", { className: styles$1.fileList, children: files.map((file) => /* @__PURE__ */ jsx(
              DropZoneFileItem,
              {
                file,
                onRemove: removeFile,
                onRetry: retryUpload
              },
              file.id
            )) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: styles$1.addFileButton,
                onClick: (event) => {
                  event.stopPropagation();
                  openFilePicker();
                },
                children: "добавить файл"
              }
            )
          ] })
        ]
      }
    ),
    generalError && /* @__PURE__ */ jsx("p", { className: styles$1.generalError, children: generalError })
  ] });
}

const PHONE_DIGITS_COUNT = 11;
const CODE_DIGITS_COUNT = 4;
const RESEND_TIMEOUT_SECONDS = 60;
function normalizePhoneDigits(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits) {
    return "";
  }
  if (digits[0] === "7" || digits[0] === "8") {
    return `7${digits.slice(1, PHONE_DIGITS_COUNT)}`;
  }
  return `7${digits.slice(0, PHONE_DIGITS_COUNT - 1)}`;
}
function formatPhoneValue(value) {
  const normalized = normalizePhoneDigits(value);
  if (!normalized) {
    return "";
  }
  const localDigits = normalized.slice(1);
  const parts = [
    localDigits.slice(0, 3),
    localDigits.slice(3, 6),
    localDigits.slice(6, 8),
    localDigits.slice(8, 10)
  ].filter(Boolean);
  return `+7 ${parts.join(" ")}`;
}
function isPhoneValid(value) {
  return normalizePhoneDigits(value).length === PHONE_DIGITS_COUNT;
}
function formatTimer(seconds) {
  const safeSeconds = Math.max(seconds, 0);
  const minutes = Math.floor(safeSeconds / 60);
  const restSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
}
async function requestPhoneConfirmation() {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return Math.random() >= 0.5 ? { status: "success" } : { status: "fault" };
}
async function verifyPhoneConfirmationCode() {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return Math.random() >= 0.5 ? { status: "success" } : { status: "fault" };
}

function PhoneConfirmationModal({
  isOpen,
  verificationStatus,
  verificationCode,
  secondsLeft,
  isRequestingCode,
  isVerifyingCode,
  codeInputsRef,
  onClose,
  onCodeInput,
  onCodeKeyDown,
  onCodePaste,
  onVerify,
  onResend
}) {
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-[rgba(18,28,48,0.08)] px-[16px]",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative flex w-full max-w-[540px] flex-col rounded-[26px] bg-white px-[20px] pt-[20px] pb-[60px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] max-[768px]:rounded-[22px]",
          style: { minHeight: 476 },
          onClick: (event) => event.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "shrink-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Закрыть подтверждение телефона",
                  onClick: onClose,
                  className: "absolute right-[20px] top-[20px] flex h-[43px] w-[43px] cursor-pointer items-center justify-center bg-transparent transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40",
                  disabled: isVerifyingCode,
                  children: /* @__PURE__ */ jsx(CloseIcon, {})
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "pr-[56px] text-left text-[18px] font-medium leading-[24px] text-[#233a72]", children: "Подтвердите номер телефона" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center", children: verificationStatus === "success" ? /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center text-center text-[18px] font-medium leading-[1.2] text-[#d09b52] max-[768px]:text-[14px]", children: "Номер подтверждён" }) : /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center pt-[30px]", children: [
              /* @__PURE__ */ jsxs("div", { className: "max-w-[360px] text-center text-[14px] font-normal leading-[20px] text-[#233a72]", children: [
                "Мы позвоним вам. Отвечать на звонок не нужно.",
                /* @__PURE__ */ jsx("br", {}),
                "Введите последние 4 цифры звонящего номера."
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `mt-[20px] min-h-[34px] text-center text-[18px] font-medium leading-[24px] ${verificationStatus === "error" ? "text-[#d09b52]" : "text-transparent"}`,
                  children: verificationStatus === "error" ? "Неверный код. Попробуйте ещё раз" : "."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-[8px] flex items-center justify-center gap-[12px] max-[768px]:gap-[8px]", children: Array.from({ length: CODE_DIGITS_COUNT }).map((_, index) => /* @__PURE__ */ jsx(
                "input",
                {
                  ref: (element) => {
                    codeInputsRef.current[index] = element;
                  },
                  type: "text",
                  inputMode: "numeric",
                  autoComplete: "one-time-code",
                  maxLength: 1,
                  value: verificationCode[index] ?? "",
                  onChange: (event) => onCodeInput(index, event.target.value),
                  onKeyDown: (event) => onCodeKeyDown(index, event),
                  onPaste: onCodePaste,
                  disabled: isVerifyingCode || isRequestingCode,
                  className: "m-0! h-[70px]! w-[50px]! rounded-[12px]! border! border-[#dcdcdc]! bg-white! p-0! text-center text-[28px]! font-medium leading-none text-[#233a72] outline-none transition-colors focus:border-[#233a72]! disabled:bg-[#f1f1f1]!"
                },
                index
              )) }),
              /* @__PURE__ */ jsx("div", { className: "mt-[20px] min-h-[24px] text-center text-[14px] font-regular leading-[20px] text-[#a8a8a8]", children: secondsLeft > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Повторить звонок через ",
                formatTimer(secondsLeft)
              ] }) : /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onResend,
                  className: "text-[#233a72] underline underline-offset-[4px] transition-opacity hover:opacity-80",
                  disabled: isRequestingCode,
                  children: "Получить звонок повторно"
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "flex shrink-0 justify-center pt-[32px]", children: verificationStatus === "success" ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "action-btn mt-0! w-full! max-w-[160px]! self-center",
                children: "Закрыть"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onVerify,
                disabled: verificationCode.length !== CODE_DIGITS_COUNT || isVerifyingCode,
                className: `action-btn mt-0! w-full! max-w-[216px]! self-center ${verificationCode.length !== CODE_DIGITS_COUNT || isVerifyingCode ? "disabled" : ""}`,
                style: {
                  backgroundColor: verificationCode.length === CODE_DIGITS_COUNT && !isVerifyingCode ? "#d09b52" : "#cfcfcf"
                },
                children: isVerifyingCode ? "Проверка..." : "Подтвердить"
              }
            ) })
          ]
        }
      )
    }
  );
}
function CloseIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "43",
      height: "43",
      viewBox: "0 0 43 43",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M31.8221 10.606C25.9642 4.74812 16.4667 4.74812 10.6089 10.606C4.751 16.4638 4.751 25.9613 10.6089 31.8192C16.4667 37.677 25.9642 37.677 31.8221 31.8192C37.6799 25.9613 37.6799 16.4638 31.8221 10.606Z",
            stroke: "#C5985E",
            strokeWidth: "1.3",
            strokeMiterlimit: "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28.6412 13.4922L13.9106 28.2228",
            stroke: "#C5985E",
            strokeWidth: "1.3"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28.6373 28.6406L13.9067 13.91",
            stroke: "#C5985E",
            strokeWidth: "1.3"
          }
        )
      ]
    }
  );
}

function PhoneWithConfirmation({
  phone,
  setPhone,
  isConfirmed = false,
  setConfirmed,
  withConfirmation = true,
  disabled = false,
  placeholder = "Телефон"
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT_SECONDS);
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [internalConfirmed, setInternalConfirmed] = useState(isConfirmed);
  const [confirmedPhone, setConfirmedPhone] = useState(isConfirmed ? formatPhoneValue(phone) : "");
  const codeInputsRef = useRef([]);
  const formattedPhone = useMemo(() => formatPhoneValue(phone), [phone]);
  const phoneIsValid = useMemo(() => isPhoneValid(phone), [phone]);
  const phoneMatchesConfirmed = Boolean(confirmedPhone) && confirmedPhone === formattedPhone;
  const effectiveConfirmed = (setConfirmed ? isConfirmed : internalConfirmed) && phoneMatchesConfirmed;
  const submitButtonDisabled = disabled || !phoneIsValid || isRequestingCode || isVerifyingCode || effectiveConfirmed;
  const clearConfirmationState = () => {
    if (!confirmedPhone && !effectiveConfirmed && !internalConfirmed && !isConfirmed) {
      return;
    }
    setConfirmedPhone("");
    setConfirmed?.(false);
    setInternalConfirmed(false);
  };
  useEffect(() => {
    if (!isModalOpen || secondsLeft <= 0) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setSecondsLeft((previousValue) => previousValue - 1);
    }, 1e3);
    return () => window.clearTimeout(timeoutId);
  }, [isModalOpen, secondsLeft]);
  useEffect(() => {
    if (!setConfirmed) {
      setInternalConfirmed(isConfirmed);
    }
  }, [isConfirmed, setConfirmed]);
  useEffect(() => {
    if (effectiveConfirmed) {
      setConfirmedPhone(formattedPhone);
      return;
    }
    if (confirmedPhone && confirmedPhone !== formattedPhone) {
      clearConfirmationState();
    }
  }, [confirmedPhone, effectiveConfirmed, formattedPhone]);
  useEffect(() => {
    if (!isModalOpen || verificationStatus === "success") {
      return;
    }
    const focusIndex = Math.min(verificationCode.length, CODE_DIGITS_COUNT - 1);
    codeInputsRef.current[focusIndex]?.focus();
  }, [isModalOpen, verificationCode, verificationStatus]);
  const handlePhoneChange = (event) => {
    const nextPhone = formatPhoneValue(event.target.value);
    setPhone(nextPhone);
    if (confirmedPhone && confirmedPhone !== nextPhone) {
      clearConfirmationState();
    }
  };
  const handlePhoneKeyDown = (event) => {
    const allowedKeys = /* @__PURE__ */ new Set([
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End"
    ]);
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    if (allowedKeys.has(event.key)) {
      return;
    }
    if (/^\d$/.test(event.key)) {
      return;
    }
    if (event.key === "+" && event.currentTarget.selectionStart === 0) {
      return;
    }
    event.preventDefault();
  };
  const openModal = async () => {
    if (submitButtonDisabled) {
      return;
    }
    setIsRequestingCode(true);
    setVerificationCode("");
    setVerificationStatus("idle");
    setSecondsLeft(RESEND_TIMEOUT_SECONDS);
    setIsModalOpen(true);
    await requestPhoneConfirmation();
    setIsRequestingCode(false);
  };
  const closeModal = () => {
    if (isVerifyingCode) {
      return;
    }
    setIsModalOpen(false);
    setVerificationCode("");
    setVerificationStatus("idle");
    setSecondsLeft(RESEND_TIMEOUT_SECONDS);
  };
  const handleCodeInput = (index, nextValue) => {
    const digit = nextValue.replace(/\D/g, "").slice(-1);
    const nextCode = verificationCode.split("");
    if (!digit) {
      nextCode[index] = "";
      setVerificationCode(nextCode.join(""));
      setVerificationStatus("idle");
      return;
    }
    nextCode[index] = digit;
    const preparedCode = nextCode.join("").slice(0, CODE_DIGITS_COUNT);
    setVerificationCode(preparedCode);
    setVerificationStatus("idle");
    if (index < CODE_DIGITS_COUNT - 1) {
      codeInputsRef.current[index + 1]?.focus();
    }
  };
  const handleCodeKeyDown = (index, event) => {
    if (event.key !== "Backspace") {
      return;
    }
    if (verificationCode[index]) {
      return;
    }
    if (index > 0) {
      const nextCode = verificationCode.split("");
      nextCode[index - 1] = "";
      setVerificationCode(nextCode.join(""));
      setVerificationStatus("idle");
      codeInputsRef.current[index - 1]?.focus();
    }
  };
  const handleCodePaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_DIGITS_COUNT);
    if (!pastedDigits) {
      return;
    }
    setVerificationCode(pastedDigits);
    setVerificationStatus("idle");
    codeInputsRef.current[Math.min(pastedDigits.length, CODE_DIGITS_COUNT) - 1]?.focus();
  };
  const handleVerify = async () => {
    if (verificationCode.length !== CODE_DIGITS_COUNT || isVerifyingCode) {
      return;
    }
    setIsVerifyingCode(true);
    const result = await verifyPhoneConfirmationCode();
    setIsVerifyingCode(false);
    if (result.status === "success") {
      setVerificationStatus("success");
      setConfirmedPhone(formattedPhone);
      setConfirmed?.(true);
      setInternalConfirmed(true);
      return;
    }
    setVerificationStatus("error");
  };
  const handleResend = async () => {
    if (secondsLeft > 0 || isRequestingCode) {
      return;
    }
    setIsRequestingCode(true);
    setVerificationStatus("idle");
    setVerificationCode("");
    setSecondsLeft(RESEND_TIMEOUT_SECONDS);
    await requestPhoneConfirmation();
    setIsRequestingCode(false);
    codeInputsRef.current[0]?.focus();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `relative flex items-start ${withConfirmation ? "gap-[18px]" : "gap-0"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: "form-control",
          type: "text",
          inputMode: "numeric",
          autoComplete: "tel",
          placeholder,
          value: formattedPhone,
          onChange: handlePhoneChange,
          onKeyDown: handlePhoneKeyDown,
          disabled
        }
      ) }),
      withConfirmation ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: openModal,
          disabled: submitButtonDisabled,
          className: `action-btn mt-0! shrink-0 normal-case! h-[38px]! w-[114px]! text-[14px]! leading-[14px]! font-medium! ${submitButtonDisabled || effectiveConfirmed ? "disabled" : ""}`,
          children: effectiveConfirmed ? "Подтвержден" : isRequestingCode ? "Отправка..." : "Получить код"
        }
      ) : null
    ] }),
    withConfirmation ? /* @__PURE__ */ jsx(
      PhoneConfirmationModal,
      {
        isOpen: isModalOpen,
        verificationStatus,
        verificationCode,
        secondsLeft,
        isRequestingCode,
        isVerifyingCode,
        codeInputsRef,
        onClose: closeModal,
        onCodeInput: handleCodeInput,
        onCodeKeyDown: handleCodeKeyDown,
        onCodePaste: handleCodePaste,
        onVerify: handleVerify,
        onResend: handleResend
      }
    ) : null
  ] });
}

const root = "_root_1ybau_1";
const rootDisabled = "_rootDisabled_1ybau_8";
const zone = "_zone_1ybau_12";
const plusIcon = "_plusIcon_1ybau_32";
const zoneActive = "_zoneActive_1ybau_36";
const zoneUploading = "_zoneUploading_1ybau_40";
const zoneError = "_zoneError_1ybau_45";
const hiddenInput = "_hiddenInput_1ybau_49";
const plusLineHorizontal = "_plusLineHorizontal_1ybau_72";
const plusLineVertical = "_plusLineVertical_1ybau_73";
const image = "_image_1ybau_92";
const statusText = "_statusText_1ybau_99";
const content = "_content_1ybau_107";
const action = "_action_1ybau_114";
const description = "_description_1ybau_137";
const errorMessage = "_errorMessage_1ybau_145";
const styles = {
	root: root,
	rootDisabled: rootDisabled,
	zone: zone,
	plusIcon: plusIcon,
	zoneActive: zoneActive,
	zoneUploading: zoneUploading,
	zoneError: zoneError,
	hiddenInput: hiddenInput,
	plusLineHorizontal: plusLineHorizontal,
	plusLineVertical: plusLineVertical,
	image: image,
	statusText: statusText,
	content: content,
	action: action,
	description: description,
	errorMessage: errorMessage
};

const FORMATS = ["jpg", "jpeg", "png"];
const MAX_FILE_MB = 5;
function UploadAvatar({ imgUri, setImgUri, onFileChange }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const uploadTokenRef = useRef(null);
  const localObjectUrlRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [status, setStatus] = useState("idle");
  const allowedFormats = normalizeFormats(FORMATS);
  const acceptValue = buildAcceptValue(allowedFormats);
  useEffect(() => {
    return () => {
      if (localObjectUrlRef.current) {
        URL.revokeObjectURL(localObjectUrlRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (localObjectUrlRef.current && imgUri !== localObjectUrlRef.current) {
      URL.revokeObjectURL(localObjectUrlRef.current);
      localObjectUrlRef.current = null;
    }
  }, [imgUri]);
  const openFilePicker = () => {
    if (status === "uploading") {
      return;
    }
    inputRef.current?.click();
  };
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const setLocalPreview = (nextUri) => {
    if (localObjectUrlRef.current) {
      URL.revokeObjectURL(localObjectUrlRef.current);
    }
    localObjectUrlRef.current = nextUri;
    setImgUri(nextUri);
  };
  const handleError = () => {
    setStatus("error");
    clearInput();
  };
  const validateFile = (file) => {
    if (!file) {
      return false;
    }
    const extension = getFileExtension(file.name);
    const isValidFormat = isAllowedExtension(extension, allowedFormats);
    const isValidSize = toSizeMb(file.size) <= MAX_FILE_MB;
    return isValidFormat && isValidSize;
  };
  const uploadFile = async (file) => {
    setStatus("uploading");
    const uploadToken = Symbol(file.name);
    uploadTokenRef.current = uploadToken;
    const result = await uploadFileMock({ file });
    if (uploadTokenRef.current !== uploadToken) {
      return;
    }
    if (result[0] === "fault") {
      handleError();
      return;
    }
    setLocalPreview(URL.createObjectURL(file));
    onFileChange?.(file);
    setStatus("idle");
    clearInput();
  };
  const processFiles = (files) => {
    if (files.length !== 1) {
      handleError();
      return;
    }
    const [file] = files;
    if (!validateFile(file)) {
      handleError();
      return;
    }
    void uploadFile(file);
  };
  const handleInputChange = (event) => {
    processFiles(Array.from(event.target.files ?? []));
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    if (status === "uploading") {
      return;
    }
    setIsDragActive(true);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    if (status === "uploading") {
      return;
    }
    setIsDragActive(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragActive(false);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    if (status === "uploading") {
      return;
    }
    setIsDragActive(false);
    processFiles(Array.from(event.dataTransfer.files));
  };
  const handleKeyDown = (event) => {
    if (status === "uploading") {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };
  const hasImage = Boolean(imgUri);
  const hasError = status === "error";
  const isUploading = status === "uploading";
  return /* @__PURE__ */ jsxs("div", { className: cn(styles.root, isUploading && styles.rootDisabled), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          styles.zone,
          (isDragActive || isPressed) && styles.zoneActive,
          isUploading && styles.zoneUploading,
          hasError && styles.zoneError
        ),
        onClick: openFilePicker,
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onKeyDown: handleKeyDown,
        onMouseDown: () => setIsPressed(true),
        onMouseUp: () => setIsPressed(false),
        onMouseLeave: () => setIsPressed(false),
        role: "button",
        tabIndex: isUploading ? -1 : 0,
        "aria-label": "Загрузка фотографии",
        "aria-disabled": isUploading,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              id: inputId,
              className: styles.hiddenInput,
              type: "file",
              accept: acceptValue,
              onChange: handleInputChange
            }
          ),
          hasImage && !hasError && !isUploading ? /* @__PURE__ */ jsx(
            "img",
            {
              src: imgUri,
              alt: "Загруженное фото",
              className: styles.image
            }
          ) : null,
          !hasImage && !hasError && !isUploading ? /* @__PURE__ */ jsxs(
            "span",
            {
              className: styles.plusIcon,
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsx("span", { className: styles.plusLineHorizontal }),
                /* @__PURE__ */ jsx("span", { className: styles.plusLineVertical })
              ]
            }
          ) : null,
          isUploading ? /* @__PURE__ */ jsx("span", { className: styles.statusText, children: "Загрузка..." }) : null,
          hasError ? /* @__PURE__ */ jsxs("span", { className: styles.statusText, children: [
            "Ошибка",
            /* @__PURE__ */ jsx("br", {}),
            "загрузки"
          ] }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: styles.content, children: [
      hasError ? /* @__PURE__ */ jsx("p", { className: styles.errorMessage, children: "Не удалось загрузить фото. Проверьте формат и размер файла." }) : null,
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: styles.action,
          onClick: openFilePicker,
          disabled: isUploading,
          children: hasImage ? "Изменить фото" : "Загрузить фото"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: styles.description, children: "Фото анфас, без головных уборов и тёмных очков. Формат: JPG или PNG, до 5 МБ" })
    ] })
  ] });
}

function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  icon,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        icon ? /* @__PURE__ */ jsx(Select$1.Icon, { asChild: true, children: icon }) : /* @__PURE__ */ jsx(Select$1.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "pointer-events-none size-4 text-muted-foreground" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Portal, { children: /* @__PURE__ */ jsxs(
    Select$1.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": position === "item-aligned",
      className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          Select$1.Viewport,
          {
            "data-slot": "select-viewport",
            "data-position": position,
            className: cn(
              "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
              position === "popper" && ""
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(Select$1.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "pointer-events-none" }) }) }),
        /* @__PURE__ */ jsx(Select$1.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ChevronUpIcon,
        {}
      )
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ChevronDownIcon,
        {}
      )
    }
  );
}

const countries = [
  "Абхазия",
  "Австралия",
  "Австрия",
  "Азербайджан",
  "Албания",
  "Алжир",
  "Ангола",
  "Андорра",
  "Антигуа и Барбуда",
  "Аргентина",
  "Армения",
  "Афганистан",
  "Багамы",
  "Бангладеш",
  "Барбадос",
  "Бахрейн",
  "Беларусь",
  "Белиз",
  "Бельгия",
  "Бенин",
  "Болгария",
  "Боливия",
  "Босния и Герцеговина",
  "Ботсвана",
  "Бразилия",
  "Бруней",
  "Буркина-Фасо",
  "Бурунди",
  "Бутан",
  "Вануату",
  "Ватикан",
  "Великобритания",
  "Венгрия",
  "Венесуэла",
  "Восточный Тимор",
  "Вьетнам",
  "Габон",
  "Гаити",
  "Гайана",
  "Гамбия",
  "Гана",
  "Гватемала",
  "Гвинея",
  "Гвинея-Бисау",
  "Германия",
  "Гондурас",
  "Гренада",
  "Греция",
  "Грузия",
  "Дания",
  "Джибути",
  "Доминика",
  "Доминиканская Республика",
  "Донецкая Народная Республика",
  "Египет",
  "Замбия",
  "Зимбабве",
  "Израиль",
  "Индия",
  "Индонезия",
  "Иордания",
  "Ирак",
  "Иран",
  "Ирландия",
  "Исландия",
  "Испания",
  "Италия",
  "Йемен",
  "Кабо-Верде",
  "Казахстан",
  "Камбоджа",
  "Камерун",
  "Канада",
  "Катар",
  "Кения",
  "Кипр",
  "Киргизия",
  "Кирибати",
  "Китай",
  "Колумбия",
  "Коморы",
  "Конго",
  "Конго (ДРК)",
  "Коста-Рика",
  "Кот-д’Ивуар",
  "Куба",
  "Кувейт",
  "Лаос",
  "Латвия",
  "Лесото",
  "Либерия",
  "Ливан",
  "Ливия",
  "Литва",
  "Лихтенштейн",
  "Люксембург",
  "Луганская Народная Республика",
  "Маврикий",
  "Мавритания",
  "Мадагаскар",
  "Малави",
  "Малайзия",
  "Мали",
  "Мальдивы",
  "Мальта",
  "Марокко",
  "Маршалловы Острова",
  "Мексика",
  "Мозамбик",
  "Молдавия",
  "Монако",
  "Монголия",
  "Мьянма",
  "Намибия",
  "Науру",
  "Непал",
  "Нигер",
  "Нигерия",
  "Нидерланды",
  "Никарагуа",
  "Новая Зеландия",
  "Норвегия",
  "Объединенные Арабские Эмираты",
  "Оман",
  "Пакистан",
  "Палау",
  "Панама",
  "Папуа — Новая Гвинея",
  "Парагвай",
  "Перу",
  "Польша",
  "Португалия",
  "Россия",
  "Руанда",
  "Румыния",
  "Сальвадор",
  "Самоа",
  "Сан-Марино",
  "Сан-Томе и Принсипи",
  "Саудовская Аравия",
  "Северная Корея",
  "Северная Македония",
  "Сейшелы",
  "Сенегал",
  "Сент-Винсент и Гренадины",
  "Сент-Китс и Невис",
  "Сент-Люсия",
  "Сербия",
  "Сингапур",
  "Сирия",
  "Словакия",
  "Словения",
  "Соломоновы Острова",
  "Сомали",
  "Судан",
  "Суринам",
  "США",
  "Сьерра-Леоне",
  "Таджикистан",
  "Таиланд",
  "Танзания",
  "Того",
  "Тонга",
  "Тринидад и Тобаго",
  "Тувалу",
  "Тунис",
  "Туркменистан",
  "Турция",
  "Уганда",
  "Узбекистан",
  "Украина",
  "Уругвай",
  "Фиджи",
  "Филиппины",
  "Финляндия",
  "Франция",
  "Хорватия",
  "Центральноафриканская Республика",
  "Чад",
  "Черногория",
  "Чехия",
  "Чили",
  "Швейцария",
  "Швеция",
  "Шри-Ланка",
  "Эквадор",
  "Экваториальная Гвинея",
  "Эритрея",
  "Эсватини",
  "Эстония",
  "Эфиопия",
  "Южная Корея",
  "Южный Судан",
  "Ямайка",
  "Япония"
];

function ParticipantSuccessMessage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-[420px] flex items-start justify-center text-center pt-[40px]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[700px]", children: [
    /* @__PURE__ */ jsx("h2", { className: "!text-[42px] !leading-[1.1] max-[700px]:!text-[28px]", children: "Заявка отправлена" }),
    /* @__PURE__ */ jsx("div", { className: "mt-[18px] text-[24px] leading-[1.4] text-[#152551] max-[700px]:text-[18px]", children: "Спасибо. Мы получили вашу заявку и свяжемся с вами после проверки данных и документов." })
  ] }) });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LONG_LIMIT = 2e3;
const SHORT_LIMIT = 1e3;
const LONG_HELPER_TEXT = "Рекомендуемый объём: 1000–2000 символов (до 2000 максимум)";
const SHORT_HELPER_TEXT = "Рекомендуемый объём: 500–1000 символов (до 1000 максимум)";
const LINK_GROUP_LIMIT = 3;
const REQUEST_STATUS_DRAFT = "1";
const REQUEST_STATUS_SUBMITTED = "2";
const PARTICIPATION_VARIANTS = ["Физическое лицо", "Юридическое лицо", "Творческий коллектив"];
const GENDER_VARIANTS = ["Женский", "Мужской"];
const PARTICIPATION_TYPES_WITH_ENTITY = /* @__PURE__ */ new Set(["Юридическое лицо", "Творческий коллектив"]);
const H2_STYLE = cn("text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]", "mb-[24px]");
const SELECT_TRIGGER_CLASSNAME = cn("group mt-[14px] mb-[22px] flex h-auto! w-full! justify-between gap-4 rounded-none border-0 border-b border-[#dcdcdc] bg-transparent px-[20px] pb-[8px] pt-[14px] text-left shadow-none ring-0", "focus-visible:border-[#152551] focus-visible:ring-0", "data-[state=open]:border-[#152551]", "max-[768px]:px-[14px]", "[&>span[data-slot=select-value]]:block [&>span[data-slot=select-value]]:min-w-0 [&>span[data-slot=select-value]]:flex-1 [&>span[data-slot=select-value]]:truncate", "[&>span[data-slot=select-value]]:text-[22px] [&>span[data-slot=select-value]]:font-light [&>span[data-slot=select-value]]:leading-[1.2]", "[&>span[data-slot=select-value]]:text-[#152551] data-[placeholder]:[&>span[data-slot=select-value]]:text-[#a0a0a0]", "max-[1200px]:[&>span[data-slot=select-value]]:text-[18px] max-[768px]:[&>span[data-slot=select-value]]:text-[16px]");
const SELECT_CONTENT_CLASSNAME = cn("select-accent-scrollbar z-50 h-[400px] w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] overflow-hidden rounded-[16px] border-0 bg-white p-0 shadow-[0_26px_70px_rgba(21,37,81,0.14)] ring-0", "max-[1200px]:h-[360px] max-[768px]:h-[320px] max-[768px]:rounded-[12px]", "[&_[data-slot=select-viewport]]:h-full [&_[data-slot=select-viewport]]:w-full [&_[data-slot=select-viewport]]:min-w-0! [&_[data-slot=select-viewport]]:p-[8px]", "max-[768px]:[&_[data-slot=select-viewport]]:p-[6px]", "[&_[data-slot=select-scroll-down-button]]:bg-white [&_[data-slot=select-scroll-up-button]]:bg-white", "[&_[data-slot=select-scroll-down-button]]:text-accent [&_[data-slot=select-scroll-up-button]]:text-accent");
const SELECT_ITEM_CLASSNAME = cn("min-h-0 rounded-[10px] px-[24px] py-[10px] text-left text-[22px] font-normal leading-[1.25] text-[#949494] outline-none", "focus:bg-[#F5F5F5] focus:text-accent data-[state=checked]:text-accent", "max-[1200px]:text-[18px] max-[768px]:px-[16px] max-[768px]:py-[8px] max-[768px]:text-[16px]", "[&_[data-slot=select-item-indicator]]:hidden");
const DEFAULT_VALUES = {
  nominationId: "",
  applicantLastName: "",
  applicantFirstName: "",
  applicantPatronymic: "",
  applicantNoPatronymic: false,
  applicantEmail: "",
  applicantPhone: "",
  applicantPhoneConfirmed: false,
  applicantActsForAnotherPerson: false,
  nomineeLastName: "",
  nomineeFirstName: "",
  nomineePatronymic: "",
  nomineeNoPatronymic: false,
  nomineeCountry: "",
  nomineeLocality: "",
  nomineeCitizenship: "",
  nomineeBirthDate: "",
  nomineeGender: "",
  nomineePhotoFile: null,
  nomineePhotoUri: void 0,
  participationType: "",
  participationEntityName: "",
  projectName: "",
  projectDescription: "",
  projectAudience: "",
  projectUniqueness: "",
  projectSocialImpact: "",
  projectGoals: "",
  projectSupport: "",
  projectResources: "",
  socialLinks: [""],
  videoLinks: [""],
  mediaLinks: [""],
  additionalFiles: [],
  personalDataConsentFiles: [],
  photoVideoConsentFiles: [],
  adultPersonalDataConsentAccepted: false,
  adultPhotoVideoConsentAccepted: false
};
function getSuccessfulDropZoneFiles(files) {
  return files.filter((file) => file.status === "success" && file.file instanceof File).map((file) => file.file);
}
function formatExistingFileSize(size) {
  if (size === null || Number.isNaN(size)) {
    return "";
  }
  const sizeMb = size / (1024 * 1024);
  return `${sizeMb.toFixed(sizeMb >= 1 ? 1 : 2)} МБ`;
}
function normalizeTextValue(value, allowEmpty) {
  const normalizedValue = value.trim();
  if (!normalizedValue && allowEmpty) {
    return void 0;
  }
  return normalizedValue;
}
function getDictionaryDisplayValue(value) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "object" && value !== null) {
    const candidate = "name" in value ? value.name : "title" in value ? value.title : "code" in value ? value.code : null;
    return typeof candidate === "string" ? candidate.trim() : "";
  }
  return "";
}
function getNominationIdValue(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }
  if (typeof value === "object" && value !== null && "id" in value) {
    const candidate = value.id;
    return candidate === void 0 || candidate === null ? "" : String(candidate).trim();
  }
  return "";
}
function getStringValue(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }
  return "";
}
function resolveApiFileUrl(path) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function normalizeExistingFile(value) {
  if (!value || typeof value !== "object") {
    return null;
  }
  const name = "name" in value && typeof value.name === "string" ? value.name.trim() : "";
  const src = "src" in value && typeof value.src === "string" ? value.src.trim() : "";
  const size = "size" in value && typeof value.size === "number" ? value.size : null;
  if (!name || !src) {
    return null;
  }
  return {
    name,
    size,
    url: resolveApiFileUrl(src)
  };
}
function normalizeExistingFiles(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeExistingFile).filter((item) => item !== null);
  }
  const singleFile = normalizeExistingFile(value);
  return singleFile ? [singleFile] : [];
}
function createInitialLinkGroup(value) {
  if (!Array.isArray(value)) {
    return [""];
  }
  const links = value.filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  return links.length > 0 ? links : [""];
}
function parseIsoDateValue(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.getUTCFullYear() !== year || parsedDate.getUTCMonth() !== month - 1 || parsedDate.getUTCDate() !== day) {
    return null;
  }
  return { year, month, day };
}
function getCurrentDateInMoscow() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(/* @__PURE__ */ new Date());
  const year = Number(parts.find((part) => part.type === "year")?.value ?? "");
  const month = Number(parts.find((part) => part.type === "month")?.value ?? "");
  const day = Number(parts.find((part) => part.type === "day")?.value ?? "");
  return { year, month, day };
}
function hasReachedAgeInMoscow(birthDateValue, age) {
  const birthDate = parseIsoDateValue(birthDateValue);
  if (!birthDate) {
    return false;
  }
  const currentDate = getCurrentDateInMoscow();
  const ageDiff = currentDate.year - birthDate.year;
  if (ageDiff > age) {
    return true;
  }
  if (ageDiff < age) {
    return false;
  }
  if (currentDate.month > birthDate.month) {
    return true;
  }
  if (currentDate.month < birthDate.month) {
    return false;
  }
  return currentDate.day >= birthDate.day;
}
function mapRequestToFormValues(request, fallbackNominationId) {
  const nominationId = getNominationIdValue(request.nomination) || fallbackNominationId;
  const applicantSecondName = typeof request.applicant_second_name === "string" ? request.applicant_second_name : "";
  const nominantSecondName = typeof request.nominant_second_name === "string" ? request.nominant_second_name : "";
  const nominantPhoto = normalizeExistingFile(request.nominant_photo);
  return {
    nominationId,
    applicantLastName: typeof request.applicant_last_name === "string" ? request.applicant_last_name : "",
    applicantFirstName: typeof request.applicant_name === "string" ? request.applicant_name : "",
    applicantPatronymic: applicantSecondName,
    applicantNoPatronymic: !applicantSecondName.trim(),
    applicantEmail: typeof request.applicant_email === "string" ? request.applicant_email : "",
    applicantPhone: getStringValue(request.applicant_phone),
    applicantPhoneConfirmed: Boolean(request.applicant_phone_confirmed),
    applicantActsForAnotherPerson: Boolean(request.submitted_on_behalf_of_another_person),
    nomineeLastName: typeof request.nominant_last_name === "string" ? request.nominant_last_name : "",
    nomineeFirstName: typeof request.nominant_name === "string" ? request.nominant_name : "",
    nomineePatronymic: nominantSecondName,
    nomineeNoPatronymic: !nominantSecondName.trim(),
    nomineeCountry: getDictionaryDisplayValue(request.nominant_country),
    nomineeLocality: typeof request.nominant_settlement === "string" ? request.nominant_settlement : "",
    nomineeCitizenship: getDictionaryDisplayValue(request.nominant_citizenship),
    nomineeBirthDate: typeof request.nominant_birthdate === "string" ? request.nominant_birthdate : "",
    nomineeGender: getDictionaryDisplayValue(request.nominant_sex),
    nomineePhotoFile: null,
    nomineePhotoUri: nominantPhoto?.url,
    participationType: getDictionaryDisplayValue(request.form_participation),
    participationEntityName: typeof request.legal_name === "string" ? request.legal_name : "",
    projectName: typeof request.project_name === "string" ? request.project_name : "",
    projectDescription: typeof request.project_description === "string" ? request.project_description : "",
    projectAudience: typeof request.project_audience === "string" ? request.project_audience : "",
    projectUniqueness: typeof request.project_growth_uniqueness === "string" ? request.project_growth_uniqueness : "",
    projectSocialImpact: typeof request.project_growth_significance === "string" ? request.project_growth_significance : "",
    projectGoals: typeof request.project_growth_goals === "string" ? request.project_growth_goals : "",
    projectSupport: typeof request.project_growth_support === "string" ? request.project_growth_support : "",
    projectResources: typeof request.project_growth_resources === "string" ? request.project_growth_resources : "",
    socialLinks: createInitialLinkGroup(request.additional_links_social),
    videoLinks: createInitialLinkGroup(request.additional_links_video),
    mediaLinks: createInitialLinkGroup(request.additional_links_media),
    additionalFiles: [],
    personalDataConsentFiles: [],
    photoVideoConsentFiles: [],
    adultPersonalDataConsentAccepted: false,
    adultPhotoVideoConsentAccepted: false
  };
}
function buildParticipantRequestPayload(values, status) {
  const isDraft = status === REQUEST_STATUS_DRAFT;
  const allowEmpty = isDraft;
  return {
    nomination: values.nominationId,
    status,
    applicant_name: normalizeTextValue(values.applicantFirstName, allowEmpty),
    applicant_last_name: normalizeTextValue(values.applicantLastName, allowEmpty),
    applicant_second_name: values.applicantNoPatronymic ? isDraft ? void 0 : null : normalizeTextValue(values.applicantPatronymic, allowEmpty),
    applicant_email: normalizeTextValue(values.applicantEmail, allowEmpty),
    applicant_phone: normalizeTextValue(values.applicantPhone, allowEmpty),
    applicant_phone_confirmation_session: null,
    submitted_on_behalf_of_another_person: values.applicantActsForAnotherPerson,
    nominant_name: normalizeTextValue(values.nomineeFirstName, allowEmpty),
    nominant_last_name: normalizeTextValue(values.nomineeLastName, allowEmpty),
    nominant_second_name: values.nomineeNoPatronymic ? isDraft ? void 0 : null : normalizeTextValue(values.nomineePatronymic, allowEmpty),
    nominant_country: normalizeTextValue(values.nomineeCountry, allowEmpty),
    nominant_settlement: normalizeTextValue(values.nomineeLocality, allowEmpty),
    nominant_citizenship: normalizeTextValue(values.nomineeCitizenship, allowEmpty),
    nominant_birthdate: normalizeTextValue(values.nomineeBirthDate, allowEmpty),
    nominant_sex: normalizeTextValue(values.nomineeGender, allowEmpty),
    form_participation: normalizeTextValue(values.participationType, allowEmpty),
    legal_name: PARTICIPATION_TYPES_WITH_ENTITY.has(values.participationType) ? normalizeTextValue(values.participationEntityName, allowEmpty) : isDraft ? void 0 : null,
    project_name: normalizeTextValue(values.projectName, allowEmpty),
    project_description: normalizeTextValue(values.projectDescription, allowEmpty),
    project_audience: normalizeTextValue(values.projectAudience, allowEmpty),
    project_growth_uniqueness: normalizeTextValue(values.projectUniqueness, allowEmpty),
    project_growth_significance: normalizeTextValue(values.projectSocialImpact, allowEmpty),
    project_growth_goals: normalizeTextValue(values.projectGoals, allowEmpty),
    project_growth_support: normalizeTextValue(values.projectSupport, allowEmpty),
    project_growth_resources: normalizeTextValue(values.projectResources, allowEmpty),
    additional_links_social: values.socialLinks.map((link) => link.trim()).filter(Boolean),
    additional_links_video: values.videoLinks.map((link) => link.trim()).filter(Boolean),
    additional_links_media: values.mediaLinks.map((link) => link.trim()).filter(Boolean),
    documents_agreement: isDraft ? void 0 : true,
    nominant_photo: values.nomineePhotoFile,
    additional_documents: getSuccessfulDropZoneFiles(values.additionalFiles),
    documents_scan_pd: getSuccessfulDropZoneFiles(values.personalDataConsentFiles)[0] ?? null,
    documents_scan_photo_video: getSuccessfulDropZoneFiles(values.photoVideoConsentFiles)[0] ?? null
  };
}
const ParticipantForm = memo(function ParticipantForm2({ initialNominationId, nominationName, requestId, initialRequest }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVariant, setSuccessVariant] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef(null);
  const initialValues = useMemo(
    () => initialRequest ? mapRequestToFormValues(initialRequest, initialNominationId) : {
      ...DEFAULT_VALUES,
      nominationId: initialNominationId
    },
    [initialNominationId, initialRequest]
  );
  const existingAdditionalFiles = useMemo(() => normalizeExistingFiles(initialRequest?.additional_documents), [initialRequest]);
  const existingPersonalDataConsentFiles = useMemo(() => normalizeExistingFiles(initialRequest?.documents_scan_pd), [initialRequest]);
  const existingPhotoVideoConsentFiles = useMemo(() => normalizeExistingFiles(initialRequest?.documents_scan_photo_video), [initialRequest]);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    clearErrors,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues
  });
  const { onChange: applicantEmailOnChange, ...applicantEmailFieldProps } = register("applicantEmail", {
    required: "Введите корректный email",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Введите корректный email"
    }
  });
  const applicantNoPatronymic = useWatch({ control, name: "applicantNoPatronymic" });
  const applicantActsForAnotherPerson = useWatch({ control, name: "applicantActsForAnotherPerson" });
  const nomineeNoPatronymic = useWatch({ control, name: "nomineeNoPatronymic" });
  const nomineeBirthDate = useWatch({ control, name: "nomineeBirthDate" });
  const applicantPhoneConfirmed = useWatch({ control, name: "applicantPhoneConfirmed" });
  const participationType = useWatch({ control, name: "participationType" });
  useWatch({ control, name: "nomineePhotoFile" });
  const nomineePhotoUri = useWatch({ control, name: "nomineePhotoUri" });
  const socialLinks = useWatch({ control, name: "socialLinks" }) ?? DEFAULT_VALUES.socialLinks;
  const videoLinks = useWatch({ control, name: "videoLinks" }) ?? DEFAULT_VALUES.videoLinks;
  const mediaLinks = useWatch({ control, name: "mediaLinks" }) ?? DEFAULT_VALUES.mediaLinks;
  useWatch({ control, name: "additionalFiles" }) ?? DEFAULT_VALUES.additionalFiles;
  useWatch({ control, name: "personalDataConsentFiles" }) ?? DEFAULT_VALUES.personalDataConsentFiles;
  useWatch({ control, name: "photoVideoConsentFiles" }) ?? DEFAULT_VALUES.photoVideoConsentFiles;
  const showParticipationEntityName = PARTICIPATION_TYPES_WITH_ENTITY.has(participationType);
  const isNomineeAdult = useMemo(() => hasReachedAgeInMoscow(nomineeBirthDate ?? "", 18), [nomineeBirthDate]);
  const showDocumentsAndConsents = !isNomineeAdult || applicantActsForAnotherPerson;
  const showAdultSelfConsentCheckboxes = isNomineeAdult && !applicantActsForAnotherPerson;
  const personalDataConsentHref = useMemo(() => encodeURI(isNomineeAdult ? "/docs/Соглашение ПД.docx" : "/docs/СОГЛАСИЕ ПД несовершеннолетних.docx"), [isNomineeAdult]);
  const photoVideoConsentHref = useMemo(() => encodeURI(isNomineeAdult ? "/docs/Соглашение_на_использование_аудио_визуальных_материалов.docx" : "/docs/СОГЛАШЕНИЕ_НА_фотовидео_несовершеннолетних.docx"), [isNomineeAdult]);
  useEffect(() => {
    reset(initialValues);
    setSuccessVariant(null);
    setIsSubmitting(false);
    setSubmitError("");
  }, [initialValues, reset]);
  useEffect(() => {
    if (applicantNoPatronymic) {
      clearErrors("applicantPatronymic");
      void trigger("applicantPatronymic");
    }
  }, [applicantNoPatronymic, clearErrors, trigger]);
  useEffect(() => {
    if (nomineeNoPatronymic) {
      clearErrors("nomineePatronymic");
      void trigger("nomineePatronymic");
    }
  }, [nomineeNoPatronymic, clearErrors, trigger]);
  useEffect(() => {
    if (!showParticipationEntityName) {
      setValue("participationEntityName", "", { shouldDirty: true, shouldValidate: true });
      clearErrors("participationEntityName");
      return;
    }
    void trigger("participationEntityName");
  }, [showParticipationEntityName, setValue, clearErrors, trigger]);
  useEffect(() => {
    if (showAdultSelfConsentCheckboxes) {
      return;
    }
    clearErrors(["adultPersonalDataConsentAccepted", "adultPhotoVideoConsentAccepted"]);
  }, [showAdultSelfConsentCheckboxes, clearErrors]);
  useEffect(() => {
    if (!successVariant) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [successVariant]);
  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement) {
      return;
    }
    const cleanups = [];
    const syncScrollbar = (textarea, wrapper, track, thumb) => {
      const hasOverflow = textarea.scrollHeight > textarea.clientHeight + 1;
      wrapper.dataset.hasOverflow = hasOverflow ? "true" : "false";
      if (!hasOverflow) {
        thumb.style.height = "0px";
        thumb.style.transform = "translateY(0)";
        return;
      }
      const trackHeight = track.clientHeight;
      const thumbHeight = Math.max(textarea.clientHeight / textarea.scrollHeight * trackHeight, 48);
      const maxThumbOffset = trackHeight - thumbHeight;
      const maxScrollOffset = textarea.scrollHeight - textarea.clientHeight;
      const thumbOffset = maxScrollOffset > 0 ? textarea.scrollTop / maxScrollOffset * maxThumbOffset : 0;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbOffset}px)`;
    };
    const textareas = formElement.querySelectorAll(".participant-textarea__control");
    textareas.forEach((textarea) => {
      const wrapper = textarea.closest(".participant-textarea-wrap");
      const track = wrapper?.querySelector(".participant-textarea__scrollbar");
      const thumb = wrapper?.querySelector(".participant-textarea__thumb");
      if (!wrapper || !track || !thumb) {
        return;
      }
      const update = () => syncScrollbar(textarea, wrapper, track, thumb);
      const resizeObserver = new ResizeObserver(update);
      update();
      textarea.addEventListener("scroll", update);
      textarea.addEventListener("input", update);
      resizeObserver.observe(textarea);
      cleanups.push(() => {
        textarea.removeEventListener("scroll", update);
        textarea.removeEventListener("input", update);
        resizeObserver.disconnect();
      });
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  const submitDisabled = isSubmitting;
  const addLinkField = (field) => {
    const nextLinks = field === "socialLinks" ? socialLinks : field === "videoLinks" ? videoLinks : mediaLinks;
    if (nextLinks.length >= LINK_GROUP_LIMIT) {
      return;
    }
    setValue(field, [...nextLinks, ""], { shouldDirty: true });
  };
  const updateLinkField = (field, index, nextValue) => {
    const currentLinks = field === "socialLinks" ? socialLinks : field === "videoLinks" ? videoLinks : mediaLinks;
    setValue(
      field,
      currentLinks.map((item, itemIndex) => itemIndex === index ? nextValue : item),
      { shouldDirty: true }
    );
  };
  const onSubmit = handleSubmit(async (currentValues) => {
    if (isSubmitting) {
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);
    const payload = buildParticipantRequestPayload(currentValues, REQUEST_STATUS_SUBMITTED);
    const result = requestId ? await api.requests.update(requestId, payload) : await api.requests.create(payload);
    setIsSubmitting(false);
    if (result.status === "error") {
      setSubmitError(getApiErrorMessage(result.payload, "Не удалось отправить заявку"));
      return;
    }
    if (result.status === "ok") {
      setSuccessVariant("submitted");
    }
  });
  const handleDraftSave = async () => {
    if (isSubmitting) {
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);
    const payload = buildParticipantRequestPayload(getValues(), REQUEST_STATUS_DRAFT);
    const result = requestId ? await api.requests.update(requestId, payload) : await api.requests.create(payload);
    setIsSubmitting(false);
    if (result.status === "error") {
      setSubmitError(getApiErrorMessage(result.payload, "Не удалось сохранить черновик"));
      return;
    }
    setSuccessVariant("draft");
  };
  if (successVariant) {
    const currentValues = getValues();
    const applicantName = currentValues.applicantFirstName.trim() || currentValues.applicantLastName.trim();
    const applicantEmail = currentValues.applicantEmail.trim();
    return /* @__PURE__ */ jsx(ParticipantSuccessMessage, { variant: successVariant, applicantName: applicantName || void 0, applicantEmail: applicantEmail || void 0, nominationName });
  }
  return /* @__PURE__ */ jsxs("form", { ref: formRef, className: `form flex flex-col ${isSubmitting ? "loading" : ""}`, onSubmit, children: [
    /* @__PURE__ */ jsxs("section", { className: "pt-0", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "Данные заявителя" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Фамилия", disabled: isSubmitting, ...register("applicantLastName", { required: "Укажите фамилию" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.applicantLastName ? "" : "hidden"}`, children: errors.applicantLastName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Имя", disabled: isSubmitting, ...register("applicantFirstName", { required: "Укажите имя" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.applicantFirstName ? "" : "hidden"}`, children: errors.applicantFirstName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: applicantNoPatronymic ? "Отчество отсутствует" : "Отчество",
              disabled: applicantNoPatronymic || isSubmitting,
              ...register("applicantPatronymic", {
                validate: (value) => applicantNoPatronymic || value.trim().length > 0 || "Укажите отчество"
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-[14px]", children: /* @__PURE__ */ jsxs("label", { className: "mt-[-24px] mb-[24px] flex flex-row items-center gap-[10px] text-[10px] leading-[10px] text-[#949494]", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", disabled: isSubmitting, ...register("applicantNoPatronymic") }),
            /* @__PURE__ */ jsx("div", { className: "relative top-[2px]", children: "Нет отчества" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.applicantPatronymic ? "" : "hidden"}`, children: errors.applicantPatronymic?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "form-control",
              type: "email",
              placeholder: "Электронная почта",
              disabled: isSubmitting,
              ...applicantEmailFieldProps,
              onChange: async (event) => {
                applicantEmailOnChange(event);
                await trigger("applicantEmail");
              }
            }
          ),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { variant: "error", children: errors.applicantEmail?.message }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "applicantPhone",
              control,
              rules: {
                validate: (value) => {
                  if (!value.trim()) {
                    return true;
                  }
                  if (!isPhoneValid(value)) {
                    return "Введите корректный телефон";
                  }
                  if (!applicantPhoneConfirmed) {
                    return "Подтвердите телефон";
                  }
                  return true;
                }
              },
              render: ({ field }) => /* @__PURE__ */ jsx(
                PhoneWithConfirmation,
                {
                  phone: field.value,
                  setPhone: (nextValue) => {
                    field.onChange(nextValue);
                    setValue("applicantPhoneConfirmed", false, { shouldDirty: true, shouldValidate: true });
                  },
                  isConfirmed: applicantPhoneConfirmed,
                  setConfirmed: (nextValue) => {
                    setValue("applicantPhoneConfirmed", nextValue, { shouldDirty: true, shouldValidate: true });
                    void trigger("applicantPhone");
                  },
                  disabled: isSubmitting
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { variant: "error", children: errors.applicantPhone?.message }) })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "mt-0 flex flex-row items-center gap-[10px] max-[700px]:items-start", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", disabled: isSubmitting, ...register("applicantActsForAnotherPerson") }),
          /* @__PURE__ */ jsx("div", { className: "comment relative top-px", children: "Подаю заявку от лица другого человека" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "pt-[90px] max-[700px]:pt-[72px]", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "Данные номинанта" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[24px] flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Фамилия", disabled: isSubmitting, ...register("nomineeLastName", { required: "Укажите фамилию номинанта" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeLastName ? "" : "hidden"}`, children: errors.nomineeLastName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Имя", disabled: isSubmitting, ...register("nomineeFirstName", { required: "Укажите имя номинанта" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeFirstName ? "" : "hidden"}`, children: errors.nomineeFirstName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: nomineeNoPatronymic ? "Отчество отсутствует" : "Отчество",
              disabled: nomineeNoPatronymic || isSubmitting,
              ...register("nomineePatronymic", {
                validate: (value) => nomineeNoPatronymic || value.trim().length > 0 || "Укажите отчество номинанта"
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-[14px]", children: /* @__PURE__ */ jsxs("label", { className: "mt-[-24px] mb-[24px] flex flex-row items-center gap-[10px] text-[10px] leading-[10px] text-[#949494]", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", disabled: isSubmitting, ...register("nomineeNoPatronymic") }),
            /* @__PURE__ */ jsx("div", { className: "relative top-[2px]", children: "Нет отчества" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineePatronymic ? "" : "hidden"}`, children: errors.nomineePatronymic?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "nomineeCountry",
              control,
              rules: { required: "Выберите страну" },
              render: ({ field }) => /* @__PURE__ */ jsxs(Select, { value: field.value || void 0, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(
                  SelectTrigger,
                  {
                    className: SELECT_TRIGGER_CLASSNAME,
                    icon: /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]", children: /* @__PURE__ */ jsx(ChevronIcon, { className: "transition-transform duration-200 group-data-[state=open]:rotate-180" }) }),
                    children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Страна" })
                  }
                ),
                /* @__PURE__ */ jsx(SelectContent, { position: "popper", side: "bottom", align: "start", sideOffset: -8, className: SELECT_CONTENT_CLASSNAME, children: countries.map((variant) => /* @__PURE__ */ jsx(SelectItem, { value: variant, className: SELECT_ITEM_CLASSNAME, children: variant }, variant)) })
              ] })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeCountry ? "" : "hidden"}`, children: errors.nomineeCountry?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Населенный пункт", disabled: isSubmitting, ...register("nomineeLocality", { required: "Укажите населенный пункт" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeLocality ? "" : "hidden"}`, children: errors.nomineeLocality?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "nomineeCitizenship",
              control,
              rules: { required: "Укажите гражданство" },
              render: ({ field }) => /* @__PURE__ */ jsxs(Select, { value: field.value || void 0, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(
                  SelectTrigger,
                  {
                    className: SELECT_TRIGGER_CLASSNAME,
                    icon: /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]", children: /* @__PURE__ */ jsx(ChevronIcon, { className: "transition-transform duration-200 group-data-[state=open]:rotate-180" }) }),
                    children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Гражданство" })
                  }
                ),
                /* @__PURE__ */ jsx(SelectContent, { position: "popper", side: "bottom", align: "start", sideOffset: -8, className: SELECT_CONTENT_CLASSNAME, children: countries.map((variant) => /* @__PURE__ */ jsx(SelectItem, { value: variant, className: SELECT_ITEM_CLASSNAME, children: variant }, variant)) })
              ] })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeCitizenship ? "" : "hidden"}`, children: errors.nomineeCitizenship?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(Controller, { name: "nomineeBirthDate", control, rules: { required: "Укажите дату рождения" }, render: ({ field }) => /* @__PURE__ */ jsx(DatePicker, { date: field.value, setDate: (value) => field.onChange(value), placeholder: "Дата рождения" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeBirthDate ? "" : "hidden"}`, children: errors.nomineeBirthDate?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "nomineeGender",
              control,
              rules: { required: "Укажите пол" },
              render: ({ field }) => /* @__PURE__ */ jsxs(Select, { value: field.value || void 0, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(
                  SelectTrigger,
                  {
                    className: SELECT_TRIGGER_CLASSNAME,
                    icon: /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]", children: /* @__PURE__ */ jsx(ChevronIcon, { className: "transition-transform duration-200 group-data-[state=open]:rotate-180" }) }),
                    children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Пол" })
                  }
                ),
                /* @__PURE__ */ jsx(SelectContent, { position: "popper", side: "bottom", align: "start", sideOffset: -8, className: SELECT_CONTENT_CLASSNAME, children: GENDER_VARIANTS.map((variant) => /* @__PURE__ */ jsx(SelectItem, { value: variant, className: SELECT_ITEM_CLASSNAME, children: variant }, variant)) })
              ] })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.nomineeGender ? "" : "hidden"}`, children: errors.nomineeGender?.message ?? "" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[54px]", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[28px] leading-[1.2] font-regular text-[#152551] max-[1000px]:text-[24px] max-[700px]:text-[20px]", children: "Фото номинанта" }),
        /* @__PURE__ */ jsx("div", { className: "mt-[24px]", children: /* @__PURE__ */ jsx(
          Controller,
          {
            name: "nomineePhotoFile",
            control,
            render: ({ field: fileField }) => /* @__PURE__ */ jsx(
              UploadAvatar,
              {
                imgUri: nomineePhotoUri ?? void 0,
                setImgUri: (nextValue) => {
                  const resolvedValue = typeof nextValue === "function" ? nextValue(nomineePhotoUri ?? void 0) : nextValue;
                  setValue("nomineePhotoUri", resolvedValue, { shouldDirty: true });
                },
                onFileChange: (file) => {
                  fileField.onChange(file);
                  void trigger("nomineePhotoFile");
                }
              }
            )
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "pt-[90px] max-[700px]:pt-[72px]", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "Форма участия" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "participationType",
              control,
              rules: { required: "Выберите вариант участия" },
              render: ({ field }) => /* @__PURE__ */ jsxs(Select, { value: field.value || void 0, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(
                  SelectTrigger,
                  {
                    className: SELECT_TRIGGER_CLASSNAME,
                    icon: /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]", children: /* @__PURE__ */ jsx(ChevronIcon, { className: "transition-transform duration-200 group-data-[state=open]:rotate-180" }) }),
                    children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Выберите вариант" })
                  }
                ),
                /* @__PURE__ */ jsx(SelectContent, { position: "popper", side: "bottom", align: "start", sideOffset: -8, className: SELECT_CONTENT_CLASSNAME, children: PARTICIPATION_VARIANTS.map((variant) => /* @__PURE__ */ jsx(SelectItem, { value: variant, className: SELECT_ITEM_CLASSNAME, children: variant }, variant)) })
              ] })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.participationType ? "" : "hidden"}`, children: errors.participationType?.message ?? "" })
        ] }),
        showParticipationEntityName ? /* @__PURE__ */ jsxs("div", { className: "relative mt-[18px] flex flex-col", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: participationType === "Творческий коллектив" ? "Название коллектива" : "Юридическое название организации",
              disabled: isSubmitting,
              ...register("participationEntityName", {
                validate: (value) => !showParticipationEntityName || value.trim().length > 0 || "Укажите название организации или коллектива"
              })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.participationEntityName ? "" : "hidden"}`, children: errors.participationEntityName?.message ?? "" })
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "pt-[90px] max-[700px]:pt-[72px]", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "О проекте" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Название проекта", disabled: isSubmitting, ...register("projectName", { required: "Укажите название проекта" }) }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectName ? "" : "hidden"}`, children: errors.projectName?.message ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[24px] flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "compact participant-textarea__control",
                placeholder: "Описание проекта\nЧто это за проект, зачем он создан и где сейчас находится",
                rows: 8,
                maxLength: LONG_LIMIT,
                disabled: isSubmitting,
                ...register("projectDescription", { required: "Опишите проект" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectDescription ? "" : "hidden"}`, children: errors.projectDescription?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: LONG_HELPER_TEXT }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx("textarea", { className: "compact participant-textarea__control", placeholder: "Кто ваша аудитория, её размер и география", rows: 8, maxLength: SHORT_LIMIT, disabled: isSubmitting, ...register("projectAudience", { required: "Опишите аудиторию проекта" }) }),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectAudience ? "" : "hidden"}`, children: errors.projectAudience?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: SHORT_HELPER_TEXT }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "pt-[90px] max-[700px]:pt-[72px]", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "Развитие проекта" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col first:mt-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx("textarea", { className: "compact participant-textarea__control", placeholder: "В чем уникальность проекта? Что вы делаете иначе, чем другие?", rows: 8, maxLength: LONG_LIMIT, disabled: isSubmitting, ...register("projectUniqueness", { required: "Опишите уникальность проекта" }) }),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectUniqueness ? "" : "hidden"}`, children: errors.projectUniqueness?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: LONG_HELPER_TEXT }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col first:mt-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx("textarea", { className: "compact participant-textarea__control", placeholder: "В чем социальная значимость проекта? Как меняется общество с вашей помощью?", rows: 8, maxLength: LONG_LIMIT, disabled: isSubmitting, ...register("projectSocialImpact", { required: "Опишите социальную значимость проекта" }) }),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectSocialImpact ? "" : "hidden"}`, children: errors.projectSocialImpact?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: LONG_HELPER_TEXT }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col first:mt-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx("textarea", { className: "compact participant-textarea__control", placeholder: "Какие у проекта новые цели, вызовы, ожидаемые достижения?", rows: 8, maxLength: SHORT_LIMIT, disabled: isSubmitting, ...register("projectGoals", { required: "Опишите цели проекта" }) }),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectGoals ? "" : "hidden"}`, children: errors.projectGoals?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: SHORT_HELPER_TEXT }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col first:mt-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx("textarea", { className: "compact participant-textarea__control", placeholder: "С чьей помощью или поддержкой реализуется проект? Лидеры мнений, меценаты, органы власти, общественные организации? Кто именно", rows: 8, maxLength: SHORT_LIMIT, disabled: isSubmitting, ...register("projectSupport", { required: "Опишите поддержку проекта" }) }),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectSupport ? "" : "hidden"}`, children: errors.projectSupport?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: SHORT_HELPER_TEXT }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col first:mt-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-textarea-wrap relative", children: [
            /* @__PURE__ */ jsx("textarea", { className: "compact participant-textarea__control", placeholder: "Какие дополнительные ресурсы помогут вам в реализации проекта? Гранты, реклама, административный ресурс и т.д. На сколько проект может стать более масштабным?", rows: 8, maxLength: SHORT_LIMIT, disabled: isSubmitting, ...register("projectResources", { required: "Опишите необходимые ресурсы" }) }),
            /* @__PURE__ */ jsx("div", { className: "participant-textarea__scrollbar", children: /* @__PURE__ */ jsx("div", { className: "participant-textarea__thumb" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `error ${errors.projectResources ? "" : "hidden"}`, children: errors.projectResources?.message ?? "" }),
          /* @__PURE__ */ jsx(FieldMessages, { children: /* @__PURE__ */ jsx(FieldMessage, { children: SHORT_HELPER_TEXT }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "pt-[90px] max-[700px]:pt-[72px]", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "Дополнительная информация" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[34px] flex flex-col gap-[40px]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          socialLinks.map((link, index) => /* @__PURE__ */ jsx("div", { className: "relative flex flex-col", children: /* @__PURE__ */ jsx("input", { type: "url", placeholder: "Ссылка на социальные сети", value: link, disabled: isSubmitting, onChange: (event) => updateLinkField("socialLinks", index, event.target.value) }) }, `socialLinks-${index}`)),
          socialLinks.length < LINK_GROUP_LIMIT ? /* @__PURE__ */ jsx("div", { className: "relative -mt-[12px] cursor-pointer text-[14px]! leading-[14px] font-normal text-[#152551] hover:underline max-[700px]:text-[10px] max-[700px]:leading-[10px]", onClick: () => addLinkField("socialLinks"), children: "+ Добавить ссылку" }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          videoLinks.map((link, index) => /* @__PURE__ */ jsx("div", { className: "relative flex flex-col", children: /* @__PURE__ */ jsx("input", { type: "url", placeholder: "Ссылка на видео", value: link, disabled: isSubmitting, onChange: (event) => updateLinkField("videoLinks", index, event.target.value) }) }, `videoLinks-${index}`)),
          videoLinks.length < LINK_GROUP_LIMIT ? /* @__PURE__ */ jsx("div", { className: "relative -mt-[12px] cursor-pointer text-[14px]! leading-[14px] font-normal text-[#152551] hover:underline max-[700px]:text-[10px] max-[700px]:leading-[10px]", onClick: () => addLinkField("videoLinks"), children: "+ Добавить ссылку" }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          mediaLinks.map((link, index) => /* @__PURE__ */ jsx("div", { className: "relative flex flex-col", children: /* @__PURE__ */ jsx("input", { type: "url", placeholder: "Ссылка на упоминание в СМИ", value: link, disabled: isSubmitting, onChange: (event) => updateLinkField("mediaLinks", index, event.target.value) }) }, `mediaLinks-${index}`)),
          mediaLinks.length < LINK_GROUP_LIMIT ? /* @__PURE__ */ jsx("div", { className: "relative -mt-[12px] cursor-pointer text-[14px]! leading-[14px] font-normal text-[#152551] hover:underline max-[700px]:text-[10px] max-[700px]:leading-[10px]", onClick: () => addLinkField("mediaLinks"), children: "+ Добавить ссылку" }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[72px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-[760px] text-[22px] leading-[1.2] font-normal text-[#152551] max-[1000px]:text-[18px] max-[700px]:text-[16px]", children: [
          "Подтверждающие документы",
          /* @__PURE__ */ jsx("br", {}),
          "Награды, благодарности, опыт"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[16px]", children: [
          existingAdditionalFiles.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mb-[20px] flex flex-col gap-[10px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[14px] leading-[20px] text-[#152551]/70", children: "Уже загруженные документы" }),
            existingAdditionalFiles.map((file) => /* @__PURE__ */ jsxs("a", { href: file.url, target: "_blank", rel: "noreferrer", className: "text-[14px] leading-[20px] text-[#152551] underline hover:no-underline", children: [
              file.name,
              file.size !== null ? ` (${formatExistingFileSize(file.size)})` : ""
            ] }, file.url))
          ] }) : null,
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "additionalFiles",
              control,
              render: ({ field }) => /* @__PURE__ */ jsx(
                DropZone,
                {
                  files: field.value,
                  setFiles: (nextValue) => {
                    const currentFiles = getValues("additionalFiles") ?? [];
                    const resolvedValue = typeof nextValue === "function" ? nextValue(currentFiles) : nextValue;
                    field.onChange(resolvedValue);
                  },
                  maxFiles: 5,
                  maxFileMb: 5
                }
              )
            }
          )
        ] })
      ] })
    ] }),
    showDocumentsAndConsents || showAdultSelfConsentCheckboxes ? /* @__PURE__ */ jsxs("section", { className: "pt-[90px] max-[700px]:pt-[72px]", children: [
      /* @__PURE__ */ jsx("h2", { className: H2_STYLE, children: "Документы и согласия" }),
      showDocumentsAndConsents ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "mt-[22px] max-w-[1020px] text-[22px] leading-[1.35] font-regular text-[#152551] max-[1000px]:text-[18px] max-[700px]:text-[16px]", children: "Скачивайте, подписывайте и загружайте документы, если заявка подаётся от имени несовершеннолетнего, её должен подписать законный представитель — родитель или официальный опекун." }),
        /* @__PURE__ */ jsx("div", { className: "mt-[48px] text-[14px] leading-tight font-regular text-[#152551] max-[1000px]:text-[12px] max-[700px]:mt-[24px] max-[700px]:text-[10px]", children: "Шаг 1. Скачайте документы" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[24px] flex flex-row flex-nowrap gap-[28px]", children: [
          /* @__PURE__ */ jsx("a", { href: personalDataConsentHref, download: true, className: "bg-accent flex items-center justify-center rounded-[12px] p-[10px] text-center text-[14px]! leading-[14px] text-white-text normal-case! hover:opacity-80 max-[700px]:text-[12px]! max-[700px]:leading-[12px]!", children: "Скачать согласие ПД" }),
          /* @__PURE__ */ jsx("a", { href: photoVideoConsentHref, download: true, className: "bg-accent flex items-center justify-center rounded-[12px] p-[10px] text-center text-[14px]! leading-[14px] text-white-text normal-case! hover:opacity-80 max-[700px]:text-[12px]! max-[700px]:leading-[12px]!", children: "Скачать согласие на фото и видео" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-[48px] text-[14px] leading-tight font-regular text-[#152551] max-[1000px]:text-[12px] max-[700px]:mt-[24px] max-[700px]:text-[10px]", children: "Шаг 2. Загрузите подписанные сканы" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[28px]", children: [
          existingPersonalDataConsentFiles.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mb-[20px] flex flex-col gap-[10px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[14px] leading-[20px] text-[#152551]/70", children: "Ранее загруженный скан согласия ПД" }),
            existingPersonalDataConsentFiles.map((file) => /* @__PURE__ */ jsxs("a", { href: file.url, target: "_blank", rel: "noreferrer", className: "text-[14px] leading-[20px] text-[#152551] underline hover:no-underline", children: [
              file.name,
              file.size !== null ? ` (${formatExistingFileSize(file.size)})` : ""
            ] }, file.url))
          ] }) : null,
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "personalDataConsentFiles",
              control,
              render: ({ field }) => /* @__PURE__ */ jsx(
                DropZone,
                {
                  files: field.value,
                  setFiles: (nextValue) => {
                    const currentFiles = getValues("personalDataConsentFiles") ?? [];
                    const resolvedValue = typeof nextValue === "function" ? nextValue(currentFiles) : nextValue;
                    field.onChange(resolvedValue);
                  },
                  maxFiles: 1,
                  maxFileMb: 5,
                  addonText: "Скан согласия ПД"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[14px]", children: [
          existingPhotoVideoConsentFiles.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mb-[20px] flex flex-col gap-[10px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[14px] leading-[20px] text-[#152551]/70", children: "Ранее загруженный скан согласия на фото и видео" }),
            existingPhotoVideoConsentFiles.map((file) => /* @__PURE__ */ jsxs("a", { href: file.url, target: "_blank", rel: "noreferrer", className: "text-[14px] leading-[20px] text-[#152551] underline hover:no-underline", children: [
              file.name,
              file.size !== null ? ` (${formatExistingFileSize(file.size)})` : ""
            ] }, file.url))
          ] }) : null,
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "photoVideoConsentFiles",
              control,
              render: ({ field }) => /* @__PURE__ */ jsx(
                DropZone,
                {
                  files: field.value,
                  setFiles: (nextValue) => {
                    const currentFiles = getValues("photoVideoConsentFiles") ?? [];
                    const resolvedValue = typeof nextValue === "function" ? nextValue(currentFiles) : nextValue;
                    field.onChange(resolvedValue);
                  },
                  maxFiles: 1,
                  maxFileMb: 5,
                  addonText: "Скан согласия на фото и видео"
                }
              )
            }
          )
        ] })
      ] }) : null,
      showAdultSelfConsentCheckboxes ? /* @__PURE__ */ jsxs("div", { className: "mt-[22px] flex max-w-[1020px] flex-col gap-[18px] text-[#152551]", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-[12px] text-[16px] leading-[1.4] max-[700px]:text-[14px]", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              disabled: isSubmitting,
              ...register("adultPersonalDataConsentAccepted", {
                validate: (value) => !showAdultSelfConsentCheckboxes || value || "Подтвердите согласие на обработку персональных данных"
              })
            }
          ),
          /* @__PURE__ */ jsxs("span", { children: [
            "Согласен на обработку персональных данных в соответствии с",
            " ",
            /* @__PURE__ */ jsx("a", { href: "https://premiyaevrazia.su/privacy/", target: "_blank", rel: "noreferrer", className: "underline hover:no-underline", children: "Политикой конфиденциальности" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `error mt-0 ${errors.adultPersonalDataConsentAccepted ? "" : "hidden"}`, children: errors.adultPersonalDataConsentAccepted?.message ?? "" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-[12px] text-[16px] leading-[1.4] max-[700px]:text-[14px]", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              disabled: isSubmitting,
              ...register("adultPhotoVideoConsentAccepted", {
                validate: (value) => !showAdultSelfConsentCheckboxes || value || "Подтвердите согласие на использование аудио-визуальных материалов"
              })
            }
          ),
          /* @__PURE__ */ jsxs("span", { children: [
            "Согласен на использование моих аудио-визуальных материалов в соответствии с",
            " ",
            /* @__PURE__ */ jsx("a", { href: "https://premiyaevrazia.su/agreement/", target: "_blank", rel: "noreferrer", className: "underline hover:no-underline", children: "Соглашением на использование" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `error mt-0 ${errors.adultPhotoVideoConsentAccepted ? "" : "hidden"}`, children: errors.adultPhotoVideoConsentAccepted?.message ?? "" })
      ] }) : null
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-[56px] flex w-full flex-row items-center justify-between gap-x-[60px] gap-y-[24px] pb-[24px] max-[700px]:flex-col max-[700px]:items-start", children: [
      /* @__PURE__ */ jsx("button", { type: "submit", className: `action-btn action-btn-no-hover mt-0! w-[220px]! ${isSubmitting ? "loading" : ""} ${submitDisabled && !isSubmitting ? "disabled" : ""}`, disabled: submitDisabled, children: isSubmitting ? "Отправка..." : "Подать заявку" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full border-0 bg-transparent p-0 text-[20px] max-[1400px]:text-[18px] leading-none font-regular uppercase text-[#c1c1c1] underline cursor-pointer max-[1000px]:text-[18px] max-[700px]:text-[16px]",
          onClick: () => {
            if (submitDisabled) return;
            void handleDraftSave();
          },
          children: isSubmitting ? "Сохранение..." : "Сохранить черновик"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: `error mt-0 ${submitError ? "" : "hidden"}`, children: submitError })
  ] });
});

const prerender = false;
const $$ParticipantForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ParticipantForm;
  const nominationId = getParticipantFormNominationId(Astro2.url.searchParams);
  const requestCookie = Astro2.request.headers.get("cookie") ?? "";
  const serverApi = createServerApi({
    origin: Astro2.url.origin,
    cookieHeader: requestCookie
  });
  const nominationsResult = await serverApi.dictionaries.getNominationsList();
  const statusesResult = await serverApi.dictionaries.getRequestStatusesList();
  findNominationByRouteValue(nominationsResult.payload, nominationId);
  const initialStatus = statusesResult.payload.map(getDictionaryRouteValue).find(Boolean);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="content flex flex-col"> ${renderComponent($$result2, "RegularMenu", $$RegularMenu, { "type": "lightBg" })} <div class="inner-content grid grid-cols-1 items-start justify-start gap-x-[70px] gap-y-[60px] min-[1000px]:grid-cols-2"> <div class="participant-form-page-intro flex flex-col justify-start"> <h1>Форма подачи заявки</h1> <div class="mt-[10px] max-w-[430px]">Пожалуйста полностью заполните профиль участника и данные заявки.</div> <div class="mt-[10px] max-w-[430px]">Указывайте только действительную информацию!</div> <div class="mt-[10px] max-w-[430px] text-[16px] leading-[24px] text-[#152551]/80">
Номинация: name
</div> </div> <div class="w-full min-w-0"> ${renderComponent($$result2, "ParticipantFormComponent", ParticipantForm, { "client:load": true, "initialNominationId": nominationId, "initialStatus": initialStatus, "client:component-hydration": "load", "client:component-path": "@/components/participantForm/ParticipantForm", "client:component-export": "ParticipantForm" })} </div> </div> </section> ` })}`;
}, "/Users/mac/Documents/Work/React/evra2/src/pages/participant-form.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evra2/src/pages/participant-form.astro";
const $$url = "/participant-form/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ParticipantForm,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
