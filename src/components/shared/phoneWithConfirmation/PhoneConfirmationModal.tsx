import type { ClipboardEvent, KeyboardEvent, RefObject } from 'react'
import type { VerificationStatus } from './phoneConfirmation.utils'
import { CODE_DIGITS_COUNT, formatTimer } from './phoneConfirmation.utils'

type PhoneConfirmationModalProps = {
	isOpen: boolean
	verificationStatus: VerificationStatus
	verificationCode: string
	secondsLeft: number
	isRequestingCode: boolean
	isVerifyingCode: boolean
	codeInputsRef: RefObject<Array<HTMLInputElement | null>>
	onClose: () => void
	onCodeInput: (index: number, nextValue: string) => void
	onCodeKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void
	onCodePaste: (event: ClipboardEvent<HTMLInputElement>) => void
	onVerify: () => void
	onResend: () => void
}

export function PhoneConfirmationModal({
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
	onResend,
}: PhoneConfirmationModalProps) {
	if (!isOpen) {
		return null
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(18,28,48,0.08)] px-[16px]'
			onClick={onClose}
		>
			<div
				className='relative flex w-full max-w-[540px] flex-col rounded-[26px] bg-white px-[20px] pt-[20px] pb-[60px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] max-[768px]:rounded-[22px]'
				style={{ minHeight: 476 }}
				onClick={event => event.stopPropagation()}
			>
				<div className='shrink-0'>
					<button
						type='button'
						aria-label='Закрыть подтверждение телефона'
						onClick={onClose}
						className='absolute right-[20px] top-[20px] flex h-[43px] w-[43px] cursor-pointer items-center justify-center bg-transparent transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40'
						disabled={isVerifyingCode}
					>
						<CloseIcon />
					</button>

					<div className='pr-[56px] text-left text-[18px] font-medium leading-[24px] text-[#233a72]'>
						Подтвердите номер телефона
					</div>
				</div>

				<div className='flex flex-1 flex-col items-center'>
					{verificationStatus === 'success' ? (
						<div className='flex flex-1 items-center justify-center text-center text-[18px] font-medium leading-[1.2] text-[#d09b52] max-[768px]:text-[14px]'>
							Номер подтверждён
						</div>
					) : (
						<div className='flex w-full flex-col items-center pt-[30px]'>
							<div className='max-w-[360px] text-center text-[14px] font-normal leading-[20px] text-[#233a72]'>
								Мы позвоним вам. Отвечать на звонок не нужно.
								<br />
								Введите последние 4 цифры звонящего номера.
							</div>

							<div
								className={`mt-[20px] min-h-[34px] text-center text-[18px] font-medium leading-[24px] ${verificationStatus === 'error' ? 'text-[#d09b52]' : 'text-transparent'}`}
							>
								{verificationStatus === 'error' ? 'Неверный код. Попробуйте ещё раз' : '.'}
							</div>

							<div className='mt-[8px] flex items-center justify-center gap-[12px] max-[768px]:gap-[8px]'>
								{Array.from({ length: CODE_DIGITS_COUNT }).map((_, index) => (
									<input
										key={index}
										ref={element => {
											codeInputsRef.current[index] = element
										}}
										type='text'
										inputMode='numeric'
										autoComplete='one-time-code'
										maxLength={1}
										value={verificationCode[index] ?? ''}
										onChange={event => onCodeInput(index, event.target.value)}
										onKeyDown={event => onCodeKeyDown(index, event)}
										onPaste={onCodePaste}
										disabled={isVerifyingCode || isRequestingCode}
										className='m-0! h-[70px]! w-[50px]! rounded-[12px]! border! border-[#dcdcdc]! bg-white! p-0! text-center text-[28px]! font-medium leading-none text-[#233a72] outline-none transition-colors focus:border-[#233a72]! disabled:bg-[#f1f1f1]!'
									/>
								))}
							</div>

							<div className='mt-[20px] min-h-[24px] text-center text-[14px] font-regular leading-[20px] text-[#a8a8a8]'>
								{secondsLeft > 0 ? (
									<>Повторить звонок через {formatTimer(secondsLeft)}</>
								) : (
									<button
										type='button'
										onClick={onResend}
										className='text-[#233a72] underline underline-offset-[4px] transition-opacity hover:opacity-80'
										disabled={isRequestingCode}
									>
										Получить звонок повторно
									</button>
								)}
							</div>
						</div>
					)}
				</div>

				<div className='flex shrink-0 justify-center pt-[32px]'>
					{verificationStatus === 'success' ? (
						<button
							type='button'
							onClick={onClose}
							className='action-btn mt-0! w-full! max-w-[160px]! self-center'
						>
							Закрыть
						</button>
					) : (
						<button
							type='button'
							onClick={onVerify}
							disabled={verificationCode.length !== CODE_DIGITS_COUNT || isVerifyingCode}
							className={`action-btn mt-0! w-full! max-w-[216px]! self-center ${verificationCode.length !== CODE_DIGITS_COUNT || isVerifyingCode ? 'disabled' : ''}`}
							style={{
								backgroundColor:
									verificationCode.length === CODE_DIGITS_COUNT && !isVerifyingCode ? '#d09b52' : '#cfcfcf',
							}}
						>
							{isVerifyingCode ? 'Проверка...' : 'Подтвердить'}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

function CloseIcon() {
	return (
		<svg
			width='43'
			height='43'
			viewBox='0 0 43 43'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M31.8221 10.606C25.9642 4.74812 16.4667 4.74812 10.6089 10.606C4.751 16.4638 4.751 25.9613 10.6089 31.8192C16.4667 37.677 25.9642 37.677 31.8221 31.8192C37.6799 25.9613 37.6799 16.4638 31.8221 10.606Z'
				stroke='#C5985E'
				strokeWidth='1.3'
				strokeMiterlimit='10'
			/>
			<path
				d='M28.6412 13.4922L13.9106 28.2228'
				stroke='#C5985E'
				strokeWidth='1.3'
			/>
			<path
				d='M28.6373 28.6406L13.9067 13.91'
				stroke='#C5985E'
				strokeWidth='1.3'
			/>
		</svg>
	)
}
