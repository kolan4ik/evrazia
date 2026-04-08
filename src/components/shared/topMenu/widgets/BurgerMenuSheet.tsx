import type { CSSProperties } from 'react'
import { useState } from 'react'

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

import { TOP_MENU_LINKS, type TopMenuLink } from '../data/menuLinks'

type Props = {
	type?: 'sticky' | 'lightBg'
	burgerIcon: string
	links?: TopMenuLink[]
}

const SOCIALS = [
	{ icon: '/images/tg.svg', alt: 'Telegram' },
	{ icon: '/images/vk.svg', alt: 'VK' },
	{ icon: '/images/msg.svg', alt: 'Messenger' },
]

export default function BurgerMenuSheet({ type, burgerIcon, links = TOP_MENU_LINKS }: Props) {
	const [open, setOpen] = useState(false)
	const isSticky = type === 'sticky'
	const isLightBg = type === 'lightBg'

	return (
		<div className={cn('burger-menu', isSticky && 'sticky', isLightBg && 'dark-mode')}>
			<Sheet
				open={open}
				onOpenChange={setOpen}
			>
				<SheetTrigger asChild>
					<button
						type='button'
						className='burger transition-colors duration-200'
						style={{ '--burger-icon': `url('${burgerIcon}')` } as CSSProperties}
						aria-label='Открыть меню'
					>
						<span
							className='burger__icon'
							aria-hidden='true'
						/>
					</button>
				</SheetTrigger>

				<SheetContent
					side='left'
					showCloseButton={false}
					overlayClassName='z-[900] bg-black/20 supports-backdrop-filter:backdrop-blur-none duration-200'
					className='burger-menu__panel z-[910]! gap-0 border-none p-0 shadow-none data-[side=left]:w-[min(80vw,340px)] data-[side=left]:max-w-none data-[side=left]:border-r-0 data-[side=left]:sm:max-w-none'
				>
					<SheetTitle className='sr-only'>Навигационное меню</SheetTitle>
					<SheetDescription className='sr-only'>Список разделов сайта и контактов премии «Евразия».</SheetDescription>

					<div className='burger-menu__scroll'>
						<div className='burger-menu__top'>
							<SheetClose asChild>
								<a
									href='/'
									className='burger-menu__logo'
								>
									<img
										src='/images/burger-menu/logo.svg'
										alt='Евразия'
									/>
								</a>
							</SheetClose>

							<SheetClose asChild>
								<button
									type='button'
									className='burger-menu__close'
									aria-label='Закрыть меню'
								>
									<img
										src='/images/burger-menu/close.svg'
										alt='Закрыть'
									/>
								</button>
							</SheetClose>
						</div>

						<nav className='burger-menu__links'>
							{links.map(link => (
								<SheetClose
									asChild
									key={link.href}
								>
									<a
										href={link.href}
										className='burger-menu__link'
									>
										{link.label}
									</a>
								</SheetClose>
							))}
						</nav>

						<div className='burger-menu__contacts'>
							<div className='burger-menu__contacts-title'>Контактный центр</div>
							<a
								href='tel:+78005051823'
								className='burger-menu__phone'
							>
								8 (800) 505-18-23
							</a>
							<a
								href='tel:+74958016200'
								className='burger-menu__phone'
							>
								+7 (495) 801 62 00
							</a>
							<div className='burger-menu__schedule'>Пн-Пт, 10:00-19:00 (МСК)</div>
						</div>

						<div className='burger-menu__socials social-icons'>
							{SOCIALS.map(social => (
								<img
									key={social.alt}
									src={social.icon}
									alt={social.alt}
									className='social-icons__item'
								/>
							))}
						</div>

						<div className='burger-menu__emails'>
							<div className='burger-menu__email-block'>
								<div className='burger-menu__email-label'>Орг. комитет:</div>
								<a
									href='mailto:org@premiyaevrazia.su'
									className='burger-menu__email-link'
								>
									org@premiyaevrazia.su
								</a>
							</div>
							<div className='burger-menu__email-block'>
								<div className='burger-menu__email-label'>Тех. поддержка:</div>
								<a
									href='mailto:support@premiyaevrazia.su'
									className='burger-menu__email-link'
								>
									support@premiyaevrazia.su
								</a>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
