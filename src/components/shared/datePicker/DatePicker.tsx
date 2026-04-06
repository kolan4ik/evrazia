'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format, getYear, isValid, parse, setMonth, setYear } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarDaysIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import styles from './DatePicker.module.css'

type DatePickerProps = {
	date: string
	setDate: (value: string) => void
	placeholder?: string
}

const INPUT_PLACEHOLDER = 'ГГГГ-ММ-ДД'
const MIN_YEAR = 1900
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => ({
	value: index,
	label: format(new Date(2024, index, 1), 'LLLL', { locale: ru }),
}))

function getToday() {
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	return today
}

function formatInputValue(value: string) {
	const digits = value.replace(/\D/g, '').slice(0, 8)

	if (digits.length <= 4) {
		return digits
	}

	if (digits.length <= 6) {
		return `${digits.slice(0, 4)}-${digits.slice(4)}`
	}

	return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
}

function parseDateString(value: string) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return null
	}

	const parsed = parse(value, 'yyyy-MM-dd', new Date())

	if (!isValid(parsed)) {
		return null
	}

	return format(parsed, 'yyyy-MM-dd') === value ? parsed : null
}

export function DatePicker({ date, setDate, placeholder = 'Дата рождения' }: DatePickerProps) {
	const [open, setOpen] = useState(false)
	const [draft, setDraft] = useState(date)
	const [isFocused, setIsFocused] = useState(false)
	const today = useMemo(() => getToday(), [])
	const selectedDate = useMemo(() => parseDateString(date), [date])
	const draftDate = useMemo(() => parseDateString(draft), [draft])
	const activeDate = useMemo(() => {
		if (draftDate && draftDate <= today) {
			return draftDate
		}

		if (selectedDate && selectedDate <= today) {
			return selectedDate
		}

		return null
	}, [draftDate, selectedDate, today])
	const [displayMonth, setDisplayMonth] = useState<Date>(selectedDate ?? today)
	const yearOptions = useMemo(
		() => Array.from({ length: getYear(today) - MIN_YEAR + 1 }, (_, index) => getYear(today) - index),
		[today],
	)

	useEffect(() => {
		setDraft(date)
	}, [date])

	useEffect(() => {
		if (activeDate) {
			setDisplayMonth(activeDate)
			return
		}

		setDisplayMonth(today)
	}, [activeDate, today])

	const commitManualValue = (nextDraft: string) => {
		const parsed = parseDateString(nextDraft)

		if (!parsed) {
			return false
		}

		if (parsed > today) {
			return false
		}

		setDate(nextDraft)
		return true
	}

	const handleMonthChange = (nextMonthIndex: number) => {
		const nextMonth = setMonth(displayMonth, nextMonthIndex)
		setDisplayMonth(nextMonth > today ? today : nextMonth)
	}

	const handleYearChange = (nextYear: number) => {
		const nextMonth = setYear(displayMonth, nextYear)
		setDisplayMonth(nextMonth > today ? today : nextMonth)
	}

	const handleInputChange = (value: string) => {
		const formattedValue = formatInputValue(value)
		setDraft(formattedValue)

		if (formattedValue.length < INPUT_PLACEHOLDER.length) {
			setDate(formattedValue)
			return
		}

		if (!commitManualValue(formattedValue)) {
			return
		}
	}

	const handleInputBlur = () => {
		setIsFocused(false)

		if (!draft) {
			setDate('')
			return
		}

		if (draft.length < INPUT_PLACEHOLDER.length) {
			setDraft(date)
			return
		}

		if (!commitManualValue(draft)) {
			setDraft(date)
		}
	}

	const handleCalendarSelect = (value: Date | undefined) => {
		if (!value) {
			return
		}

		const nextDate = format(value, 'yyyy-MM-dd')
		setDate(nextDate)
		setDraft(nextDate)
		setOpen(false)
	}

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<div className='relative flex flex-col'>
				<div className='relative'>
					<input
						className='form-control pr-[52px]!'
						type='text'
						inputMode='numeric'
						placeholder={isFocused ? INPUT_PLACEHOLDER : placeholder}
						value={draft}
						maxLength={INPUT_PLACEHOLDER.length}
						onChange={event => handleInputChange(event.target.value)}
						onFocus={() => setIsFocused(true)}
						onBlur={handleInputBlur}
					/>

					<PopoverTrigger asChild>
						<button
							type='button'
							className={cn(
								'absolute right-[18px] top-[16px] flex items-center justify-center text-accent transition-colors duration-200 hover:text-[#A87242]',
								'max-[768px]:right-[12px] max-[768px]:top-[14px]',
							)}
							aria-label='Выбрать дату'
						>
							<CalendarDaysIcon className='size-5 max-[768px]:size-4' />
						</button>
					</PopoverTrigger>
				</div>

				<PopoverContent
					align='end'
					side='bottom'
					sideOffset={12}
					collisionPadding={{ right: 20, left: 12, top: 12, bottom: 12 }}
					className={styles.popover}
				>
					<div className='mb-4 flex items-center gap-2 max-[768px]:mb-3'>
						<label
							className='sr-only'
							htmlFor='date-picker-month'
						>
							Месяц
						</label>
						<select
							id='date-picker-month'
							value={displayMonth.getMonth()}
							onChange={event => handleMonthChange(Number(event.target.value))}
							className='h-10 min-w-0 flex-1 rounded-full border border-[#dcdcdc] bg-white px-4 text-[16px] font-medium text-[#152551] outline-none transition-colors focus:border-[var(--accent)]'
						>
							{MONTH_OPTIONS.map(month => (
								<option
									key={month.value}
									value={month.value}
								>
									{month.label}
								</option>
							))}
						</select>

						<label
							className='sr-only'
							htmlFor='date-picker-year'
						>
							Год
						</label>
						<select
							id='date-picker-year'
							value={displayMonth.getFullYear()}
							onChange={event => handleYearChange(Number(event.target.value))}
							className='h-10 w-[112px] shrink-0 rounded-full border border-[#dcdcdc] bg-white px-4 text-[16px] font-medium text-[#152551] outline-none transition-colors focus:border-[var(--accent)]'
						>
							{yearOptions.map(year => (
								<option
									key={year}
									value={year}
								>
									{year}
								</option>
							))}
						</select>
					</div>

					<Calendar
						mode='single'
						locale={ru}
						month={displayMonth}
						onMonthChange={setDisplayMonth}
						selected={activeDate ?? undefined}
						onSelect={handleCalendarSelect}
						disabled={{ after: today }}
						startMonth={new Date(MIN_YEAR, 0, 1)}
						endMonth={today}
						hideNavigation
						className={styles.calendar}
						classNames={{
							month_caption: 'hidden',
							caption_label: 'hidden',
							nav: 'hidden',
							button_previous:
								'flex size-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#949494] hover:bg-[#f5f5f5] hover:text-accent',
							button_next:
								'flex size-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#949494] hover:bg-[#f5f5f5] hover:text-accent',
							weekdays: 'mb-2 flex',
							weekday: 'flex-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[#949494]',
							week: 'mt-1 flex w-full',
							day: 'relative aspect-square h-full w-full p-0 text-center',
							today: 'rounded-full bg-[#f5f5f5] text-[#152551]',
							selected: 'rounded-full bg-[var(--accent)] text-white hover:bg-[#A87242]',
							disabled: 'text-[#d0d0d0] opacity-100',
							outside: 'text-[#d0d0d0]',
						}}
						components={{
							DayButton: ({ className, ...props }) => (
								<button
									type='button'
									className={cn(
										'flex size-10 items-center justify-center rounded-full border-0 bg-transparent text-[14px] font-normal text-[#152551] transition-colors outline-none hover:bg-[#f5f5f5] hover:text-accent',
										'aria-selected:bg-[var(--accent)] aria-selected:text-white',
										'max-[768px]:size-9 max-[768px]:text-[12px]',
										className,
									)}
									{...props}
								/>
							),
						}}
					/>
				</PopoverContent>
			</div>
		</Popover>
	)
}
