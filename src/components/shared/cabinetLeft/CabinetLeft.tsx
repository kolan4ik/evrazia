
const events = [
    {
        href: '#',
        text: "Редактировать профиль"
    },
    {
        href: '#',
        text: "Изменить пароль"
    }
]
export default function CabinetLeft() {
    return <div className={'lg:flex flex-col w-87.5 gap-3 text-text-base hidden'}>
        <img src={'/images/photo.jpg'} className="rounded-[30px] mb-2 object-cover" width={150} height={150} alt={'photo'} />

        <div className="text-[22px] w-2 mb-2">
            Александрова Екатерина
        </div>
        <div className={'text-lg underline'}>e.alexandrova@gmail.com</div>
        <div className={'text-lg'}>ID: 000000</div>

        <div className={'flex flex-col gap-4.5 mt-9'}>
            {events.map(item => <a key={item.text} className={'text-sm font-medium text-text-base hover:text-accent underline'} href={item.href}>{item.text}</a>)}
        </div>
    </div>
}