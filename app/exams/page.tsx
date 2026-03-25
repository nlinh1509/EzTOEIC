import FullCard from "@/components/FullCard";
import { examsDatabase } from "@/container/exam";
import FilterYears from "@/components/FilterYears";

export default async function FullTestPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const params = await searchParams;

  const currentYear = params.year || "2026";

  const allExamsOfYear = examsDatabase[currentYear] || [];

  return (
    <div className="space-y-6">
      {/* header */}
      <header className="mb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-lexend uppercase">
            READING & LISTENING
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Luyện tập 200 câu chia thành 7 parts.
          </p>

          <FilterYears currentYear={currentYear} baseUrl="/exams" />
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">
        {allExamsOfYear.map((exam) => (
          <FullCard key={exam.id} title={exam.title} />
        ))}
      </div>
    </div>
  );
}
