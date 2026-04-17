import FilterYears from "@/components/FilterYears";
import PartCard from "@/components/PartCard";
import { readingParts } from "@/data/exam";

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
      <header className="mb-6 flex flex-col md:flex-row items-start md:items-end justify-between">
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
          <PartCard
            key={part.id}
            id={part.id}
            title={part.title}
            desc={part.desc}
            questions={part.questions}
            href={`/exams/reading/part-${part.id}?year=${currentYear}`}
          />
        ))}
      </div>
    </div>
  );
}
