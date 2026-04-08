import { c as API_PROXY_PREFIX, a as API_BASE_URL, b as API_PREFIX } from './config_B9oekYbR.mjs';
import { ZodError, z } from 'zod';

class ApiClientError extends Error {
  code;
  status;
  details;
  constructor(params) {
    super(params.message);
    this.name = "ApiClientError";
    this.code = params.code;
    this.status = params.status;
    this.details = params.details;
  }
}
function normalizeApiError(error, fallbackCode = "INPUT_VALIDATION_ERROR") {
  if (error instanceof ApiClientError) return error;
  if (error instanceof ZodError) {
    return new ApiClientError({
      message: "Validation failed",
      code: fallbackCode,
      details: error.flatten()
    });
  }
  if (error instanceof Error) {
    return new ApiClientError({
      message: error.message,
      code: "NETWORK_ERROR",
      details: error
    });
  }
  return new ApiClientError({
    message: "Unknown API error",
    code: "NETWORK_ERROR",
    details: error
  });
}
function createApiSuccessResult(payload) {
  return {
    status: "ok",
    payload
  };
}
function createApiErrorResult(error) {
  return {
    status: "error",
    payload: normalizeApiError(error)
  };
}
function getApiErrorMessage(error, fallback = "Не удалось выполнить запрос") {
  if (error instanceof ApiClientError) {
    const details = error.details;
    if (details && typeof details === "object" && "errors" in details && Array.isArray(details.errors)) {
      const firstError = details.errors[0];
      if (firstError && typeof firstError === "object" && "message" in firstError && typeof firstError.message === "string") {
        return firstError.message;
      }
    }
    if (details && typeof details === "object" && "formErrors" in details && Array.isArray(details.formErrors) && typeof details.formErrors[0] === "string") {
      return details.formErrors[0];
    }
    return error.message || fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}

const apiErrorItemSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  customData: z.unknown().optional()
});
const createApiResponseSchema = (dataSchema) => z.object({
  data: dataSchema,
  timestamp: z.union([z.number(), z.string()]).optional(),
  success: z.boolean(),
  time: z.string().optional(),
  errors: z.array(apiErrorItemSchema).optional()
});
const registerInputSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  second_name_empty: z.boolean(),
  second_name: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirm: z.string().min(6),
  agree_processing_personal_data: z.literal(true),
  want_receive_information: z.boolean()
}).superRefine((value, ctx) => {
  if (!value.second_name_empty && !value.second_name?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "second_name is required when second_name_empty is false",
      path: ["second_name"]
    });
  }
  if (value.password !== value.password_confirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["password_confirm"]
    });
  }
});
const registerResponseDataSchema = z.object({
  ID: z.number(),
  CONFIRM: z.boolean()
});
const registerResponseSchema = createApiResponseSchema(registerResponseDataSchema);
const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
const loginResponseDataSchema = z.object({
  id: z.number(),
  authToken: z.string().min(1)
});
const loginResponseSchema = createApiResponseSchema(loginResponseDataSchema);
const logoutResponseDataSchema = z.unknown().optional();
const logoutResponseSchema = createApiResponseSchema(logoutResponseDataSchema);
const profileResponseDataSchema = z.object({
  id: z.number(),
  login: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  secondName: z.string().nullable().optional(),
  photo: z.string().nullable().optional()
});
const profileResponseSchema = createApiResponseSchema(profileResponseDataSchema);
const dictionaryItemSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  title: z.string().optional()
}).passthrough().refine(
  (value) => value.id !== void 0 || value.code !== void 0 || value.name !== void 0 || value.title !== void 0,
  "Dictionary item must contain at least one identifier/display field"
);
const dictionaryListResponseDataSchema = z.array(dictionaryItemSchema);
const dictionaryListResponseSchema = createApiResponseSchema(dictionaryListResponseDataSchema);
const nominationItemSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string().min(1),
  code: z.string().min(1),
  text: z.string().optional().nullable(),
  label: z.string().optional().nullable(),
  picture: z.string().optional().nullable(),
  available: z.boolean().optional()
}).passthrough();
const nominationsListResponseDataSchema = z.array(nominationItemSchema);
const nominationsListResponseSchema = createApiResponseSchema(nominationsListResponseDataSchema);
const isFileLike = (value) => {
  if (typeof File === "undefined") return false;
  return value instanceof File;
};
const fileSchema = z.custom((value) => {
  if (value == null) return true;
  if (typeof File === "undefined") return true;
  return isFileLike(value);
}, "Expected File");
const requestIdSchema = z.union([z.number(), z.string().min(1)]);
const requestUpsertInputSchema = z.object({
  nomination: z.string().min(1),
  status: z.string().min(1),
  applicant_name: z.string().min(1),
  applicant_last_name: z.string().min(1),
  applicant_second_name: z.string().optional().nullable(),
  applicant_email: z.string().email(),
  applicant_phone: z.string().min(1),
  applicant_phone_confirmation_session: z.string().optional().nullable(),
  submitted_on_behalf_of_another_person: z.boolean(),
  nominant_name: z.string().min(1),
  nominant_last_name: z.string().min(1),
  nominant_second_name: z.string().optional().nullable(),
  nominant_country: z.string().min(1),
  nominant_settlement: z.string().min(1),
  nominant_citizenship: z.string().min(1),
  nominant_birthdate: z.string().min(1),
  nominant_sex: z.string().min(1),
  form_participation: z.string().min(1),
  legal_name: z.string().optional().nullable(),
  project_name: z.string().min(1),
  project_description: z.string().min(1),
  project_audience: z.string().min(1),
  project_growth_uniqueness: z.string().min(1),
  project_growth_significance: z.string().min(1),
  project_growth_goals: z.string().min(1),
  project_growth_support: z.string().min(1),
  project_growth_resources: z.string().min(1),
  additional_links_social: z.array(z.url()).default([]),
  additional_links_video: z.array(z.url()).default([]),
  additional_links_media: z.array(z.url()).default([]),
  documents_agreement: z.literal(true),
  nominant_photo: fileSchema.optional().nullable(),
  additional_documents: z.array(fileSchema).default([]),
  documents_scan_pd: fileSchema.optional().nullable(),
  documents_scan_photo_video: fileSchema.optional().nullable()
});
const requestUpdateInputSchema = requestUpsertInputSchema.partial();
const requestListItemSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  nomination: z.unknown().optional(),
  status: z.unknown().optional(),
  project_name: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
}).passthrough();
const requestListResponseDataSchema = z.array(requestListItemSchema);
const requestListResponseSchema = createApiResponseSchema(requestListResponseDataSchema);
const requestDetailsResponseDataSchema = z.object({
  id: z.union([z.number(), z.string()])
}).passthrough();
const requestDetailsResponseSchema = createApiResponseSchema(requestDetailsResponseDataSchema);
const requestMutationResponseSchema = createApiResponseSchema(z.unknown());

