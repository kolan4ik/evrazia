import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { T as renderTemplate, C as maybeRenderHead } from './sequence_BbkuQ6gj.mjs';
import { r as renderComponent } from './server_jhl4VimB.mjs';
import { $ as $$Layout } from './Layout_BHRDJuJp.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$ApiTest = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "noindex": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<section class="content"> <div class="inner-content py-[40px]"> <h1>API Test</h1> <p class="mt-[12px] max-w-[900px] text-[16px] leading-[1.5]">
Временная страница для ручной проверки \`api.auth\`, \`api.users\`, \`api.dictionaries\`,
				\`api.requests\`.
</p> <div class="mt-[24px] grid gap-[24px]"> <div> <div class="font-bold">Текущий токен</div> <pre id="token-output" class="mt-[8px] overflow-auto rounded border border-black/10 p-[12px] text-[12px] leading-[1.5] whitespace-pre-wrap">-</pre> </div> <div class="grid gap-[12px]"> <h2 class="text-[24px]">Auth</h2> <form id="register-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">register</div> <input name="first_name" placeholder="first_name" value="Иван"> <input name="last_name" placeholder="last_name" value="Иванов"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="second_name_empty" checked> second_name_empty</label> <input name="second_name" placeholder="second_name" value=""> <input name="email" type="email" placeholder="email"> <input name="password" type="password" placeholder="password"> <input name="password_confirm" type="password" placeholder="password_confirm"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="agree_processing_personal_data" checked> agree_processing_personal_data</label> <label class="flex items-center gap-[8px]"><input type="checkbox" name="want_receive_information"> want_receive_information</label> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run register</button> </form> <form id="login-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">login</div> <input name="email" type="email" placeholder="email"> <input name="password" type="password" placeholder="password"> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run login</button> </form> <div class="flex flex-wrap gap-[8px]"> <button data-action="logout" class="rounded bg-black px-[14px] py-[8px] text-white">logout</button> <button data-action="getProfile" class="rounded bg-black px-[14px] py-[8px] text-white">getProfile</button> <button data-action="getNominationsList" class="rounded bg-black px-[14px] py-[8px] text-white">getNominationsList</button> <button data-action="getRequestStatusesList" class="rounded bg-black px-[14px] py-[8px] text-white">getRequestStatusesList</button> <button data-action="requestsList" class="rounded bg-black px-[14px] py-[8px] text-white">requests.list</button> </div> </div> <div class="grid gap-[12px]"> <h2 class="text-[24px]">Requests</h2> <form id="request-get-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">requests.getById</div> <input name="id" placeholder="request id"> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run getById</button> </form> <form id="request-create-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">requests.create</div> <input name="nomination" placeholder="nomination"> <input name="status" placeholder="status"> <input name="applicant_name" placeholder="applicant_name"> <input name="applicant_last_name" placeholder="applicant_last_name"> <input name="applicant_second_name" placeholder="applicant_second_name"> <input name="applicant_email" type="email" placeholder="applicant_email"> <input name="applicant_phone" placeholder="applicant_phone"> <input name="applicant_phone_confirmation_session" placeholder="applicant_phone_confirmation_session"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="submitted_on_behalf_of_another_person"> submitted_on_behalf_of_another_person</label> <input name="nominant_name" placeholder="nominant_name"> <input name="nominant_last_name" placeholder="nominant_last_name"> <input name="nominant_second_name" placeholder="nominant_second_name"> <input name="nominant_country" placeholder="nominant_country"> <input name="nominant_settlement" placeholder="nominant_settlement"> <input name="nominant_citizenship" placeholder="nominant_citizenship"> <input name="nominant_birthdate" placeholder="nominant_birthdate"> <input name="nominant_sex" placeholder="nominant_sex"> <input name="form_participation" placeholder="form_participation"> <input name="legal_name" placeholder="legal_name"> <input name="project_name" placeholder="project_name"> <textarea name="project_description" placeholder="project_description"></textarea> <textarea name="project_audience" placeholder="project_audience"></textarea> <textarea name="project_growth_uniqueness" placeholder="project_growth_uniqueness"></textarea> <textarea name="project_growth_significance" placeholder="project_growth_significance"></textarea> <textarea name="project_growth_goals" placeholder="project_growth_goals"></textarea> <textarea name="project_growth_support" placeholder="project_growth_support"></textarea> <textarea name="project_growth_resources" placeholder="project_growth_resources"></textarea> <input name="additional_links_social" placeholder="additional_links_social, comma separated urls"> <input name="additional_links_video" placeholder="additional_links_video, comma separated urls"> <input name="additional_links_media" placeholder="additional_links_media, comma separated urls"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="documents_agreement" checked> documents_agreement</label> <label class="grid gap-[4px]">nominant_photo <input name="nominant_photo" type="file"></label> <label class="grid gap-[4px]">additional_documents <input name="additional_documents" type="file" multiple></label> <label class="grid gap-[4px]">documents_scan_pd <input name="documents_scan_pd" type="file"></label> <label class="grid gap-[4px]">documents_scan_photo_video <input name="documents_scan_photo_video" type="file"></label> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run create</button> </form> <form id="request-update-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">requests.update</div> <input name="id" placeholder="request id"> <input name="project_name" placeholder="project_name"> <textarea name="project_description" placeholder="project_description"></textarea> <input name="status" placeholder="status"> <input name="additional_links_social" placeholder="additional_links_social, comma separated urls"> <label class="grid gap-[4px]">additional_documents <input name="additional_documents" type="file" multiple></label> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run update</button> </form> </div> <div> <div class="font-bold">Result</div> <pre id="result-output" class="mt-[8px] overflow-auto rounded border border-black/10 p-[12px] text-[12px] leading-[1.5] whitespace-pre-wrap">-</pre> </div> <div> <div class="font-bold">Error</div> <pre id="error-output" class="mt-[8px] overflow-auto rounded border border-black/10 p-[12px] text-[12px] leading-[1.5] whitespace-pre-wrap">-</pre> </div> </div> </div> </section> <script type="module">
		import { api, getAuthToken } from '@/lib/api'

		const tokenOutput = document.querySelector('#token-output')
		const resultOutput = document.querySelector('#result-output')
		const errorOutput = document.querySelector('#error-output')

		const setText = (element, value) => {
			if (!element) return
			element.textContent = value
		}

		const refreshToken = () => {
			setText(tokenOutput, getAuthToken() ?? 'null')
		}

		const setResult = (value) => {
			setText(resultOutput, JSON.stringify(value, null, 2))
			setText(errorOutput, '-')
			refreshToken()
		}

		const setError = (error) => {
			const normalized = error instanceof Error
				? {
					name: error.name,
					message: error.message,
					code: error.code,
					status: error.status,
					details: error.details,
				}
				: error

			setText(errorOutput, JSON.stringify(normalized, null, 2))
			setText(resultOutput, '-')
			refreshToken()
		}

		const toStringArray = (rawValue) =>
			String(rawValue ?? '')
				.split(',')
				.map(value => value.trim())
				.filter(Boolean)

		const getOptionalValue = (formData, key) => {
			const value = String(formData.get(key) ?? '').trim()
			return value ? value : null
		}

		const getSingleFile = (formData, key) => {
			const value = formData.get(key)
			return value instanceof File && value.size > 0 ? value : null
		}

		const getMultipleFiles = (formElement, key) => {
			const input = formElement.querySelector(\`input[name="\${key}"]\`)
			if (!(input instanceof HTMLInputElement) || !input.files) return []
			return Array.from(input.files).filter(file => file.size > 0)
		}

		const collectRequestPayload = (formElement, mode) => {
			const formData = new FormData(formElement)
			const base = {
				nomination: String(formData.get('nomination') ?? ''),
				status: String(formData.get('status') ?? ''),
				applicant_name: String(formData.get('applicant_name') ?? ''),
				applicant_last_name: String(formData.get('applicant_last_name') ?? ''),
				applicant_second_name: getOptionalValue(formData, 'applicant_second_name'),
				applicant_email: String(formData.get('applicant_email') ?? ''),
				applicant_phone: String(formData.get('applicant_phone') ?? ''),
				applicant_phone_confirmation_session: getOptionalValue(formData, 'applicant_phone_confirmation_session'),
				submitted_on_behalf_of_another_person: formData.get('submitted_on_behalf_of_another_person') === 'on',
				nominant_name: String(formData.get('nominant_name') ?? ''),
				nominant_last_name: String(formData.get('nominant_last_name') ?? ''),
				nominant_second_name: getOptionalValue(formData, 'nominant_second_name'),
				nominant_country: String(formData.get('nominant_country') ?? ''),
				nominant_settlement: String(formData.get('nominant_settlement') ?? ''),
				nominant_citizenship: String(formData.get('nominant_citizenship') ?? ''),
				nominant_birthdate: String(formData.get('nominant_birthdate') ?? ''),
				nominant_sex: String(formData.get('nominant_sex') ?? ''),
				form_participation: String(formData.get('form_participation') ?? ''),
				legal_name: getOptionalValue(formData, 'legal_name'),
				project_name: String(formData.get('project_name') ?? ''),
				project_description: String(formData.get('project_description') ?? ''),
				project_audience: String(formData.get('project_audience') ?? ''),
				project_growth_uniqueness: String(formData.get('project_growth_uniqueness') ?? ''),
				project_growth_significance: String(formData.get('project_growth_significance') ?? ''),
				project_growth_goals: String(formData.get('project_growth_goals') ?? ''),
				project_growth_support: String(formData.get('project_growth_support') ?? ''),
				project_growth_resources: String(formData.get('project_growth_resources') ?? ''),
				additional_links_social: toStringArray(formData.get('additional_links_social')),
				additional_links_video: toStringArray(formData.get('additional_links_video')),
				additional_links_media: toStringArray(formData.get('additional_links_media')),
				documents_agreement: formData.get('documents_agreement') === 'on',
				nominant_photo: getSingleFile(formData, 'nominant_photo'),
				additional_documents: getMultipleFiles(formElement, 'additional_documents'),
				documents_scan_pd: getSingleFile(formData, 'documents_scan_pd'),
				documents_scan_photo_video: getSingleFile(formData, 'documents_scan_photo_video'),
			}

			if (mode === 'update') {
				return Object.fromEntries(
					Object.entries(base).filter(([, value]) => {
						if (value === null || value === undefined) return false
						if (typeof value === 'string') return value.trim() !== ''
						if (Array.isArray(value)) return value.length > 0
						return true
					}),
				)
			}

			return base
		}

		const run = async (fn) => {
			try {
				const result = await fn()
				if (result && typeof result === 'object' && 'status' in result && result.status === 'error') {
					setError(result.payload)
					return
				}
				setResult(result)
			} catch (error) {
				setError(error)
			}
		}

		document.querySelector('#register-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)

			void run(() => api.auth.register({
				first_name: String(formData.get('first_name') ?? ''),
				last_name: String(formData.get('last_name') ?? ''),
				second_name_empty: formData.get('second_name_empty') === 'on',
				second_name: getOptionalValue(formData, 'second_name'),
				email: String(formData.get('email') ?? ''),
				password: String(formData.get('password') ?? ''),
				password_confirm: String(formData.get('password_confirm') ?? ''),
				agree_processing_personal_data: formData.get('agree_processing_personal_data') === 'on',
				want_receive_information: formData.get('want_receive_information') === 'on',
			}))
		})

		document.querySelector('#login-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)

			void run(() => api.auth.login({
				email: String(formData.get('email') ?? ''),
				password: String(formData.get('password') ?? ''),
			}))
		})

		document.querySelector('#request-get-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)

			void run(() => api.requests.getById(String(formData.get('id') ?? '')))
		})

		document.querySelector('#request-create-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return

			void run(() => api.requests.create(collectRequestPayload(form, 'create')))
		})

		document.querySelector('#request-update-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)
			const id = String(formData.get('id') ?? '')

			void run(() => api.requests.update(id, collectRequestPayload(form, 'update')))
		})

		for (const button of document.querySelectorAll('[data-action]')) {
			button.addEventListener('click', () => {
				const action = button.getAttribute('data-action')

				if (action === 'logout') {
					void run(() => api.auth.logout())
					return
				}

				if (action === 'getProfile') {
					void run(() => api.users.getProfile())
					return
				}

				if (action === 'getNominationsList') {
					void run(() => api.dictionaries.getNominationsList())
					return
				}

				if (action === 'getRequestStatusesList') {
					void run(() => api.dictionaries.getRequestStatusesList())
					return
				}

				if (action === 'requestsList') {
					void run(() => api.requests.list())
				}
			})
		}

		refreshToken()
	<\/script> `], [" ", `<section class="content"> <div class="inner-content py-[40px]"> <h1>API Test</h1> <p class="mt-[12px] max-w-[900px] text-[16px] leading-[1.5]">
Временная страница для ручной проверки \\\`api.auth\\\`, \\\`api.users\\\`, \\\`api.dictionaries\\\`,
				\\\`api.requests\\\`.
</p> <div class="mt-[24px] grid gap-[24px]"> <div> <div class="font-bold">Текущий токен</div> <pre id="token-output" class="mt-[8px] overflow-auto rounded border border-black/10 p-[12px] text-[12px] leading-[1.5] whitespace-pre-wrap">-</pre> </div> <div class="grid gap-[12px]"> <h2 class="text-[24px]">Auth</h2> <form id="register-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">register</div> <input name="first_name" placeholder="first_name" value="Иван"> <input name="last_name" placeholder="last_name" value="Иванов"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="second_name_empty" checked> second_name_empty</label> <input name="second_name" placeholder="second_name" value=""> <input name="email" type="email" placeholder="email"> <input name="password" type="password" placeholder="password"> <input name="password_confirm" type="password" placeholder="password_confirm"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="agree_processing_personal_data" checked> agree_processing_personal_data</label> <label class="flex items-center gap-[8px]"><input type="checkbox" name="want_receive_information"> want_receive_information</label> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run register</button> </form> <form id="login-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">login</div> <input name="email" type="email" placeholder="email"> <input name="password" type="password" placeholder="password"> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run login</button> </form> <div class="flex flex-wrap gap-[8px]"> <button data-action="logout" class="rounded bg-black px-[14px] py-[8px] text-white">logout</button> <button data-action="getProfile" class="rounded bg-black px-[14px] py-[8px] text-white">getProfile</button> <button data-action="getNominationsList" class="rounded bg-black px-[14px] py-[8px] text-white">getNominationsList</button> <button data-action="getRequestStatusesList" class="rounded bg-black px-[14px] py-[8px] text-white">getRequestStatusesList</button> <button data-action="requestsList" class="rounded bg-black px-[14px] py-[8px] text-white">requests.list</button> </div> </div> <div class="grid gap-[12px]"> <h2 class="text-[24px]">Requests</h2> <form id="request-get-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">requests.getById</div> <input name="id" placeholder="request id"> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run getById</button> </form> <form id="request-create-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">requests.create</div> <input name="nomination" placeholder="nomination"> <input name="status" placeholder="status"> <input name="applicant_name" placeholder="applicant_name"> <input name="applicant_last_name" placeholder="applicant_last_name"> <input name="applicant_second_name" placeholder="applicant_second_name"> <input name="applicant_email" type="email" placeholder="applicant_email"> <input name="applicant_phone" placeholder="applicant_phone"> <input name="applicant_phone_confirmation_session" placeholder="applicant_phone_confirmation_session"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="submitted_on_behalf_of_another_person"> submitted_on_behalf_of_another_person</label> <input name="nominant_name" placeholder="nominant_name"> <input name="nominant_last_name" placeholder="nominant_last_name"> <input name="nominant_second_name" placeholder="nominant_second_name"> <input name="nominant_country" placeholder="nominant_country"> <input name="nominant_settlement" placeholder="nominant_settlement"> <input name="nominant_citizenship" placeholder="nominant_citizenship"> <input name="nominant_birthdate" placeholder="nominant_birthdate"> <input name="nominant_sex" placeholder="nominant_sex"> <input name="form_participation" placeholder="form_participation"> <input name="legal_name" placeholder="legal_name"> <input name="project_name" placeholder="project_name"> <textarea name="project_description" placeholder="project_description"></textarea> <textarea name="project_audience" placeholder="project_audience"></textarea> <textarea name="project_growth_uniqueness" placeholder="project_growth_uniqueness"></textarea> <textarea name="project_growth_significance" placeholder="project_growth_significance"></textarea> <textarea name="project_growth_goals" placeholder="project_growth_goals"></textarea> <textarea name="project_growth_support" placeholder="project_growth_support"></textarea> <textarea name="project_growth_resources" placeholder="project_growth_resources"></textarea> <input name="additional_links_social" placeholder="additional_links_social, comma separated urls"> <input name="additional_links_video" placeholder="additional_links_video, comma separated urls"> <input name="additional_links_media" placeholder="additional_links_media, comma separated urls"> <label class="flex items-center gap-[8px]"><input type="checkbox" name="documents_agreement" checked> documents_agreement</label> <label class="grid gap-[4px]">nominant_photo <input name="nominant_photo" type="file"></label> <label class="grid gap-[4px]">additional_documents <input name="additional_documents" type="file" multiple></label> <label class="grid gap-[4px]">documents_scan_pd <input name="documents_scan_pd" type="file"></label> <label class="grid gap-[4px]">documents_scan_photo_video <input name="documents_scan_photo_video" type="file"></label> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run create</button> </form> <form id="request-update-form" class="grid gap-[8px] rounded border border-black/10 p-[16px]"> <div class="font-bold">requests.update</div> <input name="id" placeholder="request id"> <input name="project_name" placeholder="project_name"> <textarea name="project_description" placeholder="project_description"></textarea> <input name="status" placeholder="status"> <input name="additional_links_social" placeholder="additional_links_social, comma separated urls"> <label class="grid gap-[4px]">additional_documents <input name="additional_documents" type="file" multiple></label> <button type="submit" class="w-fit rounded bg-black px-[14px] py-[8px] text-white">Run update</button> </form> </div> <div> <div class="font-bold">Result</div> <pre id="result-output" class="mt-[8px] overflow-auto rounded border border-black/10 p-[12px] text-[12px] leading-[1.5] whitespace-pre-wrap">-</pre> </div> <div> <div class="font-bold">Error</div> <pre id="error-output" class="mt-[8px] overflow-auto rounded border border-black/10 p-[12px] text-[12px] leading-[1.5] whitespace-pre-wrap">-</pre> </div> </div> </div> </section> <script type="module">
		import { api, getAuthToken } from '@/lib/api'

		const tokenOutput = document.querySelector('#token-output')
		const resultOutput = document.querySelector('#result-output')
		const errorOutput = document.querySelector('#error-output')

		const setText = (element, value) => {
			if (!element) return
			element.textContent = value
		}

		const refreshToken = () => {
			setText(tokenOutput, getAuthToken() ?? 'null')
		}

		const setResult = (value) => {
			setText(resultOutput, JSON.stringify(value, null, 2))
			setText(errorOutput, '-')
			refreshToken()
		}

		const setError = (error) => {
			const normalized = error instanceof Error
				? {
					name: error.name,
					message: error.message,
					code: error.code,
					status: error.status,
					details: error.details,
				}
				: error

			setText(errorOutput, JSON.stringify(normalized, null, 2))
			setText(resultOutput, '-')
			refreshToken()
		}

		const toStringArray = (rawValue) =>
			String(rawValue ?? '')
				.split(',')
				.map(value => value.trim())
				.filter(Boolean)

		const getOptionalValue = (formData, key) => {
			const value = String(formData.get(key) ?? '').trim()
			return value ? value : null
		}

		const getSingleFile = (formData, key) => {
			const value = formData.get(key)
			return value instanceof File && value.size > 0 ? value : null
		}

		const getMultipleFiles = (formElement, key) => {
			const input = formElement.querySelector(\\\`input[name="\\\${key}"]\\\`)
			if (!(input instanceof HTMLInputElement) || !input.files) return []
			return Array.from(input.files).filter(file => file.size > 0)
		}

		const collectRequestPayload = (formElement, mode) => {
			const formData = new FormData(formElement)
			const base = {
				nomination: String(formData.get('nomination') ?? ''),
				status: String(formData.get('status') ?? ''),
				applicant_name: String(formData.get('applicant_name') ?? ''),
				applicant_last_name: String(formData.get('applicant_last_name') ?? ''),
				applicant_second_name: getOptionalValue(formData, 'applicant_second_name'),
				applicant_email: String(formData.get('applicant_email') ?? ''),
				applicant_phone: String(formData.get('applicant_phone') ?? ''),
				applicant_phone_confirmation_session: getOptionalValue(formData, 'applicant_phone_confirmation_session'),
				submitted_on_behalf_of_another_person: formData.get('submitted_on_behalf_of_another_person') === 'on',
				nominant_name: String(formData.get('nominant_name') ?? ''),
				nominant_last_name: String(formData.get('nominant_last_name') ?? ''),
				nominant_second_name: getOptionalValue(formData, 'nominant_second_name'),
				nominant_country: String(formData.get('nominant_country') ?? ''),
				nominant_settlement: String(formData.get('nominant_settlement') ?? ''),
				nominant_citizenship: String(formData.get('nominant_citizenship') ?? ''),
				nominant_birthdate: String(formData.get('nominant_birthdate') ?? ''),
				nominant_sex: String(formData.get('nominant_sex') ?? ''),
				form_participation: String(formData.get('form_participation') ?? ''),
				legal_name: getOptionalValue(formData, 'legal_name'),
				project_name: String(formData.get('project_name') ?? ''),
				project_description: String(formData.get('project_description') ?? ''),
				project_audience: String(formData.get('project_audience') ?? ''),
				project_growth_uniqueness: String(formData.get('project_growth_uniqueness') ?? ''),
				project_growth_significance: String(formData.get('project_growth_significance') ?? ''),
				project_growth_goals: String(formData.get('project_growth_goals') ?? ''),
				project_growth_support: String(formData.get('project_growth_support') ?? ''),
				project_growth_resources: String(formData.get('project_growth_resources') ?? ''),
				additional_links_social: toStringArray(formData.get('additional_links_social')),
				additional_links_video: toStringArray(formData.get('additional_links_video')),
				additional_links_media: toStringArray(formData.get('additional_links_media')),
				documents_agreement: formData.get('documents_agreement') === 'on',
				nominant_photo: getSingleFile(formData, 'nominant_photo'),
				additional_documents: getMultipleFiles(formElement, 'additional_documents'),
				documents_scan_pd: getSingleFile(formData, 'documents_scan_pd'),
				documents_scan_photo_video: getSingleFile(formData, 'documents_scan_photo_video'),
			}

			if (mode === 'update') {
				return Object.fromEntries(
					Object.entries(base).filter(([, value]) => {
						if (value === null || value === undefined) return false
						if (typeof value === 'string') return value.trim() !== ''
						if (Array.isArray(value)) return value.length > 0
						return true
					}),
				)
			}

			return base
		}

		const run = async (fn) => {
			try {
				const result = await fn()
				if (result && typeof result === 'object' && 'status' in result && result.status === 'error') {
					setError(result.payload)
					return
				}
				setResult(result)
			} catch (error) {
				setError(error)
			}
		}

		document.querySelector('#register-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)

			void run(() => api.auth.register({
				first_name: String(formData.get('first_name') ?? ''),
				last_name: String(formData.get('last_name') ?? ''),
				second_name_empty: formData.get('second_name_empty') === 'on',
				second_name: getOptionalValue(formData, 'second_name'),
				email: String(formData.get('email') ?? ''),
				password: String(formData.get('password') ?? ''),
				password_confirm: String(formData.get('password_confirm') ?? ''),
				agree_processing_personal_data: formData.get('agree_processing_personal_data') === 'on',
				want_receive_information: formData.get('want_receive_information') === 'on',
			}))
		})

		document.querySelector('#login-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)

			void run(() => api.auth.login({
				email: String(formData.get('email') ?? ''),
				password: String(formData.get('password') ?? ''),
			}))
		})

		document.querySelector('#request-get-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)

			void run(() => api.requests.getById(String(formData.get('id') ?? '')))
		})

		document.querySelector('#request-create-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return

			void run(() => api.requests.create(collectRequestPayload(form, 'create')))
		})

		document.querySelector('#request-update-form')?.addEventListener('submit', (event) => {
			event.preventDefault()
			const form = event.currentTarget
			if (!(form instanceof HTMLFormElement)) return
			const formData = new FormData(form)
			const id = String(formData.get('id') ?? '')

			void run(() => api.requests.update(id, collectRequestPayload(form, 'update')))
		})

		for (const button of document.querySelectorAll('[data-action]')) {
			button.addEventListener('click', () => {
				const action = button.getAttribute('data-action')

				if (action === 'logout') {
					void run(() => api.auth.logout())
					return
				}

				if (action === 'getProfile') {
					void run(() => api.users.getProfile())
					return
				}

				if (action === 'getNominationsList') {
					void run(() => api.dictionaries.getNominationsList())
					return
				}

				if (action === 'getRequestStatusesList') {
					void run(() => api.dictionaries.getRequestStatusesList())
					return
				}

				if (action === 'requestsList') {
					void run(() => api.requests.list())
				}
			})
		}

		refreshToken()
	<\/script> `])), maybeRenderHead()) })}`;
}, "/Users/mac/Documents/Work/React/evra2/src/pages/dev/api-test.astro", void 0);

const $$file = "/Users/mac/Documents/Work/React/evra2/src/pages/dev/api-test.astro";
const $$url = "/dev/api-test/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ApiTest,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
