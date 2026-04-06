
const list = [
    {
        id: '1',
        img: "/images/nomination-1.svg",
        title: "Язык мира",
        text: "За вклад в популяризацию русского языка и развитие межкультурной коммуникации, для физических лиц и&nbsp;организаций",
        soon: false,
    },
    {
        id: '2',
        img: "/images/nomination-2.svg",
        title: "Культурный код",
        text: "За проекты в сфере культуры и&nbsp;искусства, сохраняющие традиционные ценности, для&nbsp;физических лиц и организаций",
        soon: false,

    },
    {
        id: '3',
        img: "/images/nomination-3.svg",
        title: "Мосты дружбы",
        text: "За развитие международного сотрудничества и диалога между странами, для организаций",
        soon: false,

    },
    {
        id: '4',
        img: "/images/nomination-4.svg",
        title: "Лидер Евразии",
        text: "За личный вклад в развитие общества и&nbsp;значимые социальные инициативы, для физических лиц и организаций",
        soon: false,

    },
    {
        id: '5',
        img: "/images/nomination-5.svg",
        title: "Память поколений",
        text: "За проекты сохранения исторической памяти и противодействия искажению, для физических лиц и организаций",
        soon: false,

    },
    {
        id: '6',
        img: "/images/nomination-6.svg",
        title: "Голос Евразии",
        text: "За объективное освещение и&nbsp;продвижение ценностей евразийского пространства, для&nbsp;физических лиц и организаций",
        soon: false,

    },
    {
        id: '7',
        img: "/images/nomination-7.svg",
        title: "Яркий старт",
        text: "Для подростков 14–17 лет с проектами в&nbsp;сфере международного сотрудничества",
        soon: false,

    },
    {
        id: '8',
        img: "/images/nomination-8.svg",
        title: "Искусство учить",
        text: "За вклад в развитие образования и&nbsp;воспитание на основе традиционных ценностей, для физических лиц и&nbsp;организаций",
        soon: false,

    },
    {
        id: '9',
        img: "/images/nomination-9.svg",
        title: "По зову сердца",
        text: "За развитие волонтёрства и&nbsp;социальных инициатив в сфере здравоохранения, для физических лиц&nbsp;и организаций",
        soon: false,

    },
    {
        id: '10',
        img: "/images/nomination-10.svg",
        title: "Специальная номинацияи",
        text: "Для нестандартных проектов, для&nbsp;физических лиц и организаций",
        soon: true
    },
]

export default function MyNomination() {
    return <div className={'flex flex-col text-text-base w-full pb-20'}>
        <div className={'text-[22px] lg:text-[32px] font-medium mb-3 text-accent'}>Номинации</div>
        <div className="flex flex-wrap lg:gap-10 gap-2.5">
            {list.map(item => <div key={item.id}
                                   className="flex bg-neutral-100/80 text-center shadow-[0px_20px_40px_0px_rgba(0,0,0,0.2)] lg:min-h-65 min-h-55.5 lg:p-8 p-2.5 py-5 rounded-xl flex-col lg:gap-5 gap-3 justify-center items-center text-[10px] lg:text-sm lg:w-[calc(33.333%-27px)] w-[calc(50%-5px)]">
                <img src={item.img} alt={'icon nomination'} width={70} height={70} className={'w-10 h-10 lg:w-17.5 lg:h-17.5 -mb-0.5 lg:mb-0'}/>
                <p className="text-base lg:text-2xl lg:-mb-2.5 -mb-1.5 font-medium text-accent">{item.title}</p>
                <p dangerouslySetInnerHTML={{__html: item.text}}></p>
                <button disabled={item.soon} className={`text-xs! cursor-pointer lg:text-sm! mt-auto font-medium  text-[#ebebeb]! lg:px-3 lg:py-2.5 px-2.5 py-1.5 rounded-lg 
                ${item.soon ? 'bg-[#b8b8b8]' : "bg-accent"}`}>
                    {item.soon ? 'Откроется позднее' : 'Подать заявку'}
                </button>
            </div>)}

            <div
                className={'justify-start items-start lg:p-10 lg:pb-8 p-5 pb-7 flex grow  flex-col rounded-xl overflow-hidden shadow-[0px_20px_40px_0px_rgba(0,0,0,0.2)] relative'}>
                <img src="/images/bg-cabinet-nomination.jpg" alt="bg" className={'absolute top-0 left-0 -z-1 w-full h-full object-cover'}/>
                <div className="text-base w-10 lg:w-50 lg:text-2xl mb-2 font-medium text-left text-[#c5985e] ">
                    Получайте дополнительные баллы
                </div>

                <div className="lg:w-80 w-50 mb-6 lg:mb-0 text-[10px] lg:text-sm text-left text-[#ebebeb]">
                    Выполняйте задания в разделе «Мои задания» и повышайте итоговую оценку. <br/> Баллы можно обменять на призы.
                </div>
                <a href={'#'} className={`text-xs cursor-pointer lg:text-sm mt-auto font-medium  text-[#ebebeb]! lg:px-3 lg:py-2.5 px-[17px] py-2.5 rounded-sm lg:rounded-lg bg-accent`}>
                    Перейти к заданиям
                </a>
            </div>
        </div>
    </div>
}