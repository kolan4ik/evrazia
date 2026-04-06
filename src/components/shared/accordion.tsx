import { cn } from '@/lib/utils'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import * as React from 'react'

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
	number?: string
}

const AccordionItemNumberContext = React.createContext<string>('')

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return (
		<AccordionPrimitive.Root
			data-slot='accordion'
			className={cn('my-[30px] flex w-full flex-col', className)}
			{...props}
		/>
	)
}

function AccordionItem({ className, number = '', ...props }: AccordionItemProps) {
	return (
		<AccordionItemNumberContext.Provider value={number}>
			<AccordionPrimitive.Item
				data-slot='accordion-item'
				data-number={number}
				className={cn('border-b border-[#D2D6DF] py-[20px] last:border-b-0', className)}
				{...props}
			/>
		</AccordionItemNumberContext.Provider>
	)
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const itemNumber = React.useContext(AccordionItemNumberContext)

	return (
		<AccordionPrimitive.Header className='flex'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				className={cn(
					'group grid w-full  transition-all outline-none items-start text-left',
					'gap-x-6 grid-cols-[120px_1fr_auto] text-[24px]! leading-[24px]',
					'max-[1200px]:text-[20px]! max-[1200px]:gap-x-0 max-[1200px]:leading-[24px]! max-[1200px]:grid-cols-[65px_1fr_auto]',
					'max-[700px]:text-[16px]! max-[70px]:gap-x-0 max-[700px]:leading-[20px]! max-[700px]:grid-cols-[40px_1fr_auto]',

					className,
				)}
				{...props}
			>
				<div className='w-[120px] max-[1200px]:w-[65px] max-[700px]:w-[40px]'>
					<span className='block  transition-colors group-data-[state=open]:text-accent'>{itemNumber}</span>
				</div>
				<span className='transition-colors group-data-[state=open]:text-accent'>{children}</span>
				<div
					className={cn(
						'flex h-[36px] w-[36px] items-center justify-center rounded-full arrow-btn',
						'group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0',
						'max-[1200px]:w-[30px] max-[1200px]:h-[30px] max-[1200px]:p-[6px] max-[1200px]:pt-[2px]  ml-[10px]',
						'max-[700px]:w-[30px] max-[700px]:h-[30px] max-[700px]:p-[6px] max-[700px]:pt-[2px] ml-[10px]',
					)}
				>
					<svg
						width='20'
						height='11'
						viewBox='0 0 20 11'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
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
				className={cn(
					'max-w-[890px] pl-[144px] pt-0 text-[18px] font-regular leading-[27px] opacity-80',
					'max-[1200px]:max-w-[540px] max-[1200px]:pl-[65px] max-[1200px]:text-[12px] max-[1200px]:leading-[18px] max-[1200px]:mt-[12px]',
					'max-[700px]:max-w-[320px] max-[700px]:pl-[40px] max-[700px]:text-[12px] max-[700px]:leading-[18px] max-[700px]:mt-[12px]',

					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Content>
	)
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
