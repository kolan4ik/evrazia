import { r as requestJson, l as logoutResponseSchema, a as removeAuthToken, b as createApiSuccessResult, d as createApiErrorResult, e as loginResponseSchema, f as loginInputSchema, h as registerResponseSchema, i as registerInputSchema, n as normalizeBoolean, j as dictionaryListResponseSchema, k as nominationsListResponseSchema, m as requestListResponseSchema, o as requestMultipart, p as buildRequestFormData, q as buildRequestQuery, s as requestMutationResponseSchema, t as requestUpdateInputSchema, u as requestDetailsResponseSchema, v as requestUpsertInputSchema, w as requestIdSchema, A as ApiClientError, x as profileResponseSchema } from './server_Ci6swuQU.mjs';

function buildRegisterQuery(input) {
  return {
    first_name: input.first_name,
    last_name: input.last_name,
    second_name_empty: normalizeBoolean(input.second_name_empty),
    second_name: input.second_name,
    email: input.email,
    password: input.password,
    password_confirm: input.password_confirm,
    agree_processing_personal_data: "true",
    want_receive_information: normalizeBoolean(input.want_receive_information)
  };
}
function buildLoginQuery(input) {
  return {
    email: input.email,
    password: input.password
  };
}
const authApi = {
  async register(input) {
    try {
      const response = await requestJson({
        path: "/users/authentification/registration",
        method: "POST",
        input,
        inputSchema: registerInputSchema,
        responseSchema: registerResponseSchema,
        queryBuilder: buildRegisterQuery
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  },
  async login(input) {
    try {
      const response = await requestJson({
        path: "/users/authentification/login",
        method: "POST",
        input,
        inputSchema: loginInputSchema,
        responseSchema: loginResponseSchema,
        queryBuilder: buildLoginQuery
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  },
  async logout() {
    try {
      try {
        await requestJson({
          path: "/users/authentification/logout",
          method: "POST",
          responseSchema: logoutResponseSchema,
          auth: true
        });
      } catch {
      }
      removeAuthToken();
      return createApiSuccessResult({
        success: true
      });
    } catch (error) {
      return createApiErrorResult(error);
    }
  }
};

const dictionariesApi = {
  async getNominationsList() {
    try {
      const response = await requestJson({
        path: "/dictionaries/nominations/list",
        method: "GET",
        responseSchema: nominationsListResponseSchema
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
        responseSchema: dictionaryListResponseSchema
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  }
};

function validateRequestId(id) {
  const parsedId = requestIdSchema.safeParse(id);
  if (!parsedId.success) {
    throw new ApiClientError({
      message: "Invalid request id",
      code: "INPUT_VALIDATION_ERROR",
      details: parsedId.error.flatten()
    });
  }
  return parsedId.data;
}
const requestsApi = {
  async create(input) {
    try {
      const response = await requestMultipart({
        path: "/requests/add",
        method: "POST",
        input,
        inputSchema: requestUpsertInputSchema,
        responseSchema: requestMutationResponseSchema,
        buildQuery: buildRequestQuery,
        buildFormData: buildRequestFormData,
        auth: true
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  },
  async getById(id) {
    try {
      const validId = validateRequestId(id);
      const response = await requestJson({
        path: `/requests/${validId}`,
        method: "GET",
        responseSchema: requestDetailsResponseSchema,
        auth: true
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  },
  async update(id, input) {
    try {
      const validId = validateRequestId(id);
      const response = await requestMultipart({
        path: `/requests/${validId}`,
        method: "POST",
        input,
        inputSchema: requestUpdateInputSchema,
        responseSchema: requestMutationResponseSchema,
        buildQuery: buildRequestQuery,
        buildFormData: buildRequestFormData,
        auth: true
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
        auth: true
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  }
};

const usersApi = {
  async getProfile() {
    try {
      const response = await requestJson({
        path: "/users/profile",
        method: "GET",
        responseSchema: profileResponseSchema,
        auth: true
      });
      return createApiSuccessResult(response.data);
    } catch (error) {
      return createApiErrorResult(error);
    }
  }
};

const api = {
  auth: authApi,
  users: usersApi,
  dictionaries: dictionariesApi,
  requests: requestsApi
};

export { api as a };
