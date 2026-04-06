import { PATHS } from '@/configs/paths'

export type TopMenuLink = {
	label: string
	href: string
}

export const TOP_MENU_LINKS: TopMenuLink[] = [
	{ label: 'Номинации', href: '/#nominations' },
	{ label: 'Этапы', href: '/#steps' },
	{ label: 'Документы', href: '#docs' },
	{ label: 'Подать заявку', href: PATHS.participantForm },
]
