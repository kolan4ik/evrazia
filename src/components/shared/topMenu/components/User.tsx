import { useRef, useState, useEffect } from "react";

const events = [
    { href: "#", text: "Редактировать профиль" },
    { href: "#", text: "Изменить пароль" },
    { href: "#", text: "Выйти из аккаунта" },
];

export default function User() {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerDownOutside = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDownOutside);
        return () => document.removeEventListener("pointerdown", handlePointerDownOutside);
    }, []);

    return (
        <div ref={rootRef} className="ml-auto relative">
            <button
                type="button"
                className="flex items-center text-accent! lg:text-base! text-[10px]! font-medium underline gap-3 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <div className="lg:w-10 w-8 lg:h-10 h-8 rounded-full overflow-hidden">
                    <img src="/images/photo.jpg" alt="avatar" />
                </div>
                Екатерина
            </button>

            {isOpen && (
                <div className="w-80 -top-4.5 lg:-right-2 -right-1 p-2.5 pt-5 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.2)] absolute rounded-xl bg-white">
                    <span onClick={() => setIsOpen((prev) => false)} className="top-5 right-5 absolute cursor-pointer">
                        <img  src="/images/close.svg" alt="close icon" />
                    </span>

                    <div className="flex gap-2.5 text-left text-text-base px-2.5">
                        <img
                            src="/images/photo.jpg"
                            className="w-10 h-10 rounded-[75px] shrink object-cover"
                            width={150}
                            height={150}
                            alt="photo"
                        />
                        <div className="pt-2">
                            <div className="text-base mb-2 w-10">Александрова Екатерина</div>
                            <div className="text-sm mb-1.5 underline">e.alexandrova@gmail.com</div>
                            <div className="text-sm">ID: 000000</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-6 pb-4.5 pt-7.5 p-2.5 border-t border-[#D2D6DF]">
                        {events.map((item) => (
                            <a
                                key={item.text}
                                className="text-base font-medium text-text-base hover:text-accent hover:underline"
                                href={item.href}
                            >
                                {item.text}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
