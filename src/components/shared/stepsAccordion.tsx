import { cn } from '@/lib/utils'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import * as React from 'react'

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
	number?: string
}

const AccordionItemNumberContext = React.createContext<string>('')
const AccordionItemNumberNodeContext = React.createContext<React.ReactNode>(null)
const AccordionItemMetaContext = React.createContext<React.ReactNode>(null)

const triggerLayoutClassName = cn(
	'group grid w-full items-start text-left outline-none transition-all',
	'gap-x-6 text-[24px]! leading-[24px] grid-cols-[120px_1fr_auto]',
	'max-[1200px]:gap-x-4 max-[1200px]:text-[20px]! max-[1200px]:leading-[24px]! max-[1200px]:grid-cols-[84px_1fr_auto]',
	'max-[700px]:gap-x-0 max-[700px]:text-[16px]! max-[700px]:leading-[20px]! max-[700px]:grid-cols-[70px_1fr_60px] max-[700px]:grid-rows-[auto_auto]',
	'max-[435px]:text-[14px]! max-[435px]:leading-[18px]! max-[435px]:grid-cols-[56px_1fr_44px]',
	'max-[360px]:text-[13px]! max-[360px]:leading-[17px]! max-[360px]:grid-cols-[48px_1fr_40px]',
)

const numberWrapClassName = cn(
	'flex w-[120px] justify-start',
	'max-[1200px]:w-[84px]',
	'max-[700px]:row-span-2 max-[700px]:w-[70px]',
	'max-[435px]:w-[56px]',
	'max-[360px]:w-[48px]',
)

const metaGridClassName = cn(
	'min-w-0 grid items-start gap-x-6 text-white-text transition-colors group-data-[state=open]:text-white-text grid-cols-[250px_max-content]',
	'max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:pr-[12px]',
	'max-[435px]:gap-x-2 max-[435px]:pr-[8px] max-[435px]:grid-cols-[minmax(0,1fr)_minmax(112px,max-content)]',
	'max-[360px]:gap-x-1.5 max-[360px]:pr-[6px] max-[360px]:grid-cols-[minmax(0,1fr)_minmax(96px,max-content)]',
)

const triggerButtonClassName = cn(
	'arrow-btn ml-[10px] flex h-[36px] w-[36px] items-center justify-center rounded-full',
	'group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0',
	'max-[1200px]:h-[30px] max-[1200px]:w-[30px] max-[1200px]:p-[6px] max-[1200px]:pt-[2px]',
	'max-[700px]:col-start-3 max-[700px]:row-span-2 max-[700px]:ml-0 max-[700px]:h-[30px] max-[700px]:w-[30px] max-[700px]:self-center max-[700px]:justify-self-center max-[700px]:p-[6px] max-[700px]:pt-[2px]',
	'max-[435px]:h-[24px] max-[435px]:w-[24px] max-[435px]:p-[4px] max-[435px]:pt-[1px]',
	'max-[360px]:h-[22px] max-[360px]:w-[22px] max-[360px]:p-[4px] max-[360px]:pt-[1px]',
)

const contentInnerClassName = cn(
	'ml-[144px] max-w-[746px] pt-0 text-[18px] font-regular leading-[27px] opacity-80',
	'max-[1200px]:mt-[12px] max-[1200px]:ml-[100px] max-[1200px]:max-w-[560px] max-[1200px]:text-[16px] max-[1200px]:leading-[24px]',
	'max-[700px]:mt-[12px] max-[700px]:ml-[70px] max-[700px]:mr-[60px] max-[700px]:max-w-none max-[700px]:text-[14px] max-[700px]:leading-[21px]',
	'max-[435px]:ml-[56px] max-[435px]:mr-[44px] max-[435px]:text-[13px] max-[435px]:leading-[19px]',
	'max-[360px]:ml-[48px] max-[360px]:mr-[40px] max-[360px]:text-[12px] max-[360px]:leading-[18px]',
)

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return (
		<AccordionPrimitive.Root
			data-slot='accordion'
			className={cn('my-[30px] flex w-full flex-col', className)}
			{...props}
		/>
	)
}

type StepsAccordionItemProps = AccordionItemProps & {
	numberNode?: React.ReactNode
	meta?: React.ReactNode
}

function AccordionItem({ className, number = '', numberNode = null, meta = null, ...props }: StepsAccordionItemProps) {
	return (
		<AccordionItemNumberContext.Provider value={number}>
			<AccordionItemNumberNodeContext.Provider value={numberNode}>
				<AccordionItemMetaContext.Provider value={meta}>
					<AccordionPrimitive.Item
						data-slot='accordion-item'
						data-number={number}
						className={cn('border-b border-accent py-[30px] max-[700px]:pt-[30px] max-[700px]:pb-[20px] last:border-b-0', className)}
						{...props}
					/>
				</AccordionItemMetaContext.Provider>
			</AccordionItemNumberNodeContext.Provider>
		</AccordionItemNumberContext.Provider>
	)
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const itemNumber = React.useContext(AccordionItemNumberContext)
	const itemNumberNode = React.useContext(AccordionItemNumberNodeContext)
	const itemMeta = React.useContext(AccordionItemMetaContext)

	return (
		<AccordionPrimitive.Header className='flex'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				className={cn(triggerLayoutClassName, className)}
				{...props}
			>
				<div className={numberWrapClassName}>
					{itemNumberNode ?? (
						<span className='block transition-colors group-data-[state=open]:text-accent'>{itemNumber}</span>
					)}
				</div>
				<div className={metaGridClassName}>
					<div className='min-w-0 w-[250px] max-[700px]:w-auto'>{children}</div>
					{itemMeta ? (
						<div
							className={cn(
								'flex flex-none flex-col justify-start text-white-text transition-colors group-data-[state=open]:text-accent',
								'max-[700px]:min-w-0',
							)}
						>
							{itemMeta}
						</div>
					) : null}
				</div>
				<div className={triggerButtonClassName}>
					<svg
						width='20'
						height='11'
						viewBox='0 0 20 11'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
							className='h-[11px] w-[20px] max-[435px]:h-[9px] max-[435px]:w-[16px] max-[360px]:h-[8px] max-[360px]:w-[14px]'
						>
						<path
							d='M0.459961 10.0799L9.60996 0.919922L18.77 10.0799'
							stroke='currentColor'
							stroke-width='1.3'
							stroke-miterlimit='10'
						/>
					</svg>
				</div>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot='accordion-content'
			className='overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
			{...props}
		>
			<div
				className={cn(contentInnerClassName, className)}
			>
				{children}
			</div>
		</AccordionPrimitive.Content>
	)
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
