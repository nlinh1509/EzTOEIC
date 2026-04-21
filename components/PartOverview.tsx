import Link from "next/link";
import { readingParts, listeningParts } from "@/data/exam";

interface PartOverviewProps {
  category: "reading" | "listening";
  partIdString: string;
  year: string;
}

export default function PartOverview({
  category,
  partIdString,
  year,
}: PartOverviewProps) {
  // Tách lấy con số
  const partNumber = parseInt(partIdString.replace("part-", ""));

  // Bốc Data tùy theo category
  const partsData = category === "listening" ? listeningParts : readingParts;
  const partInfo = partsData.find((p) => p.id === partNumber);

  if (!partInfo) {
    return (
      <div className="p-10 text-center font-bold text-red-500 mt-20">
        Không tìm thấy Part này!
      </div>
    );
  }

  const totalQuestions = parseInt(partInfo.questions) || 0;

  // Đẻ ra 10 Test (Tui đã dọn dẹp để không bị rớt dòng)
  const testsList = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `${category === "listening" ? "Listening" : "Reading"} Test ${i + 1}`,
    desc: partInfo.title,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 md:gap-6 pb-10 md:pb-12 font-lexend">
      
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-100 p-5 md:p-8 flex items-center justify-between min-h-[120px] md:min-h-[160px]">
        <div className="z-10">
          <h1 className="text-slate-900 text-2xl md:text-3xl font-extrabold tracking-tight mb-1 md:mb-2">
            {partInfo.title}
          </h1>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
            {partInfo.desc}
          </p>
        </div>
      </div>

      {/* Danh sách bài Test */}
      <div className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-0">
        
        {/* Tiêu đề danh sách */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 capitalize">
            ETS TEST {year}
          </h3>
          <span className="text-xs md:text-sm font-bold text-slate-500 bg-white px-3 md:px-4 py-1.5 rounded-full border border-slate-100 shadow-sm w-fit">
            10 TEST
          </span>
        </div>

        {/* Tips box */}
        <div className="p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] bg-emerald-50 border border-dashed border-emerald-200 flex items-start md:items-center gap-3">
          <span className="material-symbols-outlined text-emerald-500 shrink-0 text-xl md:text-2xl">
            lightbulb
          </span>
          <p className="text-xs md:text-sm text-emerald-800 font-medium">
            <strong className="font-black">Tips:</strong>{" "}
            {category === "listening"
              ? "Hãy chú ý đến chủ ngữ và động từ trong câu mô tả để không bị mắc bẫy nhé!"
              : "Phân tích kỹ từ loại trước khi nhìn đáp án để tiết kiệm thời gian!"}
          </p>
        </div>

        {/* Render 10 Tests */}
        {testsList.map((test) => (
          <Link
            key={test.id}
            href={`/exams/${category}/${partIdString}/test-${test.id}?year=${year}`}
            // Dọn flex-row thừa, thêm min-w-0 để text không phá form
            className="group flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            {/* Cục điểm số */}
            <div className="flex items-center justify-center size-12 md:size-14 shrink-0 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs md:text-sm ring-4 ring-emerald-50/50 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
              0/{totalQuestions}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-slate-900 font-bold text-base md:text-lg group-hover:text-emerald-600 transition-colors truncate">
                {test.title}
              </h4>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5 truncate">
                {test.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}