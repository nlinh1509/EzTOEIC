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

  // Đẻ ra 10 Test
  const testsList = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `${category === "listening" ? "Listening" : "Reading"} 
    Test ${i + 1}`,
    desc: partInfo.title,
  }));

  // Đổi Icon
  // let iconName = "menu_book";
  // if (category === "listening") {
  //   if (partNumber === 1) iconName = "photo_camera";
  //   else if (partNumber === 2) iconName = "forum";
  //   else iconName = "headphones";
  // }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 pb-12 font-lexend">
      {/* Breadcrumbs*/}
      {/* <div className="flex items-center gap-2 text-sm font-medium capitalize">
        <Link
          href={`/exams/${category}`}
          className="text-emerald-600 hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          {category}
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600 font-bold uppercase">
          {partInfo.title}
        </span>
      </div> */}

      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-100 p-6 md:p-8 flex items-center justify-between min-h-[160px]">
        <div className="z-10">
          <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight mb-2">
            {partInfo.title}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            {partInfo.desc}
          </p>
        </div>

        {/* <div className="absolute -right-10 -bottom-10 size-40 bg-emerald-400/20 rounded-full blur-3xl"></div> */}
      </div>

      {/* Danh sách bài Test */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between  gap-2">
          <h3 className="text-xl font-bold text-slate-900 capitalize">
            ETS TEST {year}
          </h3>
          <span className="text-sm font-bold text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm w-fit">
            10 TEST
          </span>
        </div>

        {/* tips */}
        <div className=" p-5 rounded-2xl bg-emerald-50 border border-dashed border-emerald-200 flex items-start md:items-center gap-3">
          <span className="material-symbols-outlined text-emerald-500 shrink-0">
            lightbulb
          </span>
          <p className="text-sm text-emerald-800 font-medium">
            Tips:{" "}
            {category === "listening"
              ? "Hãy chú ý đến chủ ngữ và động từ trong câu mô tả để không bị mắc bẫy nhé!"
              : "Phân tích kỹ từ loại trước khi nhìn đáp án để tiết kiệm thời gian!"}
          </p>
        </div>

        {testsList.map((test) => (
          <Link
            key={test.id}
            href={`/exams/${category}/${partIdString}/test-${test.id}?year=${year}`}
            className="group flex flex-col md:flex-row md:items-center gap-4 bg-white p-5 rounded-[1.5rem] border border-slate-100  hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center size-14 shrink-0 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm ring-4 ring-emerald-50/50 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
              0/{totalQuestions}
            </div>

            <div className="flex-1">
              <h4 className="text-slate-900 font-bold text-lg group-hover:text-emerald-600 transition-colors">
                {test.title}
              </h4>
              <p className="text-sm text-slate-500 mt-0.5">{test.desc}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                Not started
              </span>
              {/* <span className="material-symbols-outlined text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                arrow_forward
              </span> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
