
export default function MyOrders() {
    return <div className={'flex flex-col mb-12 lg:mb-25 text-text-base w-full'}>
        <div className={'text-[22px] lg:text-[32px] mb-2 lg:mb-1 font-medium text-accent'}>Мои заявки</div>
        <div className={'text-sm  lg:text-lg mb-4.5'}>Выберите номинацию ниже или нажмите «Подать заявку». Доступно&nbsp;до&nbsp;3&nbsp;заявок.</div>
        <div className="lg:grid no-scrollbar  -mx-2.5 px-2.5 lg:gap-10 gap-2.5 w-full flex lg:grid-cols-3 overflow-auto">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="flex min-w-[165px] border border-[#DCDCDC] lg:min-h-65 min-h-42 p-5 pt-6 rounded-xl flex-col lg:gap-3 gap-1.5 justify-center items-center">
                <img className='lg:-mb-4 -mt-1.6 -mb-2.5 lg:-mt-2' src={'/images/plus.svg'} alt={'icon plus'} />
                <span className={'text-[10px] lg:text-sm underline'}>Подать заявку</span>
                <span className={'text-[8px] lg:text-xs'}>Выберите номинацию</span>
            </div>)}
        </div>
    </div>
}