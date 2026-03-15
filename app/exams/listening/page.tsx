import Link from "next/link";
import FilterYears from "@/components/FilterYears";

const listeningParts = [
  {
    id: 1,
    title: "Part 1: Photographs",
    tag: "Listening",
    desc: "Mô tả hình ảnh - Nghe và chọn phương án đúng nhất mô tả về bức tranh.",
    questions: "6 Questions",
    time: "~5 Minutes",
  },
  {
    id: 2,
    title: "Part 2: Question & Response",
    tag: "Listening",
    desc: "Hỏi và đáp - Nghe câu hỏi và chọn phản hồi phù hợp nhất trong 3 lựa chọn.",
    questions: "25 Questions",
    time: "~15 Minutes",
  },
  {
    id: 3,
    title: "Part 3: Short Conversations",
    tag: "Listening",
    desc: "Hội thoại ngắn - Nghe đoạn hội thoại giữa 2-3 người và trả lời câu hỏi liên quan.",
    questions: "39 Questions",
    time: "~25 Minutes",
  },
  {
    id: 4,
    title: "Part 4: Short Talks",
    tag: "Listening",
    desc: "Bài nói ngắn - Nghe bài thuyết trình hoặc thông báo và trả lời các câu hỏi.",
    questions: "30 Questions",
    time: "~20 Minutes",
  },
];

export default async function ListeningPage({
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
            practice listening
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Luyện tập 100 câu chia thành 4 parts.
          </p>

          <FilterYears currentYear={currentYear} baseUrl="/exams/listening" />
        </div>
      </header>

      {/* Danh sách 4 Parts */}
      <div className="space-y-6 ">
        {listeningParts.map((part) => (
          <Link
            key={part.id}
            href={`/exams/listening/part-${part.id}`}
            className="group bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col md:flex-row md:items-center gap-6 md:gap-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* part */}
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
              <span className="text-3xl font-black text-emerald-600 group-hover:text-white font-lexend">
                {/* thêm số 0 đằng trước nếu id < 10 (01, 02...) */}
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

              {/* Thống kê Câu hỏi & Thời gian */}
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
