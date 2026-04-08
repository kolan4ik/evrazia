import { z } from 'zod'

export const apiErrorItemSchema = z.object({
	message: z.string(),
	code: z.string().optional(),
	customData: z.unknown().optional(),
})

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		data: dataSchema,
		timestamp: z.union([z.number(), z.string()]).optional(),
		success: z.boolean(),
		time: z.string().optional(),
		errors: z.array(apiErrorItemSchema).optional(),
	})

export const registerInputSchema = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	second_name_empty: z.boolean(),
	second_name: z.string().optional().nullable(),
	email: z.string().email(),
	password: z.string().min(6),
	password_confirm: z.string().min(6),
	agree_processing_personal_data: z.literal(true),
	want_receive_information: z.boolean(),
}).superRefine((value, ctx) => {
	if (!value.second_name_empty && !value.second_name?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'second_name is required when second_name_empty is false',
			path: ['second_name'],
		})
	}

	if (value.password !== value.password_confirm) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Passwords do not match',
			path: ['password_confirm'],
		})
	}
})

export const registerResponseDataSchema = z.object({
	ID: z.number(),
	CONFIRM: z.boolean(),
})

export const registerResponseSchema = createApiResponseSchema(registerResponseDataSchema)

export const loginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})

export const loginResponseDataSchema = z.object({
	id: z.number(),
	authToken: z.string().min(1),
})

export const loginResponseSchema = createApiResponseSchema(loginResponseDataSchema)
export const logoutResponseDataSchema = z.unknown().optional()
export const logoutResponseSchema = createApiResponseSchema(logoutResponseDataSchema)

export const profileResponseDataSchema = z.object({
	id: z.number(),
	login: z.string(),
	email: z.string().email(),
	name: z.string().nullable().optional(),
	lastName: z.string().nullable().optional(),
	secondName: z.string().nullable().optional(),
	photo: z.string().nullable().optional(),
})

export const profileResponseSchema = createApiResponseSchema(profileResponseDataSchema)

export const dictionaryItemSchema = z.object({
	id: z.union([z.number(), z.string()]).optional(),
	code: z.string().optional(),
	name: z.string().optional(),
	title: z.string().optional(),
}).passthrough().refine(
	(value) =>
		value.id !== undefined ||
		value.code !== undefined ||
		value.name !== undefined ||
		value.title !== undefined,
	'Dictionary item must contain at least one identifier/display field',
)

export const dictionaryListResponseDataSchema = z.array(dictionaryItemSchema)
export const dictionaryListResponseSchema = createApiResponseSchema(dictionaryListResponseDataSchema)

export const nominationItemSchema = z.object({
	id: z.union([z.number(), z.string()]),
	name: z.string().min(1),
	code: z.string().min(1),
	text: z.string().optional().nullable(),
	label: z.string().optional().nullable(),
	picture: z.string().optional().nullable(),
	available: z.boolean().optional(),
}).passthrough()

export const nominationsListResponseDataSchema = z.array(nominationItemSchema)
export const nominationsListResponseSchema = createApiResponseSchema(nominationsListResponseDataSchema)

const isFileLike = (value: unknown): value is File => {
	if (typeof File === 'undefined') return false

	return value instanceof File
}

const fileSchema = z.custom<File | null | undefined>((value) => {
	if (value == null) return true
	if (typeof File === 'undefined') return true

	return isFileLike(value)
}, 'Expected File')

export const requestIdSchema = z.union([z.number(), z.string().min(1)])

export const requestUpsertInputSchema = z.object({
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
	documents_scan_photo_video: fileSchema.optional().nullable(),
})

export const requestUpdateInputSchema = requestUpsertInputSchema.partial()

export const requestListItemSchema = z.object({
	id: z.union([z.number(), z.string()]).optional(),
	nomination: z.unknown().optional(),
	status: z.unknown().optional(),
	project_name: z.string().optional(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
}).passthrough()

export const requestListResponseDataSchema = z.array(requestListItemSchema)
export const requestListResponseSchema = createApiResponseSchema(requestListResponseDataSchema)

export const requestDetailsResponseDataSchema = z.object({
	id: z.union([z.number(), z.string()]),
}).passthrough()

export const requestDetailsResponseSchema = createApiResponseSchema(requestDetailsResponseDataSchema)
export const requestMutationResponseSchema = createApiResponseSchema(z.unknown())

export type RegisterInput = z.infer<typeof registerInputSchema>
export type RegisterResponseData = z.infer<typeof registerResponseDataSchema>

export type LoginInput = z.infer<typeof loginInputSchema>
export type LoginResponseData = z.infer<typeof loginResponseDataSchema>

export type LogoutResponseData = z.infer<typeof logoutResponseDataSchema>

export type ProfileResponseData = z.infer<typeof profileResponseDataSchema>

export type DictionaryItem = z.infer<typeof dictionaryItemSchema>
export type NominationItem = z.infer<typeof nominationItemSchema>

export type RequestUpsertInput = z.infer<typeof requestUpsertInputSchema>
export type RequestUpdateInput = z.infer<typeof requestUpdateInputSchema>
export type RequestListItem = z.infer<typeof requestListItemSchema>
export type RequestDetails = z.infer<typeof requestDetailsResponseDataSchema>
export type RequestId = z.infer<typeof requestIdSchema>
