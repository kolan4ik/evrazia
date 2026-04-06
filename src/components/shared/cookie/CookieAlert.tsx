import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'

const COOKIE_NAME = 'eurasia_cookie'
const COOKIE_VALUE = 'accepted'
const COOKIE_MAX_AGE = 315360000
const EXIT_ANIMATION_MS = 300
const COOKIE_SYNC_KEY = 'eurasia_cookie_sync'

function hasCookie(name: string) {
	return document.cookie
		.split(';')
		.map(item => item.trim())
		.some(item => item.startsWith(`${name}=`))
}

function setCookie(name: string, value: string) {
	document.cookie = `${name}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
}

function broadcastCookieAccepted() {
	try {
		localStorage.setItem(COOKIE_SYNC_KEY, String(Date.now()))
	} catch {
		// ignore: storage can be unavailable in private/restricted mode
	}
}

export default function CookieAlert() {
	const [isMounted, setIsMounted] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [isClosing, setIsClosing] = useState(false)

	const closeBanner = useCallback(
		(persist = true) => {
			if (isClosing) {
				return
			}

			if (persist) {
				setCookie(COOKIE_NAME, COOKIE_VALUE)
				broadcastCookieAccepted()
			}

			setIsClosing(true)
			setIsVisible(false)

			window.setTimeout(() => {
				setIsMounted(false)
			}, EXIT_ANIMATION_MS)
		},
		[isClosing],
	)

	useEffect(() => {
		if (hasCookie(COOKIE_NAME)) {
			return
		}

		setIsMounted(true)
		requestAnimationFrame(() => {
			setIsVisible(true)
		})

		const onStorage = (event: StorageEvent) => {
			if (event.key !== COOKIE_SYNC_KEY) {
				return
			}

			if (hasCookie(COOKIE_NAME)) {
				closeBanner(false)
			}
		}

		window.addEventListener('storage', onStorage)
		return () => {
			window.removeEventListener('storage', onStorage)
		}
	}, [closeBanner])

	if (!isMounted) {
		return null
	}

	return (
		<div
			className={cn(
				`fixed inset-x-0 bottom-0 z-2147483647 transition-transform duration-300 ease-out`,
				'w-full bg-accent text-white-text ',
				'px-[40px] pt-[15px] pb-[25px]',
				'text-[14px] leading-[22px]',
				{ ['translate-y-0']: isVisible },
				{ ['translate-y-full']: !isVisible },
				'flex flex-row justify-between items-center gap-[40px]',
				'max-[1200px]:flex-col max-[1200px]:relative max-[1200px]:gap-[10px] max-[1200px]:items-start max-[1200px]:text-[12px] max-[1200px]:leading-[18px]',
				'max-[700px]:p-[20px] max-[700px]:text-[10px] max-[700px]:leading-[14px]',
			)}
		>
			<div className='flex flex-row gap-[20px]'>
				<div className='flex grow'>
					Мы используем файлы cookie для удобства пользованием сайта и сбора статистики в метрической программе
					Яндекс.Метрика. Продолжая пользоваться сайтом вы соглашаетесь с "Положением об обработке персональных данных"
					и даете "Согласие на обработку персональных данных", собираемых метрическими программами.
				</div>
				<div className='hidden min-[700px]:flex min-[1200px]:hidden justify-start items-end flex-col relative -top-[4px] -right-[6px]'>
					<button
						type='button'
						aria-label='Закрыть баннер cookie'
						onClick={() => closeBanner()}
						className='cursor-pointer hover:opacity-80 '
					>
						<CloseBtn />
					</button>
				</div>
			</div>
			<div className='flex flex-row justify-between items-center min-[1200px]:w-[550px] min-[1200px]:min-w-[550px] max-[1200px]:justify-start max-[1200px]:gap-[20px] max-[700px]:justify-between max-[700px]:gap-[10px] w-full'>
				<button
					type='button'
					onClick={() => closeBanner()}
					className={cn(
						'h-[38px] w-[80px] border border-white-text rounded-[6px] cursor-pointer hover:opacity-80',
						'max-[1200px]:h-[28px] max-[1200px]:w-[64px] max-[1200px]:text-[10px]! ',
					)}
					>
						Принять
					</button>
					<div className='max-[1200px]:text-[10px]'>Мы используем cookie для работы сайта.</div>
					<button
						type='button'
						aria-label='Закрыть баннер cookie'
					onClick={() => closeBanner()}
					className='cursor-pointer hover:opacity-80 flex min-[700px]:hidden min-[1200px]:flex'
				>
					<CloseBtn />
				</button>
			</div>
		</div>
	)
}

function CloseBtn() {
	return (
		<svg
			width='43'
			height='43'
			viewBox='0 0 43 43'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M31.8201 10.606C25.9623 4.74812 16.4648 4.74812 10.6069 10.606C4.74905 16.4638 4.74905 25.9613 10.6069 31.8192C16.4648 37.677 25.9622 37.677 31.8201 31.8192C37.678 25.9613 37.678 16.4638 31.8201 10.606Z'
				stroke='#EBEBEB'
				stroke-width='1.3'
				stroke-miterlimit='10'
			/>
			<path
				d='M28.6354 13.4902L13.9047 28.2209'
				stroke='#EBEBEB'
				stroke-width='1.3'
			/>
			<path
				d='M28.6354 28.6387L13.9047 13.908'
				stroke='#EBEBEB'
				stroke-width='1.3'
			/>
		</svg>
	)
}
