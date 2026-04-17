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
      className="group bg-white border border-slate-100 shadow-sm p-6 rounded-[2.5rem] flex flex-col md:flex-row md:items-center gap-6 md:gap-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
        <span className="text-3xl font-black text-emerald-600 group-hover:text-white font-lexend">
          {id < 10 ? `0${id}` : id}
        </span>
      </div>

      {/* content */}
      <div className="grow">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-lexend">
            {title}
          </h3>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xl text-[13px]">
          {desc}
        </p>

        {/* statistic */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="material-symbols-outlined text-lg">quiz</span>
            <span className="text-xs font-bold uppercase tracking-tight">
              {questions}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm group-hover:bg-emerald-500 transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
        Practice Now
      </div> */}
    </Link>
  );
}
