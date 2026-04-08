import { ChevronIcon } from "@/components/shared/customSelect/ChevronIcon";
import { DatePicker } from "@/components/shared/datePicker/DatePicker";
import { DropZone } from "@/components/shared/dropZone/DropZone";
import type { DropZoneFile } from "@/components/shared/dropZone/types";
import { FieldMessage, FieldMessages } from "@/components/shared/form/formPrimitives";
import { PhoneWithConfirmation } from "@/components/shared/phoneWithConfirmation/PhoneWithConfirmation";
import { isPhoneValid } from "@/components/shared/phoneWithConfirmation/phoneConfirmation.utils";
import { UploadAvatar } from "@/components/shared/uploadAvatar/UploadAvatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/data/countries";
import { api, getApiErrorMessage, type RequestDetails, type RequestUpdateInput } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api/config";
import { cn } from "@/lib/utils";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ParticipantSuccessMessage } from "./ParticipantSuccessMessage";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LONG_LIMIT = 2000;
const SHORT_LIMIT = 1000;
const LONG_HELPER_TEXT = "Рекомендуемый объём: 1000–2000 символов (до 2000 максимум)";
const SHORT_HELPER_TEXT = "Рекомендуемый объём: 500–1000 символов (до 1000 максимум)";
const LINK_GROUP_LIMIT = 3;
const REQUEST_STATUS_DRAFT = "1";
const REQUEST_STATUS_SUBMITTED = "2";
const PARTICIPATION_VARIANTS = ["Физическое лицо", "Юридическое лицо", "Творческий коллектив"] as const;
const GENDER_VARIANTS = ["Женский", "Мужской"] as const;
const PARTICIPATION_TYPES_WITH_ENTITY = new Set(["Юридическое лицо", "Творческий коллектив"]);

const H2_STYLE = cn("text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]", "mb-[24px]");

const SELECT_TRIGGER_CLASSNAME = cn("group mt-[14px] mb-[22px] flex h-auto! w-full! justify-between gap-4 rounded-none border-0 border-b border-[#dcdcdc] bg-transparent px-[20px] pb-[8px] pt-[14px] text-left shadow-none ring-0", "focus-visible:border-[#152551] focus-visible:ring-0", "data-[state=open]:border-[#152551]", "max-[768px]:px-[14px]", "[&>span[data-slot=select-value]]:block [&>span[data-slot=select-value]]:min-w-0 [&>span[data-slot=select-value]]:flex-1 [&>span[data-slot=select-value]]:truncate", "[&>span[data-slot=select-value]]:text-[22px] [&>span[data-slot=select-value]]:font-light [&>span[data-slot=select-value]]:leading-[1.2]", "[&>span[data-slot=select-value]]:text-[#152551] data-[placeholder]:[&>span[data-slot=select-value]]:text-[#a0a0a0]", "max-[1200px]:[&>span[data-slot=select-value]]:text-[18px] max-[768px]:[&>span[data-slot=select-value]]:text-[16px]");

const SELECT_CONTENT_CLASSNAME = cn("select-accent-scrollbar z-50 h-[400px] w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] overflow-hidden rounded-[16px] border-0 bg-white p-0 shadow-[0_26px_70px_rgba(21,37,81,0.14)] ring-0", "max-[1200px]:h-[360px] max-[768px]:h-[320px] max-[768px]:rounded-[12px]", "[&_[data-slot=select-viewport]]:h-full [&_[data-slot=select-viewport]]:w-full [&_[data-slot=select-viewport]]:min-w-0! [&_[data-slot=select-viewport]]:p-[8px]", "max-[768px]:[&_[data-slot=select-viewport]]:p-[6px]", "[&_[data-slot=select-scroll-down-button]]:bg-white [&_[data-slot=select-scroll-up-button]]:bg-white", "[&_[data-slot=select-scroll-down-button]]:text-accent [&_[data-slot=select-scroll-up-button]]:text-accent");

const SELECT_ITEM_CLASSNAME = cn("min-h-0 rounded-[10px] px-[24px] py-[10px] text-left text-[22px] font-normal leading-[1.25] text-[#949494] outline-none", "focus:bg-[#F5F5F5] focus:text-accent data-[state=checked]:text-accent", "max-[1200px]:text-[18px] max-[768px]:px-[16px] max-[768px]:py-[8px] max-[768px]:text-[16px]", "[&_[data-slot=select-item-indicator]]:hidden");

type ParticipantFormValues = {
  nominationId: string;
  applicantLastName: string;
  applicantFirstName: string;
  applicantPatronymic: string;
  applicantNoPatronymic: boolean;
  applicantEmail: string;
  applicantPhone: string;
  applicantPhoneConfirmed: boolean;
  applicantActsForAnotherPerson: boolean;
  nomineeLastName: string;
  nomineeFirstName: string;
  nomineePatronymic: string;
  nomineeNoPatronymic: boolean;
  nomineeCountry: string;
  nomineeLocality: string;
  nomineeCitizenship: string;
  nomineeBirthDate: string;
  nomineeGender: string;
  nomineePhotoFile: File | null;
  nomineePhotoUri?: string;
  participationType: string;
  participationEntityName: string;
  projectName: string;
  projectDescription: string;
  projectAudience: string;
  projectUniqueness: string;
  projectSocialImpact: string;
  projectGoals: string;
  projectSupport: string;
  projectResources: string;
  socialLinks: string[];
  videoLinks: string[];
  mediaLinks: string[];
  additionalFiles: DropZoneFile[];
  personalDataConsentFiles: DropZoneFile[];
  photoVideoConsentFiles: DropZoneFile[];
  adultPersonalDataConsentAccepted: boolean;
  adultPhotoVideoConsentAccepted: boolean;
};

