import Link from "next/link";
import FilterYears from "@/components/FilterYears";

const readingParts = [
  {
    id: 5,
    title: "Part 5: Incomplete Sentences",
    tag: "Reading",
    desc: "Điền vào chỗ trống - Chọn từ hoặc cụm từ phù hợp nhất để hoàn thành câu.",
    questions: "30 Questions",
    time: "~15 Minutes",
  },
  {
    id: 6,
    title: "Part 6: Text Completion",
    tag: "Reading",
    desc: "Điền từ đoạn văn - Chọn từ, cụm từ hoặc câu phù hợp để hoàn thành đoạn văn.",
    questions: "16 Questions",
    time: "~10 Minutes",
  },
  {
    id: 7,
    title: "Part 7: Reading Comprehension",
    tag: "Reading",
    desc: "Đọc hiểu - Đọc các đoạn văn đơn, kép, đa và trả lời các câu hỏi liên quan.",
    questions: "54 Questions",
    time: "~50 Minutes",
  },
];

export default async function ReadingPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const params = await searchParams;

  const currentYear = params.year || "2026";

  return (
    <div className="space-y-6">
      {/* header */}
      <header className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-lexend uppercase">
            practice reading
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Luyện tập 100 câu chia thành 4 parts.
          </p>

          <FilterYears currentYear={currentYear} baseUrl="/exams/reading" />
        </div>
      </header>

      <div className="space-y-6 ">
        {readingParts.map((part) => (
          <Link
            key={part.id}
            href={`/exams/reading/part-${part.id}`}
            className="group bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col md:flex-row md:items-center gap-6 md:gap-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
              <span className="text-3xl font-black text-emerald-600 group-hover:text-white font-lexend">
                {part.id < 10 ? `0${part.id}` : part.id}
              </span>
            </div>

            <div className="grow">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-lexend">
                  {part.title}
                </h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl text-[13px]">
                {part.desc}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="material-symbols-outlined text-lg">
                    quiz
                  </span>
                  <span className="text-xs font-bold uppercase tracking-tight">
                    {part.questions}
                  </span>
                </div>

                {/* <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                  <span className="text-xs font-bold uppercase tracking-tight">
                    {part.time}
                  </span>
                </div> */}
              </div>
            </div>

            <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm group-hover:bg-emerald-500 transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
              Luyện tập ngay
              {/* <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