function buildUrl(path, query, baseUrlOverride) {
  const isBrowserProxy = typeof window !== "undefined";
  const useProxyBase = typeof baseUrlOverride === "string" ? baseUrlOverride.includes(API_PROXY_PREFIX) : isBrowserProxy;
  const normalizedPath = useProxyBase && !path.endsWith("/") ? `${path}/` : path;
  const baseUrl = baseUrlOverride ?? (isBrowserProxy ? `${window.location.origin}${API_PROXY_PREFIX}` : `${API_BASE_URL}${API_PREFIX}`);
  const url = new URL(`${baseUrl}${normalizedPath}`);
  if (!query) return url.toString();
  for (const [key, value] of Object.entries(query)) {
    if (value === void 0 || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === void 0 || item === null || item === "") continue;
        url.searchParams.append(key, String(item));
      }
      continue;
    }
    url.searchParams.set(key, String(value));
  }
  return url.toString();
}
function normalizeBoolean(value) {
  return value ? "true" : "false";
}
function appendFormDataValue(formData, key, value) {
  if (value === void 0 || value === null) return;
  if (typeof File !== "undefined" && value instanceof File) {
    formData.append(key, value);
    return;
  }
  formData.append(key, String(value));
}
function buildRequestQuery(payload) {
  return {
    nomination: payload.nomination,
    status: payload.status,
    applicant_name: payload.applicant_name,
    applicant_last_name: payload.applicant_last_name,
    applicant_second_name: payload.applicant_second_name,
    applicant_email: payload.applicant_email,
    applicant_phone: payload.applicant_phone,
    applicant_phone_confirmation_session: payload.applicant_phone_confirmation_session,
    submitted_on_behalf_of_another_person: typeof payload.submitted_on_behalf_of_another_person === "boolean" ? normalizeBoolean(payload.submitted_on_behalf_of_another_person) : void 0,
    nominant_name: payload.nominant_name,
    nominant_last_name: payload.nominant_last_name,
    nominant_second_name: payload.nominant_second_name,
    nominant_country: payload.nominant_country,
    nominant_settlement: payload.nominant_settlement,
    nominant_citizenship: payload.nominant_citizenship,
    nominant_birthdate: payload.nominant_birthdate,
    nominant_sex: payload.nominant_sex,
    form_participation: payload.form_participation,
    legal_name: payload.legal_name,
    project_name: payload.project_name,
    project_description: payload.project_description,
    project_audience: payload.project_audience,
    project_growth_uniqueness: payload.project_growth_uniqueness,
    project_growth_significance: payload.project_growth_significance,
    project_growth_goals: payload.project_growth_goals,
    project_growth_support: payload.project_growth_support,
    project_growth_resources: payload.project_growth_resources,
    "additional_links_social[]": payload.additional_links_social,
    "additional_links_video[]": payload.additional_links_video,
    "additional_links_media[]": payload.additional_links_media,
    documents_agreement: typeof payload.documents_agreement === "boolean" ? normalizeBoolean(payload.documents_agreement) : void 0
  };
}
function buildRequestFormData(payload) {
  try {
    const formData = new FormData();
    if (payload.nominant_photo) {
      appendFormDataValue(formData, "nominant_photo", payload.nominant_photo);
    }
    if (payload.documents_scan_pd) {
      appendFormDataValue(formData, "documents_scan_pd", payload.documents_scan_pd);
    }
    if (payload.documents_scan_photo_video) {
      appendFormDataValue(
        formData,
        "documents_scan_photo_video",
        payload.documents_scan_photo_video
      );
    }
    if (payload.additional_documents?.length) {
      for (const file of payload.additional_documents) {
        if (file) appendFormDataValue(formData, "additional_documents[]", file);
      }
    }
    return formData;
  } catch (error) {
    throw new ApiClientError({
      message: "Failed to build multipart form data",
      code: "MULTIPART_BUILD_ERROR",
      details: error
    });
  }
}

