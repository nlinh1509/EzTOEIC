import Link from "next/link"; // Đưa lên dòng 1 nè!

interface FilterYearsProps {
  currentYear: string;
  baseUrl: string;
}

export default function FilterYears({
  currentYear,
  baseUrl,
}: FilterYearsProps) {
  const filterYears = ["2026", "2025", "2024", "2023"];

  return (
    <div className="flex flex-wrap items-center gap-2.5 mt-4">
      {filterYears.map((year) => {
        const isActive = currentYear === year;
        return (
          <Link
            key={year}
            href={`${baseUrl}?year=${year}`}
            className={`border px-5 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
              isActive
                ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-200/50"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            {year}
          </Link>
        );
      })}
    </div>
  );
}
