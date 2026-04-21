import Link from "next/link";

interface PartCardProps {
  id: number;
  title: string;
  desc: string;
  questions: string;
  href: string;
}

export default function PartCard({
  id,
  title,
  desc,
  questions,
  href,
}: PartCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white border border-slate-100 shadow-sm p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-row items-center gap-4 md:gap-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      {/* VỪA ĐỦ XÀI: Tăng lên w-16 h-16 (64px) và chữ text-2xl cho Mobile */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
        <span className="text-2xl md:text-3xl font-black text-emerald-600 group-hover:text-white font-lexend">
          {id < 10 ? `0${id}` : id}
        </span>
      </div>

      {/* content */}
      <div className="grow">
        <div className="flex items-center gap-3 md:mb-1">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-lexend">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed max-w-xl line-clamp-2 md:line-clamp-none mt-0.5 md:mt-0">
          {desc}
        </p>

        {/* statistic */}
        <div className="mt-2 md:mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="material-symbols-outlined text-base md:text-lg">quiz</span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight">
              {questions}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}