function removeAuthToken() {
  return;
}

async function parseResponseJson(response) {
  try {
    return await response.json();
  } catch (error) {
    throw new ApiClientError({
      message: "Failed to parse JSON response",
      code: "HTTP_ERROR",
      status: response.status,
      details: error
    });
  }
}
function buildHeaders(params) {
  const headers = {
    Accept: "application/json"
  };
  void params.auth;
  if (!params.isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  if (params.headers) {
    for (const [key, value] of Object.entries(params.headers)) {
      if (value !== void 0) {
        headers[key] = String(value);
      }
    }
  }
  return headers;
}
function ensureApiSuccess(json, response) {
  if (typeof json === "object" && json !== null && "success" in json && json.success === false) {
    throw new ApiClientError({
      message: "API returned success=false",
      code: "API_ERROR",
      status: response.status,
      details: json
    });
  }
}
function validateOutput(responseSchema, json, response) {
  const parsedOutput = responseSchema.safeParse(json);
  if (!parsedOutput.success) {
    throw new ApiClientError({
      message: "Output validation failed",
      code: "OUTPUT_VALIDATION_ERROR",
      status: response.status,
      details: parsedOutput.error.flatten()
    });
  }
  return parsedOutput.data;
}
async function requestJson({
  path,
  method,
  input,
  inputSchema,
  responseSchema,
  queryBuilder,
  auth = false,
  baseUrl,
  headers
}) {
  try {
    let validatedInput = input;
    if (inputSchema) {
      const parsedInput = inputSchema.safeParse(input);
      if (!parsedInput.success) {
        throw new ApiClientError({
          message: "Input validation failed",
          code: "INPUT_VALIDATION_ERROR",
          details: parsedInput.error.flatten()
        });
      }
      validatedInput = parsedInput.data;
    }
    const query = validatedInput && queryBuilder ? queryBuilder(validatedInput) : void 0;
    const response = await fetch(buildUrl(path, query, baseUrl), {
      method,
      headers: buildHeaders({ auth, headers })
    });
    if (response.status === 401 || response.status === 403) {
      removeAuthToken();
      throw new ApiClientError({
        message: "Unauthorized",
        code: "UNAUTHORIZED",
        status: response.status
      });
    }
    const json = await parseResponseJson(response);
    if (!response.ok) {
      throw new ApiClientError({
        message: `HTTP error: ${response.status}`,
        code: "HTTP_ERROR",
        status: response.status,
        details: json
      });
    }
    ensureApiSuccess(json, response);
    return validateOutput(responseSchema, json, response);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
async function requestMultipart({
  path,
  method,
  input,
  inputSchema,
  responseSchema,
  buildQuery,
  buildFormData,
  auth = false,
  baseUrl,
  headers
}) {
  try {
    const parsedInput = inputSchema.safeParse(input);
    if (!parsedInput.success) {
      throw new ApiClientError({
        message: "Input validation failed",
        code: "INPUT_VALIDATION_ERROR",
        details: parsedInput.error.flatten()
      });
    }
    const validatedInput = parsedInput.data;
    const response = await fetch(buildUrl(path, buildQuery(validatedInput), baseUrl), {
      method,
      headers: buildHeaders({ auth, isMultipart: true, headers }),
      body: buildFormData(validatedInput)
    });
    if (response.status === 401 || response.status === 403) {
      removeAuthToken();
      throw new ApiClientError({
        message: "Unauthorized",
        code: "UNAUTHORIZED",
        status: response.status
      });
    }
    const json = await parseResponseJson(response);
    if (!response.ok) {
      throw new ApiClientError({
        message: `HTTP error: ${response.status}`,
        code: "HTTP_ERROR",
        status: response.status,
        details: json
      });
    }
    ensureApiSuccess(json, response);
    return validateOutput(responseSchema, json, response);
  } catch (error) {
    throw normalizeApiError(error);
  }
}

function createServerApi({ origin, cookieHeader = "" }) {
  const baseUrl = `${origin}${API_PROXY_PREFIX}`;
  const headers = cookieHeader ? { cookie: cookieHeader } : void 0;
  return {
    auth: {
      async login(input) {
        try {
          const response = await requestJson({
            path: "/users/authentification/login",
            method: "POST",
            input,
            responseSchema: loginResponseSchema,
            queryBuilder: (payload) => payload,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      },
      async logout() {
        try {
          const response = await requestJson({
            path: "/users/authentification/logout",
            method: "POST",
            responseSchema: logoutResponseSchema,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      }
    },
    users: {
      async getProfile() {
        try {
          const response = await requestJson({
            path: "/users/profile",
            method: "GET",
            responseSchema: profileResponseSchema,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      }
    },
    dictionaries: {
      async getNominationsList() {
        try {
          const response = await requestJson({
            path: "/dictionaries/nominations/list",
            method: "GET",
            responseSchema: nominationsListResponseSchema,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      },
      async getRequestStatusesList() {
        try {
          const response = await requestJson({
            path: "/dictionaries/requests/statuses/list",
            method: "GET",
            responseSchema: dictionaryListResponseSchema,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      }
    },
    requests: {
      async getById(id) {
        try {
          const response = await requestJson({
            path: `/requests/${id}`,
            method: "GET",
            responseSchema: requestDetailsResponseSchema,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      },
      async list() {
        try {
          const response = await requestJson({
            path: "/requests/list",
            method: "GET",
            responseSchema: requestListResponseSchema,
            baseUrl,
            headers
          });
          return createApiSuccessResult(response.data);
        } catch (error) {
          return createApiErrorResult(error);
        }
      }
    }
  };
}

export { ApiClientError as A, removeAuthToken as a, createApiSuccessResult as b, createServerApi as c, createApiErrorResult as d, loginResponseSchema as e, loginInputSchema as f, getApiErrorMessage as g, registerResponseSchema as h, registerInputSchema as i, dictionaryListResponseSchema as j, nominationsListResponseSchema as k, logoutResponseSchema as l, requestListResponseSchema as m, normalizeBoolean as n, requestMultipart as o, buildRequestFormData as p, buildRequestQuery as q, requestJson as r, requestMutationResponseSchema as s, requestUpdateInputSchema as t, requestDetailsResponseSchema as u, requestUpsertInputSchema as v, requestIdSchema as w, profileResponseSchema as x };