type ExistingRequestFile = {
  name: string;
  size: number | null;
  url: string;
};

const DEFAULT_VALUES: ParticipantFormValues = {
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
  nomineePhotoUri: undefined,
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
  adultPhotoVideoConsentAccepted: false,
};

function getSuccessfulDropZoneFiles(files: DropZoneFile[]): File[] {
  return files.filter((file): file is DropZoneFile & { file: File } => file.status === "success" && file.file instanceof File).map(file => file.file);
}

function formatExistingFileSize(size: number | null): string {
  if (size === null || Number.isNaN(size)) {
    return "";
  }

  const sizeMb = size / (1024 * 1024);

  return `${sizeMb.toFixed(sizeMb >= 1 ? 1 : 2)} МБ`;
}

function normalizeTextValue(value: string, allowEmpty: boolean): string | undefined {
  const normalizedValue = value.trim();

  if (!normalizedValue && allowEmpty) {
    return undefined;
  }

  return normalizedValue;
}

function getDictionaryDisplayValue(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "object" && value !== null) {
    const candidate = "name" in value ? value.name : "title" in value ? value.title : "code" in value ? value.code : null;

    return typeof candidate === "string" ? candidate.trim() : "";
  }

  return "";
}

function getNominationIdValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  if (typeof value === "object" && value !== null && "id" in value) {
    const candidate = value.id;
    return candidate === undefined || candidate === null ? "" : String(candidate).trim();
  }

  return "";
}

function getStringValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  return "";
}

function resolveApiFileUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeExistingFile(value: unknown): ExistingRequestFile | null {
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
    url: resolveApiFileUrl(src),
  };
}

function normalizeExistingFiles(value: unknown): ExistingRequestFile[] {
  if (Array.isArray(value)) {
    return value.map(normalizeExistingFile).filter((item): item is ExistingRequestFile => item !== null);
  }

  const singleFile = normalizeExistingFile(value);

  return singleFile ? [singleFile] : [];
}

function createInitialLinkGroup(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [""];
  }

  const links = value
    .filter((item): item is string => typeof item === "string")
    .map(item => item.trim())
    .filter(Boolean);

  return links.length > 0 ? links : [""];
}

function parseIsoDateValue(value: string): { year: number; month: number; day: number } | null {
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

function getCurrentDateInMoscow(): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());
  const year = Number(parts.find(part => part.type === "year")?.value ?? "");
  const month = Number(parts.find(part => part.type === "month")?.value ?? "");
  const day = Number(parts.find(part => part.type === "day")?.value ?? "");

  return { year, month, day };
}

function hasReachedAgeInMoscow(birthDateValue: string, age: number): boolean {
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

function mapRequestToFormValues(request: RequestDetails, fallbackNominationId: string): ParticipantFormValues {
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
    adultPhotoVideoConsentAccepted: false,
  };
}

function buildParticipantRequestPayload(values: ParticipantFormValues, status: string): RequestUpdateInput {
  const isDraft = status === REQUEST_STATUS_DRAFT;
  const allowEmpty = isDraft;

  return {
    nomination: values.nominationId,
    status,
    applicant_name: normalizeTextValue(values.applicantFirstName, allowEmpty),
    applicant_last_name: normalizeTextValue(values.applicantLastName, allowEmpty),
    applicant_second_name: values.applicantNoPatronymic ? (isDraft ? undefined : null) : normalizeTextValue(values.applicantPatronymic, allowEmpty),
    applicant_email: normalizeTextValue(values.applicantEmail, allowEmpty),
    applicant_phone: normalizeTextValue(values.applicantPhone, allowEmpty),
    applicant_phone_confirmation_session: null,
    submitted_on_behalf_of_another_person: values.applicantActsForAnotherPerson,
    nominant_name: normalizeTextValue(values.nomineeFirstName, allowEmpty),
    nominant_last_name: normalizeTextValue(values.nomineeLastName, allowEmpty),
    nominant_second_name: values.nomineeNoPatronymic ? (isDraft ? undefined : null) : normalizeTextValue(values.nomineePatronymic, allowEmpty),
    nominant_country: normalizeTextValue(values.nomineeCountry, allowEmpty),
    nominant_settlement: normalizeTextValue(values.nomineeLocality, allowEmpty),
    nominant_citizenship: normalizeTextValue(values.nomineeCitizenship, allowEmpty),
    nominant_birthdate: normalizeTextValue(values.nomineeBirthDate, allowEmpty),
    nominant_sex: normalizeTextValue(values.nomineeGender, allowEmpty),
    form_participation: normalizeTextValue(values.participationType, allowEmpty),
    legal_name: PARTICIPATION_TYPES_WITH_ENTITY.has(values.participationType) ? normalizeTextValue(values.participationEntityName, allowEmpty) : isDraft ? undefined : null,
    project_name: normalizeTextValue(values.projectName, allowEmpty),
    project_description: normalizeTextValue(values.projectDescription, allowEmpty),
    project_audience: normalizeTextValue(values.projectAudience, allowEmpty),
    project_growth_uniqueness: normalizeTextValue(values.projectUniqueness, allowEmpty),
    project_growth_significance: normalizeTextValue(values.projectSocialImpact, allowEmpty),
    project_growth_goals: normalizeTextValue(values.projectGoals, allowEmpty),
    project_growth_support: normalizeTextValue(values.projectSupport, allowEmpty),
    project_growth_resources: normalizeTextValue(values.projectResources, allowEmpty),
    additional_links_social: values.socialLinks.map(link => link.trim()).filter(Boolean),
    additional_links_video: values.videoLinks.map(link => link.trim()).filter(Boolean),
    additional_links_media: values.mediaLinks.map(link => link.trim()).filter(Boolean),
    documents_agreement: isDraft ? undefined : true,
    nominant_photo: values.nomineePhotoFile,
    additional_documents: getSuccessfulDropZoneFiles(values.additionalFiles),
    documents_scan_pd: getSuccessfulDropZoneFiles(values.personalDataConsentFiles)[0] ?? null,
    documents_scan_photo_video: getSuccessfulDropZoneFiles(values.photoVideoConsentFiles)[0] ?? null,
  };
}

