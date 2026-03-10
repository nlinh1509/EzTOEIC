// không cần "use client" hay useState ở đây nữa!

import FullCard from "@/components/FullCard";

export default function FullTestPage() {
  const filterYears = [2026, 2025, 2024, 2023];

  return (
    <div className="space-y-6">
      {/* header title */}
      <header className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-lexend uppercase">
            FULL TEST
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            {filterYears.map((year) => (
              <button
                key={year}
                className={`px-5 py-1.5 text-[13px] rounded-full border-2 font-bold transition-all cursor-pointer ${
                  year === 2026
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200/50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* grids exam cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FullCard title="TOEIC 2026 TEST 1" isVerified={true} />
        <FullCard title="TOEIC 2026 TEST 2" />
        <FullCard title="TOEIC 2026 TEST 3" />
        <FullCard title="TOEIC 2026 TEST 4" />
      </div>
    </div>
  );
}
