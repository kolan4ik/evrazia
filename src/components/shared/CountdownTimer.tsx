import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-04-07T19:00:00+03:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [diff, setDiff] = useState(() => Math.max(0, TARGET_DATE - Date.now()));

  useEffect(() => {
    if (diff <= 0) return;
    const id = setInterval(() => {
      const remaining = Math.max(0, TARGET_DATE - Date.now());
      setDiff(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [diff > 0]);

  if (diff <= 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-6'>
        <p className='text-[50px] text-white-text'>Подача заявок открыта!</p>
      </div>
    );
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] gap-8'>
      <h2 className='text-4xl text-primary text-center font-nyght'>До возможности подать заявку</h2>
      <div className='flex gap-4 items-center'>
        {[
          { value: hours, label: "часов" },
          { value: minutes, label: "минут" },
          { value: seconds, label: "секунд" },
        ].map((item, i) => (
          <div key={i} className='flex flex-col items-center gap-0.5'>
            <div className='text-[100px] font-semibold text-accent bg-white/5 rounded-xl py-2 px-3 min-w-[120px] text-center leading-none'>{pad(item.value)}</div>
            <span className='text-lg text-primary opacity-60'>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
