const list = [
    {
        "bg": '/images/img-task-1.jpg',
        "title": "Подпишитесь на социальные сети Премии",
        "description": "Подпишитесь на официальные аккаунты Премии в Telegram, ВКонтакте и других платформах.",
        "reward": "+20 баллов",
        "button_text": "Выполнить задание",
        "availability_info": "Доступно с 17 апреля",
        "dark": true,
        "is_available": false
    },
    {
        "bg": '/images/img-task-2.jpg',
        "title": "Пригласите друзей и партнёров",
        "description": "Расскажите о Премии и пригласите друзей или коллег принять участие.",
        "reward": "+10 баллов",
        "button_text": "Выполнить задание",
        "availability_info": "Доступно с 17 апреля",
        "dark": false,
        "is_available": false
    },
    {
        "bg": '/images/img-task-3.jpg',
        "title": "Посетите мероприятия Премии",
        "description": "Примите участие в проектах АНО «Евразия» и загрузите фото с мероприятий.",
        "reward": "+25 баллов",
        "button_text": "Выполнить задание",
        "availability_info": null,
        "dark": true,
        "is_available": false
    }
]

export default function CabinetTasks() {
    return <div className="flex-1 -mx-2.5 px-2.5 lg:px-5 lg:-mx-5 overflow-hidden md:overflow-visible">
        <div className={'flex flex-col lg:mb-25 text-text-base w-full'}>
            <div className={'text-[22px] lg:text-[32px] mb-2 lg:mb-0.5 font-medium text-accent'}>Мои задания</div>
            <p className="text-sm lg:text-lg mb-4">Выполняйте дополнительные задания и участвуйте в реферальной программе Премии,
                получая баллы, которые суммируются с оценкой экспертного совета. Накопленные баллы можно использовать
                для получения фирменного мерча Премии «Евразия».</p>
            <div className="text-base lg:text-[22px] font-medium text-left flex lg:block flex-col">
                Дополнительные задания станут доступны через <span className="underline text-accent">14 дней.</span>
            </div>
            <div className="flex flex-col gap-2.5 lg:gap-7 pt-4.5 lg:pt-9">
                {list.map((item, index) => <div key={index}
                                                className="shadow-[0px_20px_40px_0px_rgba(0,0,0,0.2)] border-b min-h-58 lg:min-h-64.5 relative p-5 pb-3.5 lg:pb-4 rounded-xl flex flex-col items-start overflow-hidden border-[#D2D6DF] last:border-none">
                    <img src={item.bg} className="absolute top-0 right-0 -z-1 w-full h-full object-cover"
                         alt={item.title}/>
                    <div
                        className="flex justify-center absolute top-5 right-5 items-center px-4 py-1.5 lg:py-2 rounded-4xl bg-accent"
                    >
                        <div className="text-sm lg:text-lg font-medium text-right text-[#f3f3f3]">+20 баллов</div>
                    </div>

                    <div className="w-45 lg:w-80 text-base lg:text-2xl font-medium mb-1 text-left text-accent">
                        {item.title}
                    </div>
                    <div className={`w-45 lg:w-80 text-[10px] lg:text-sm ${item.dark ? "text-[#f3f3f3]" : 'text-text-base'}`}>
                        {item.description}
                    </div>
                    <div className={'text-center mt-auto'}>
                        <button
                            className={`flex cursor-pointer last:mb-3 justify-center items-center relative gap-2.5 lg:px-3 lg:py-2.5 px-2.5 py-1.5 rounded-lg text-xs! lg:text-sm! font-medium text-center text-[#ebebeb]! bg-[#b8b8b8]`}
                        >
                            Выполнить задание
                        </button>
                        {item.availability_info && <span className='text-[8px] lg:text-[10px] text-center text-[#b5b5b5]'>{item.availability_info}</span>}
                    </div>

                </div>)}
            </div>
        </div>

    </div>
}