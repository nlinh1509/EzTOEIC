import FilterYears from "@/components/FilterYears";
import PartCard from "@/components/PartCard";
import { listeningParts } from "@/data/exam";

export default async function ListeningPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const params = await searchParams;
  const currentYear = params.year || "2026";

  return (
    // 1. Ép khoảng cách tổng thể: mobile xài 4 (16px), md trở lên xài 6 (24px)
    <div className="space-y-4 md:space-y-6">
      
      {/* 2. Căn chỉnh Header: Giảm mb-6 xuống mb-4 cho gọn, thêm gap-4 để đề phòng nội dung bị dính nhau khi rớt dòng */}
      <header className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-2 md:space-y-4">
          
          {/* 3. Bóp size tiêu đề: text-2xl cho mobile, PC vẫn là text-3xl */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-lexend uppercase">
            practice listening
          </h1>
          
          {/* 4. Sub-text bóp lại 1 chút thành text-xs cho mobile */}
          <p className="text-slate-500 mt-1 md:mt-2 text-xs md:text-sm font-medium">
            Luyện tập 100 câu chia thành 4 parts.
          </p>

          <FilterYears currentYear={currentYear} baseUrl="/exams/listening" />
        </div>
      </header>

      {/* 5. Ép khoảng cách giữa các Card: mobile xài 4, PC xài 6 */}
      <div className="space-y-4 md:space-y-6">
        {listeningParts.map((part) => (
          <PartCard
            key={part.id}
            id={part.id}
            title={part.title}
            desc={part.desc}
            questions={part.questions}
            href={`/exams/listening/part-${part.id}?year=${currentYear}`}
          />
        ))}
      </div>
    </div>
  );
}