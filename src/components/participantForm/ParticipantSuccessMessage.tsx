export function ParticipantSuccessMessage() {
	return (
		<div className='min-h-[420px] flex items-start justify-center text-center pt-[40px]'>
			<div className='max-w-[700px]'>
				<h2 className='!text-[42px] !leading-[1.1] max-[700px]:!text-[28px]'>Заявка отправлена</h2>
				<div className='mt-[18px] text-[24px] leading-[1.4] text-[#152551] max-[700px]:text-[18px]'>
					Спасибо. Мы получили вашу заявку и свяжемся с вами после проверки данных и документов.
				</div>
			</div>
		</div>
	)
}