type ParticipantFormProps = {
  initialNominationId: string;
  nominationName?: string;
  requestId?: string;
  initialRequest?: RequestDetails;
};

export const ParticipantForm = memo(function ParticipantForm({ initialNominationId, nominationName, requestId, initialRequest }: ParticipantFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVariant, setSuccessVariant] = useState<"submitted" | "draft" | null>(null);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialValues = useMemo(
    () =>
      initialRequest
        ? mapRequestToFormValues(initialRequest, initialNominationId)
        : {
            ...DEFAULT_VALUES,
            nominationId: initialNominationId,
          },
    [initialNominationId, initialRequest],
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
    formState: { errors, isValid },
  } = useForm<ParticipantFormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });
  const { onChange: applicantEmailOnChange, ...applicantEmailFieldProps } = register("applicantEmail", {
    required: "Введите корректный email",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Введите корректный email",
    },
  });

  const applicantNoPatronymic = useWatch({ control, name: "applicantNoPatronymic" });
  const applicantActsForAnotherPerson = useWatch({ control, name: "applicantActsForAnotherPerson" });
  const nomineeNoPatronymic = useWatch({ control, name: "nomineeNoPatronymic" });
  const nomineeBirthDate = useWatch({ control, name: "nomineeBirthDate" });
  const applicantPhoneConfirmed = useWatch({ control, name: "applicantPhoneConfirmed" });
  const participationType = useWatch({ control, name: "participationType" });
  const nomineePhotoFile = useWatch({ control, name: "nomineePhotoFile" });
  const nomineePhotoUri = useWatch({ control, name: "nomineePhotoUri" });
  const socialLinks = useWatch({ control, name: "socialLinks" }) ?? DEFAULT_VALUES.socialLinks;
  const videoLinks = useWatch({ control, name: "videoLinks" }) ?? DEFAULT_VALUES.videoLinks;
  const mediaLinks = useWatch({ control, name: "mediaLinks" }) ?? DEFAULT_VALUES.mediaLinks;
  const additionalFiles = useWatch({ control, name: "additionalFiles" }) ?? DEFAULT_VALUES.additionalFiles;
  const personalDataConsentFiles = useWatch({ control, name: "personalDataConsentFiles" }) ?? DEFAULT_VALUES.personalDataConsentFiles;
  const photoVideoConsentFiles = useWatch({ control, name: "photoVideoConsentFiles" }) ?? DEFAULT_VALUES.photoVideoConsentFiles;
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

    const cleanups: Array<() => void> = [];

    const syncScrollbar = (textarea: HTMLTextAreaElement, wrapper: HTMLElement, track: HTMLElement, thumb: HTMLElement) => {
      const hasOverflow = textarea.scrollHeight > textarea.clientHeight + 1;
      wrapper.dataset.hasOverflow = hasOverflow ? "true" : "false";

      if (!hasOverflow) {
        thumb.style.height = "0px";
        thumb.style.transform = "translateY(0)";
        return;
      }

      const trackHeight = track.clientHeight;
      const thumbHeight = Math.max((textarea.clientHeight / textarea.scrollHeight) * trackHeight, 48);
      const maxThumbOffset = trackHeight - thumbHeight;
      const maxScrollOffset = textarea.scrollHeight - textarea.clientHeight;
      const thumbOffset = maxScrollOffset > 0 ? (textarea.scrollTop / maxScrollOffset) * maxThumbOffset : 0;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbOffset}px)`;
    };

    const textareas = formElement.querySelectorAll<HTMLTextAreaElement>(".participant-textarea__control");

    textareas.forEach(textarea => {
      const wrapper = textarea.closest<HTMLElement>(".participant-textarea-wrap");
      const track = wrapper?.querySelector<HTMLElement>(".participant-textarea__scrollbar");
      const thumb = wrapper?.querySelector<HTMLElement>(".participant-textarea__thumb");

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
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);

  const submitDisabled = isSubmitting;

  const addLinkField = (field: "socialLinks" | "videoLinks" | "mediaLinks") => {
    const nextLinks = field === "socialLinks" ? socialLinks : field === "videoLinks" ? videoLinks : mediaLinks;

    if (nextLinks.length >= LINK_GROUP_LIMIT) {
      return;
    }

    setValue(field, [...nextLinks, ""], { shouldDirty: true });
  };

  const updateLinkField = (field: "socialLinks" | "videoLinks" | "mediaLinks", index: number, nextValue: string) => {
    const currentLinks = field === "socialLinks" ? socialLinks : field === "videoLinks" ? videoLinks : mediaLinks;

    setValue(
      field,
      currentLinks.map((item, itemIndex) => (itemIndex === index ? nextValue : item)),
      { shouldDirty: true },
    );
  };

  const onSubmit = handleSubmit(async currentValues => {
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

    return <ParticipantSuccessMessage variant={successVariant} applicantName={applicantName || undefined} applicantEmail={applicantEmail || undefined} nominationName={nominationName} />;
  }

  return (
    <form ref={formRef} className={`form flex flex-col ${isSubmitting ? "loading" : ""}`} onSubmit={onSubmit}>
      <section className='pt-0'>
        <h2 className={H2_STYLE}>Данные заявителя</h2>

        <div className='flex flex-col'>
          <div className='relative flex flex-col'>
            <input type='text' placeholder='Фамилия' disabled={isSubmitting} {...register("applicantLastName", { required: "Укажите фамилию" })} />
            <p className={`error ${errors.applicantLastName ? "" : "hidden"}`}>{errors.applicantLastName?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <input type='text' placeholder='Имя' disabled={isSubmitting} {...register("applicantFirstName", { required: "Укажите имя" })} />
            <p className={`error ${errors.applicantFirstName ? "" : "hidden"}`}>{errors.applicantFirstName?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <input
              type='text'
              placeholder={applicantNoPatronymic ? "Отчество отсутствует" : "Отчество"}
              disabled={applicantNoPatronymic || isSubmitting}
              {...register("applicantPatronymic", {
                validate: value => applicantNoPatronymic || value.trim().length > 0 || "Укажите отчество",
              })}
            />

            <div className='absolute right-0 bottom-[14px]'>
              <label className='mt-[-24px] mb-[24px] flex flex-row items-center gap-[10px] text-[10px] leading-[10px] text-[#949494]'>
                <input type='checkbox' disabled={isSubmitting} {...register("applicantNoPatronymic")} />
                <div className='relative top-[2px]'>Нет отчества</div>
              </label>
            </div>
            <p className={`error ${errors.applicantPatronymic ? "" : "hidden"}`}>{errors.applicantPatronymic?.message ?? ""}</p>
          </div>

          <div className='form-field'>
            <input
              className='form-control'
              type='email'
              placeholder='Электронная почта'
              disabled={isSubmitting}
              {...applicantEmailFieldProps}
              onChange={async event => {
                applicantEmailOnChange(event);
                await trigger("applicantEmail");
              }}
            />
            <FieldMessages>
              <FieldMessage variant='error'>{errors.applicantEmail?.message}</FieldMessage>
            </FieldMessages>
          </div>

          <div className='form-field'>
            <Controller
              name='applicantPhone'
              control={control}
              rules={{
                validate: value => {
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
                },
              }}
              render={({ field }) => (
                <PhoneWithConfirmation
                  phone={field.value}
                  setPhone={nextValue => {
                    field.onChange(nextValue);
                    setValue("applicantPhoneConfirmed", false, { shouldDirty: true, shouldValidate: true });
                  }}
                  isConfirmed={applicantPhoneConfirmed}
                  setConfirmed={nextValue => {
                    setValue("applicantPhoneConfirmed", nextValue, { shouldDirty: true, shouldValidate: true });
                    void trigger("applicantPhone");
                  }}
                  disabled={isSubmitting}
                />
              )}
            />
            <FieldMessages>
              <FieldMessage variant='error'>{errors.applicantPhone?.message}</FieldMessage>
            </FieldMessages>
          </div>

          <label className='mt-0 flex flex-row items-center gap-[10px] max-[700px]:items-start'>
            <input type='checkbox' disabled={isSubmitting} {...register("applicantActsForAnotherPerson")} />
            <div className='comment relative top-px'>Подаю заявку от лица другого человека</div>
          </label>
        </div>
      </section>

      <section className='pt-[90px] max-[700px]:pt-[72px]'>
        <h2 className={H2_STYLE}>Данные номинанта</h2>

        <div className='mt-[24px] flex flex-col'>
          <div className='relative flex flex-col'>
            <input type='text' placeholder='Фамилия' disabled={isSubmitting} {...register("nomineeLastName", { required: "Укажите фамилию номинанта" })} />
            <p className={`error ${errors.nomineeLastName ? "" : "hidden"}`}>{errors.nomineeLastName?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <input type='text' placeholder='Имя' disabled={isSubmitting} {...register("nomineeFirstName", { required: "Укажите имя номинанта" })} />
            <p className={`error ${errors.nomineeFirstName ? "" : "hidden"}`}>{errors.nomineeFirstName?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <input
              type='text'
              placeholder={nomineeNoPatronymic ? "Отчество отсутствует" : "Отчество"}
              disabled={nomineeNoPatronymic || isSubmitting}
              {...register("nomineePatronymic", {
                validate: value => nomineeNoPatronymic || value.trim().length > 0 || "Укажите отчество номинанта",
              })}
            />

            <div className='absolute right-0 bottom-[14px]'>
              <label className='mt-[-24px] mb-[24px] flex flex-row items-center gap-[10px] text-[10px] leading-[10px] text-[#949494]'>
                <input type='checkbox' disabled={isSubmitting} {...register("nomineeNoPatronymic")} />
                <div className='relative top-[2px]'>Нет отчества</div>
              </label>
            </div>
            <p className={`error ${errors.nomineePatronymic ? "" : "hidden"}`}>{errors.nomineePatronymic?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <Controller
              name='nomineeCountry'
              control={control}
              rules={{ required: "Выберите страну" }}
              render={({ field }) => (
                <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={SELECT_TRIGGER_CLASSNAME}
                    icon={
                      <span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
                        <ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
                      </span>
                    }
                  >
                    <SelectValue placeholder='Страна' />
                  </SelectTrigger>
                  <SelectContent position='popper' side='bottom' align='start' sideOffset={-8} className={SELECT_CONTENT_CLASSNAME}>
                    {countries.map(variant => (
                      <SelectItem key={variant} value={variant} className={SELECT_ITEM_CLASSNAME}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className={`error ${errors.nomineeCountry ? "" : "hidden"}`}>{errors.nomineeCountry?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <input type='text' placeholder='Населенный пункт' disabled={isSubmitting} {...register("nomineeLocality", { required: "Укажите населенный пункт" })} />
            <p className={`error ${errors.nomineeLocality ? "" : "hidden"}`}>{errors.nomineeLocality?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <Controller
              name='nomineeCitizenship'
              control={control}
              rules={{ required: "Укажите гражданство" }}
              render={({ field }) => (
                <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={SELECT_TRIGGER_CLASSNAME}
                    icon={
                      <span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
                        <ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
                      </span>
                    }
                  >
                    <SelectValue placeholder='Гражданство' />
                  </SelectTrigger>
                  <SelectContent position='popper' side='bottom' align='start' sideOffset={-8} className={SELECT_CONTENT_CLASSNAME}>
                    {countries.map(variant => (
                      <SelectItem key={variant} value={variant} className={SELECT_ITEM_CLASSNAME}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className={`error ${errors.nomineeCitizenship ? "" : "hidden"}`}>{errors.nomineeCitizenship?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <Controller name='nomineeBirthDate' control={control} rules={{ required: "Укажите дату рождения" }} render={({ field }) => <DatePicker date={field.value} setDate={value => field.onChange(value)} placeholder='Дата рождения' />} />
            <p className={`error ${errors.nomineeBirthDate ? "" : "hidden"}`}>{errors.nomineeBirthDate?.message ?? ""}</p>
          </div>

          <div className='relative flex flex-col'>
            <Controller
              name='nomineeGender'
              control={control}
              rules={{ required: "Укажите пол" }}
              render={({ field }) => (
                <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={SELECT_TRIGGER_CLASSNAME}
                    icon={
                      <span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
                        <ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
                      </span>
                    }
                  >
                    <SelectValue placeholder='Пол' />
                  </SelectTrigger>
                  <SelectContent position='popper' side='bottom' align='start' sideOffset={-8} className={SELECT_CONTENT_CLASSNAME}>
                    {GENDER_VARIANTS.map(variant => (
                      <SelectItem key={variant} value={variant} className={SELECT_ITEM_CLASSNAME}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className={`error ${errors.nomineeGender ? "" : "hidden"}`}>{errors.nomineeGender?.message ?? ""}</p>
          </div>
        </div>

        <div className='mt-[54px]'>
          <div className='text-[28px] leading-[1.2] font-regular text-[#152551] max-[1000px]:text-[24px] max-[700px]:text-[20px]'>Фото номинанта</div>

          <div className='mt-[24px]'>
            <Controller
              name='nomineePhotoFile'
              control={control}
              render={({ field: fileField }) => (
                <UploadAvatar
                  imgUri={nomineePhotoUri ?? undefined}
                  setImgUri={nextValue => {
                    const resolvedValue = typeof nextValue === "function" ? nextValue(nomineePhotoUri ?? undefined) : nextValue;
                    setValue("nomineePhotoUri", resolvedValue, { shouldDirty: true });
                  }}
                  onFileChange={file => {
                    fileField.onChange(file);
                    void trigger("nomineePhotoFile");
                  }}
                />
              )}
            />
          </div>
        </div>
      </section>

      <section className='pt-[90px] max-[700px]:pt-[72px]'>
        <h2 className={H2_STYLE}>Форма участия</h2>

        <div className='mt-[34px] flex flex-col'>
          <div className='relative flex flex-col'>
            <Controller
              name='participationType'
              control={control}
              rules={{ required: "Выберите вариант участия" }}
              render={({ field }) => (
                <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={SELECT_TRIGGER_CLASSNAME}
                    icon={
                      <span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
                        <ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
                      </span>
                    }
                  >
                    <SelectValue placeholder='Выберите вариант' />
                  </SelectTrigger>
                  <SelectContent position='popper' side='bottom' align='start' sideOffset={-8} className={SELECT_CONTENT_CLASSNAME}>
                    {PARTICIPATION_VARIANTS.map(variant => (
                      <SelectItem key={variant} value={variant} className={SELECT_ITEM_CLASSNAME}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className={`error ${errors.participationType ? "" : "hidden"}`}>{errors.participationType?.message ?? ""}</p>
          </div>

          {showParticipationEntityName ? (
            <div className='relative mt-[18px] flex flex-col'>
              <input
                type='text'
                placeholder={participationType === "Творческий коллектив" ? "Название коллектива" : "Юридическое название организации"}
                disabled={isSubmitting}
                {...register("participationEntityName", {
                  validate: value => !showParticipationEntityName || value.trim().length > 0 || "Укажите название организации или коллектива",
                })}
              />
              <p className={`error ${errors.participationEntityName ? "" : "hidden"}`}>{errors.participationEntityName?.message ?? ""}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className='pt-[90px] max-[700px]:pt-[72px]'>
        <h2 className={H2_STYLE}>О проекте</h2>

        <div className='mt-[34px] flex flex-col'>
          <div className='relative flex flex-col'>
            <input type='text' placeholder='Название проекта' disabled={isSubmitting} {...register("projectName", { required: "Укажите название проекта" })} />
            <p className={`error ${errors.projectName ? "" : "hidden"}`}>{errors.projectName?.message ?? ""}</p>
          </div>

          <div className='mt-[24px] flex flex-col'>
            <div className='participant-textarea-wrap relative'>
              <textarea
                className='compact participant-textarea__control'
                placeholder='Описание проекта&#10;Что это за проект, зачем он создан и где сейчас находится'
                rows={8}
                maxLength={LONG_LIMIT}
                disabled={isSubmitting}
                {...register("projectDescription", { required: "Опишите проект" })}
              />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectDescription ? "" : "hidden"}`}>{errors.projectDescription?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{LONG_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>

          <div className='mt-[34px] flex flex-col'>
            <div className='participant-textarea-wrap relative'>
              <textarea className='compact participant-textarea__control' placeholder='Кто ваша аудитория, её размер и география' rows={8} maxLength={SHORT_LIMIT} disabled={isSubmitting} {...register("projectAudience", { required: "Опишите аудиторию проекта" })} />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectAudience ? "" : "hidden"}`}>{errors.projectAudience?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{SHORT_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>
        </div>
      </section>

      <section className='pt-[90px] max-[700px]:pt-[72px]'>
        <h2 className={H2_STYLE}>Развитие проекта</h2>

        <div className='mt-[34px] flex flex-col'>
          <div className='mt-[34px] flex flex-col first:mt-0'>
            <div className='participant-textarea-wrap relative'>
              <textarea className='compact participant-textarea__control' placeholder='В чем уникальность проекта? Что вы делаете иначе, чем другие?' rows={8} maxLength={LONG_LIMIT} disabled={isSubmitting} {...register("projectUniqueness", { required: "Опишите уникальность проекта" })} />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectUniqueness ? "" : "hidden"}`}>{errors.projectUniqueness?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{LONG_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>

          <div className='mt-[34px] flex flex-col first:mt-0'>
            <div className='participant-textarea-wrap relative'>
              <textarea className='compact participant-textarea__control' placeholder='В чем социальная значимость проекта? Как меняется общество с вашей помощью?' rows={8} maxLength={LONG_LIMIT} disabled={isSubmitting} {...register("projectSocialImpact", { required: "Опишите социальную значимость проекта" })} />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectSocialImpact ? "" : "hidden"}`}>{errors.projectSocialImpact?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{LONG_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>

          <div className='mt-[34px] flex flex-col first:mt-0'>
            <div className='participant-textarea-wrap relative'>
              <textarea className='compact participant-textarea__control' placeholder='Какие у проекта новые цели, вызовы, ожидаемые достижения?' rows={8} maxLength={SHORT_LIMIT} disabled={isSubmitting} {...register("projectGoals", { required: "Опишите цели проекта" })} />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectGoals ? "" : "hidden"}`}>{errors.projectGoals?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{SHORT_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>

          <div className='mt-[34px] flex flex-col first:mt-0'>
            <div className='participant-textarea-wrap relative'>
              <textarea className='compact participant-textarea__control' placeholder='С чьей помощью или поддержкой реализуется проект? Лидеры мнений, меценаты, органы власти, общественные организации? Кто именно' rows={8} maxLength={SHORT_LIMIT} disabled={isSubmitting} {...register("projectSupport", { required: "Опишите поддержку проекта" })} />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectSupport ? "" : "hidden"}`}>{errors.projectSupport?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{SHORT_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>

          <div className='mt-[34px] flex flex-col first:mt-0'>
            <div className='participant-textarea-wrap relative'>
              <textarea className='compact participant-textarea__control' placeholder='Какие дополнительные ресурсы помогут вам в реализации проекта? Гранты, реклама, административный ресурс и т.д. На сколько проект может стать более масштабным?' rows={8} maxLength={SHORT_LIMIT} disabled={isSubmitting} {...register("projectResources", { required: "Опишите необходимые ресурсы" })} />
              <div className='participant-textarea__scrollbar'>
                <div className='participant-textarea__thumb' />
              </div>
            </div>
            <p className={`error ${errors.projectResources ? "" : "hidden"}`}>{errors.projectResources?.message ?? ""}</p>
            <FieldMessages>
              <FieldMessage>{SHORT_HELPER_TEXT}</FieldMessage>
            </FieldMessages>
          </div>
        </div>
      </section>

      <section className='pt-[90px] max-[700px]:pt-[72px]'>
        <h2 className={H2_STYLE}>Дополнительная информация</h2>

        <div className='mt-[34px] flex flex-col gap-[40px]'>
          <div>
            {socialLinks.map((link, index) => (
              <div key={`socialLinks-${index}`} className='relative flex flex-col'>
                <input type='url' placeholder='Ссылка на социальные сети' value={link} disabled={isSubmitting} onChange={event => updateLinkField("socialLinks", index, event.target.value)} />
              </div>
            ))}

            {socialLinks.length < LINK_GROUP_LIMIT ? (
              <div className='relative -mt-[12px] cursor-pointer text-[14px]! leading-[14px] font-normal text-[#152551] hover:underline max-[700px]:text-[10px] max-[700px]:leading-[10px]' onClick={() => addLinkField("socialLinks")}>
                + Добавить ссылку
              </div>
            ) : null}
          </div>

          <div>
            {videoLinks.map((link, index) => (
              <div key={`videoLinks-${index}`} className='relative flex flex-col'>
                <input type='url' placeholder='Ссылка на видео' value={link} disabled={isSubmitting} onChange={event => updateLinkField("videoLinks", index, event.target.value)} />
              </div>
            ))}

            {videoLinks.length < LINK_GROUP_LIMIT ? (
              <div className='relative -mt-[12px] cursor-pointer text-[14px]! leading-[14px] font-normal text-[#152551] hover:underline max-[700px]:text-[10px] max-[700px]:leading-[10px]' onClick={() => addLinkField("videoLinks")}>
                + Добавить ссылку
              </div>
            ) : null}
          </div>

          <div>
            {mediaLinks.map((link, index) => (
              <div key={`mediaLinks-${index}`} className='relative flex flex-col'>
                <input type='url' placeholder='Ссылка на упоминание в СМИ' value={link} disabled={isSubmitting} onChange={event => updateLinkField("mediaLinks", index, event.target.value)} />
              </div>
            ))}

            {mediaLinks.length < LINK_GROUP_LIMIT ? (
              <div className='relative -mt-[12px] cursor-pointer text-[14px]! leading-[14px] font-normal text-[#152551] hover:underline max-[700px]:text-[10px] max-[700px]:leading-[10px]' onClick={() => addLinkField("mediaLinks")}>
                + Добавить ссылку
              </div>
            ) : null}
          </div>
        </div>

        <div className='mt-[72px]'>
          <div className='max-w-[760px] text-[22px] leading-[1.2] font-normal text-[#152551] max-[1000px]:text-[18px] max-[700px]:text-[16px]'>
            Подтверждающие документы
            <br />
            Награды, благодарности, опыт
          </div>

          <div className='mt-[16px]'>
            {existingAdditionalFiles.length > 0 ? (
              <div className='mb-[20px] flex flex-col gap-[10px]'>
                <div className='text-[14px] leading-[20px] text-[#152551]/70'>Уже загруженные документы</div>
                {existingAdditionalFiles.map(file => (
                  <a key={file.url} href={file.url} target='_blank' rel='noreferrer' className='text-[14px] leading-[20px] text-[#152551] underline hover:no-underline'>
                    {file.name}
                    {file.size !== null ? ` (${formatExistingFileSize(file.size)})` : ""}
                  </a>
                ))}
              </div>
            ) : null}

            <Controller
              name='additionalFiles'
              control={control}
              render={({ field }) => (
                <DropZone
                  files={field.value}
                  setFiles={nextValue => {
                    const currentFiles = getValues("additionalFiles") ?? [];
                    const resolvedValue = typeof nextValue === "function" ? nextValue(currentFiles) : nextValue;
                    field.onChange(resolvedValue);
                  }}
                  maxFiles={5}
                  maxFileMb={5}
                />
              )}
            />
          </div>
        </div>
      </section>

      {showDocumentsAndConsents || showAdultSelfConsentCheckboxes ? (
        <section className='pt-[90px] max-[700px]:pt-[72px]'>
          <h2 className={H2_STYLE}>Документы и согласия</h2>

          {showDocumentsAndConsents ? (
            <>
              <div className='mt-[22px] max-w-[1020px] text-[22px] leading-[1.35] font-regular text-[#152551] max-[1000px]:text-[18px] max-[700px]:text-[16px]'>Скачивайте, подписывайте и загружайте документы, если заявка подаётся от имени несовершеннолетнего, её должен подписать законный представитель — родитель или официальный опекун.</div>

              <div className='mt-[48px] text-[14px] leading-tight font-regular text-[#152551] max-[1000px]:text-[12px] max-[700px]:mt-[24px] max-[700px]:text-[10px]'>Шаг 1. Скачайте документы</div>

              <div className='mt-[24px] flex flex-row flex-nowrap gap-[28px]'>
                <a href={personalDataConsentHref} download className='bg-accent flex items-center justify-center rounded-[12px] p-[10px] text-center text-[14px]! leading-[14px] text-white-text normal-case! hover:opacity-80 max-[700px]:text-[12px]! max-[700px]:leading-[12px]!'>
                  Скачать согласие ПД
                </a>

                <a href={photoVideoConsentHref} download className='bg-accent flex items-center justify-center rounded-[12px] p-[10px] text-center text-[14px]! leading-[14px] text-white-text normal-case! hover:opacity-80 max-[700px]:text-[12px]! max-[700px]:leading-[12px]!'>
                  Скачать согласие на фото и видео
                </a>
              </div>

              <div className='mt-[48px] text-[14px] leading-tight font-regular text-[#152551] max-[1000px]:text-[12px] max-[700px]:mt-[24px] max-[700px]:text-[10px]'>Шаг 2. Загрузите подписанные сканы</div>

              <div className='mt-[28px]'>
                {existingPersonalDataConsentFiles.length > 0 ? (
                  <div className='mb-[20px] flex flex-col gap-[10px]'>
                    <div className='text-[14px] leading-[20px] text-[#152551]/70'>Ранее загруженный скан согласия ПД</div>
                    {existingPersonalDataConsentFiles.map(file => (
                      <a key={file.url} href={file.url} target='_blank' rel='noreferrer' className='text-[14px] leading-[20px] text-[#152551] underline hover:no-underline'>
                        {file.name}
                        {file.size !== null ? ` (${formatExistingFileSize(file.size)})` : ""}
                      </a>
                    ))}
                  </div>
                ) : null}

                <Controller
                  name='personalDataConsentFiles'
                  control={control}
                  render={({ field }) => (
                    <DropZone
                      files={field.value}
                      setFiles={nextValue => {
                        const currentFiles = getValues("personalDataConsentFiles") ?? [];
                        const resolvedValue = typeof nextValue === "function" ? nextValue(currentFiles) : nextValue;
                        field.onChange(resolvedValue);
                      }}
                      maxFiles={1}
                      maxFileMb={5}
                      addonText='Скан согласия ПД'
                    />
                  )}
                />
              </div>

              <div className='mt-[14px]'>
                {existingPhotoVideoConsentFiles.length > 0 ? (
                  <div className='mb-[20px] flex flex-col gap-[10px]'>
                    <div className='text-[14px] leading-[20px] text-[#152551]/70'>Ранее загруженный скан согласия на фото и видео</div>
                    {existingPhotoVideoConsentFiles.map(file => (
                      <a key={file.url} href={file.url} target='_blank' rel='noreferrer' className='text-[14px] leading-[20px] text-[#152551] underline hover:no-underline'>
                        {file.name}
                        {file.size !== null ? ` (${formatExistingFileSize(file.size)})` : ""}
                      </a>
                    ))}
                  </div>
                ) : null}

                <Controller
                  name='photoVideoConsentFiles'
                  control={control}
                  render={({ field }) => (
                    <DropZone
                      files={field.value}
                      setFiles={nextValue => {
                        const currentFiles = getValues("photoVideoConsentFiles") ?? [];
                        const resolvedValue = typeof nextValue === "function" ? nextValue(currentFiles) : nextValue;
                        field.onChange(resolvedValue);
                      }}
                      maxFiles={1}
                      maxFileMb={5}
                      addonText='Скан согласия на фото и видео'
                    />
                  )}
                />
              </div>
            </>
          ) : null}

          {showAdultSelfConsentCheckboxes ? (
            <div className='mt-[22px] flex max-w-[1020px] flex-col gap-[18px] text-[#152551]'>
              <label className='flex items-start gap-[12px] text-[16px] leading-[1.4] max-[700px]:text-[14px]'>
                <input
                  type='checkbox'
                  disabled={isSubmitting}
                  {...register("adultPersonalDataConsentAccepted", {
                    validate: value => !showAdultSelfConsentCheckboxes || value || "Подтвердите согласие на обработку персональных данных",
                  })}
                />
                <span>
                  Согласен на обработку персональных данных в соответствии с{" "}
                  <a href='https://premiyaevrazia.su/privacy/' target='_blank' rel='noreferrer' className='underline hover:no-underline'>
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>
              <p className={`error mt-0 ${errors.adultPersonalDataConsentAccepted ? "" : "hidden"}`}>{errors.adultPersonalDataConsentAccepted?.message ?? ""}</p>

              <label className='flex items-start gap-[12px] text-[16px] leading-[1.4] max-[700px]:text-[14px]'>
                <input
                  type='checkbox'
                  disabled={isSubmitting}
                  {...register("adultPhotoVideoConsentAccepted", {
                    validate: value => !showAdultSelfConsentCheckboxes || value || "Подтвердите согласие на использование аудио-визуальных материалов",
                  })}
                />
                <span>
                  Согласен на использование моих аудио-визуальных материалов в соответствии с{" "}
                  <a href='https://premiyaevrazia.su/agreement/' target='_blank' rel='noreferrer' className='underline hover:no-underline'>
                    Соглашением на использование
                  </a>
                </span>
              </label>
              <p className={`error mt-0 ${errors.adultPhotoVideoConsentAccepted ? "" : "hidden"}`}>{errors.adultPhotoVideoConsentAccepted?.message ?? ""}</p>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className='mt-[56px] flex w-full flex-row items-center justify-between gap-x-[60px] gap-y-[24px] pb-[24px] max-[700px]:flex-col max-[700px]:items-start'>
        <button type='submit' className={`action-btn action-btn-no-hover mt-0! w-[220px]! ${isSubmitting ? "loading" : ""} ${submitDisabled && !isSubmitting ? "disabled" : ""}`} disabled={submitDisabled}>
          {isSubmitting ? "Отправка..." : "Подать заявку"}
        </button>

        <div
          className='h-full border-0 bg-transparent p-0 text-[20px] max-[1400px]:text-[18px] leading-none font-regular uppercase text-[#c1c1c1] underline cursor-pointer max-[1000px]:text-[18px] max-[700px]:text-[16px]'
          onClick={() => {
            if (submitDisabled) return;
            void handleDraftSave();
          }}
        >
          {isSubmitting ? "Сохранение..." : "Сохранить черновик"}
        </div>
      </div>
      <p className={`error mt-0 ${submitError ? "" : "hidden"}`}>{submitError}</p>
    </form>
  );
});
