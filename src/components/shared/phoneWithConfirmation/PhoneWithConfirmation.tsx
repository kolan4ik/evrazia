import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PhoneConfirmationModal } from './PhoneConfirmationModal'
import {
	CODE_DIGITS_COUNT,
	RESEND_TIMEOUT_SECONDS,
	formatPhoneValue,
	isPhoneValid,
	requestPhoneConfirmation,
	verifyPhoneConfirmationCode,
} from './phoneConfirmation.utils'

type PhoneWithConfirmationProps = {
	phone: string
	setPhone: (value: string) => void
	isConfirmed?: boolean
	setConfirmed?: (value: boolean) => void
	withConfirmation?: boolean
	disabled?: boolean
	placeholder?: string
}

export function PhoneWithConfirmation({
	phone,
	setPhone,
	isConfirmed = false,
	setConfirmed,
	withConfirmation = true,
	disabled = false,
	placeholder = 'Телефон',
}: PhoneWithConfirmationProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [verificationCode, setVerificationCode] = useState('')
	const [verificationStatus, setVerificationStatus] = useState<'idle' | 'error' | 'success'>('idle')
	const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT_SECONDS)
	const [isRequestingCode, setIsRequestingCode] = useState(false)
	const [isVerifyingCode, setIsVerifyingCode] = useState(false)
	const [internalConfirmed, setInternalConfirmed] = useState(isConfirmed)
	const [confirmedPhone, setConfirmedPhone] = useState(isConfirmed ? formatPhoneValue(phone) : '')
	const codeInputsRef = useRef<Array<HTMLInputElement | null>>([])

	const formattedPhone = useMemo(() => formatPhoneValue(phone), [phone])
	const phoneIsValid = useMemo(() => isPhoneValid(phone), [phone])
	const phoneMatchesConfirmed = Boolean(confirmedPhone) && confirmedPhone === formattedPhone
	const effectiveConfirmed = (setConfirmed ? isConfirmed : internalConfirmed) && phoneMatchesConfirmed
	const submitButtonDisabled = disabled || !phoneIsValid || isRequestingCode || isVerifyingCode || effectiveConfirmed

	const clearConfirmationState = () => {
		if (!confirmedPhone && !effectiveConfirmed && !internalConfirmed && !isConfirmed) {
			return
		}

		setConfirmedPhone('')
		setConfirmed?.(false)
		setInternalConfirmed(false)
	}

	useEffect(() => {
		if (!isModalOpen || secondsLeft <= 0) {
			return
		}

		const timeoutId = window.setTimeout(() => {
			setSecondsLeft(previousValue => previousValue - 1)
		}, 1000)

		return () => window.clearTimeout(timeoutId)
	}, [isModalOpen, secondsLeft])

	useEffect(() => {
		if (!setConfirmed) {
			setInternalConfirmed(isConfirmed)
		}
	}, [isConfirmed, setConfirmed])

	useEffect(() => {
		if (effectiveConfirmed) {
			setConfirmedPhone(formattedPhone)
			return
		}

		if (confirmedPhone && confirmedPhone !== formattedPhone) {
			clearConfirmationState()
		}
	}, [confirmedPhone, effectiveConfirmed, formattedPhone])

	useEffect(() => {
		if (!isModalOpen || verificationStatus === 'success') {
			return
		}

		const focusIndex = Math.min(verificationCode.length, CODE_DIGITS_COUNT - 1)
		codeInputsRef.current[focusIndex]?.focus()
	}, [isModalOpen, verificationCode, verificationStatus])

	const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextPhone = formatPhoneValue(event.target.value)

		setPhone(nextPhone)

		if (confirmedPhone && confirmedPhone !== nextPhone) {
			clearConfirmationState()
		}
	}

	const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = new Set([
			'Backspace',
			'Delete',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			'Home',
			'End',
		])

		if (event.ctrlKey || event.metaKey) {
			return
		}

		if (allowedKeys.has(event.key)) {
			return
		}

		if (/^\d$/.test(event.key)) {
			return
		}

		if (event.key === '+' && event.currentTarget.selectionStart === 0) {
			return
		}

		event.preventDefault()
	}

	const openModal = async () => {
		if (submitButtonDisabled) {
			return
		}

		setIsRequestingCode(true)
		setVerificationCode('')
		setVerificationStatus('idle')
		setSecondsLeft(RESEND_TIMEOUT_SECONDS)
		setIsModalOpen(true)

		await requestPhoneConfirmation()
		setIsRequestingCode(false)
	}

	const closeModal = () => {
		if (isVerifyingCode) {
			return
		}

		setIsModalOpen(false)
		setVerificationCode('')
		setVerificationStatus('idle')
		setSecondsLeft(RESEND_TIMEOUT_SECONDS)
	}

	const handleCodeInput = (index: number, nextValue: string) => {
		const digit = nextValue.replace(/\D/g, '').slice(-1)
		const nextCode = verificationCode.split('')

		if (!digit) {
			nextCode[index] = ''
			setVerificationCode(nextCode.join(''))
			setVerificationStatus('idle')
			return
		}

		nextCode[index] = digit
		const preparedCode = nextCode.join('').slice(0, CODE_DIGITS_COUNT)

		setVerificationCode(preparedCode)
		setVerificationStatus('idle')

		if (index < CODE_DIGITS_COUNT - 1) {
			codeInputsRef.current[index + 1]?.focus()
		}
	}

	const handleCodeKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Backspace') {
			return
		}

		if (verificationCode[index]) {
			return
		}

		if (index > 0) {
			const nextCode = verificationCode.split('')
			nextCode[index - 1] = ''
			setVerificationCode(nextCode.join(''))
			setVerificationStatus('idle')
			codeInputsRef.current[index - 1]?.focus()
		}
	}

	const handleCodePaste = (event: ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault()

		const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_DIGITS_COUNT)

		if (!pastedDigits) {
			return
		}

		setVerificationCode(pastedDigits)
		setVerificationStatus('idle')
		codeInputsRef.current[Math.min(pastedDigits.length, CODE_DIGITS_COUNT) - 1]?.focus()
	}

	const handleVerify = async () => {
		if (verificationCode.length !== CODE_DIGITS_COUNT || isVerifyingCode) {
			return
		}

		setIsVerifyingCode(true)
		const result = await verifyPhoneConfirmationCode()
		setIsVerifyingCode(false)

		if (result.status === 'success') {
			setVerificationStatus('success')
			setConfirmedPhone(formattedPhone)
			setConfirmed?.(true)
			setInternalConfirmed(true)
			return
		}

		setVerificationStatus('error')
	}

	const handleResend = async () => {
		if (secondsLeft > 0 || isRequestingCode) {
			return
		}

		setIsRequestingCode(true)
		setVerificationStatus('idle')
		setVerificationCode('')
		setSecondsLeft(RESEND_TIMEOUT_SECONDS)

		await requestPhoneConfirmation()
		setIsRequestingCode(false)
		codeInputsRef.current[0]?.focus()
	}

	return (
		<>
			<div className={`relative flex items-start ${withConfirmation ? 'gap-[18px]' : 'gap-0'}`}>
				<div className='min-w-0 flex-1'>
					<input
						className='form-control'
						type='text'
						inputMode='numeric'
						autoComplete='tel'
						placeholder={placeholder}
						value={formattedPhone}
						onChange={handlePhoneChange}
						onKeyDown={handlePhoneKeyDown}
						disabled={disabled}
					/>
				</div>

				{withConfirmation ? (
					<button
						type='button'
						onClick={openModal}
						disabled={submitButtonDisabled}
						className={`action-btn mt-0! shrink-0 normal-case! h-[38px]! w-[114px]! text-[14px]! leading-[14px]! font-medium! ${submitButtonDisabled || effectiveConfirmed ? 'disabled' : ''}`}
					>
						{effectiveConfirmed ? 'Подтвержден' : isRequestingCode ? 'Отправка...' : 'Получить код'}
					</button>
				) : null}
			</div>

			{withConfirmation ? (
				<PhoneConfirmationModal
					isOpen={isModalOpen}
					verificationStatus={verificationStatus}
					verificationCode={verificationCode}
					secondsLeft={secondsLeft}
					isRequestingCode={isRequestingCode}
					isVerifyingCode={isVerifyingCode}
					codeInputsRef={codeInputsRef}
					onClose={closeModal}
					onCodeInput={handleCodeInput}
					onCodeKeyDown={handleCodeKeyDown}
					onCodePaste={handleCodePaste}
					onVerify={handleVerify}
					onResend={handleResend}
				/>
			) : null}
		</>
	)
}
