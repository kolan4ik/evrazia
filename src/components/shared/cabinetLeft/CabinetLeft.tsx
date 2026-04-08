import type { ProfileResponseData } from '@/lib/api'

const events = [
	{
		href: '#',
		text: 'Редактировать профиль',
	},
	{
		href: '#',
		text: 'Изменить пароль',
	},
]

//  =============================

type Props = {
	profile: ProfileResponseData
}

export default function CabinetLeft(props: Props) {
	const { profile } = props

	return (
		<div
			className={
				'flex flex-col gap-[30px] max-[1000px]:flex-row max-[1000px]:items-start  shrink-0 text-text-base min-w-[240px]'
			}
		>
			<img
				src={'/images/user.svg'}
				className='rounded-[30px] mb-2 object-cover bg-[#D9D9D9] shrink-0 w-[150px] aspect-square max-[1000px]:w-[200px] max-[800px]:w-[150px]'
			/>

			<div className='flex flex-col'>
				<div className='text-[22px] max-[1000px]:text-[16px] w-2 mb-2'>
					{profile.name} {profile.lastName}
				</div>
				<div className={'text-lg underline  max-[1000px]:text-[14px]'}>{profile.email}</div>
				<div className={'text-lg  max-[1000px]:text-[14px]'}>ID: {profile.id}</div>

				<div className={'flex flex-col gap-4.5 mt-9'}>
					{events.map(item => (
						<a
							key={item.text}
							className={'text-sm font-medium text-text-base hover:text-accent underline'}
							href={item.href}
						>
							{item.text}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
