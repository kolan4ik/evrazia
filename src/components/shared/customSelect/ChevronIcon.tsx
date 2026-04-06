type ChevronIconProps = {
	className?: string
}

export function ChevronIcon({ className }: ChevronIconProps) {
	return (
		<svg
			className={className}
			width='20'
			height='11'
			viewBox='0 0 20 11'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d='M18.7695 0.461095L9.61953 9.62109L0.459533 0.461093'
				stroke='currentColor'
				strokeWidth='1.3'
				strokeMiterlimit='10'
			/>
		</svg>
	)
}
