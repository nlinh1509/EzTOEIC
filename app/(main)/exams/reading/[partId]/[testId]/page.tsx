import Part5Layout from "@/components/layouts/Part5Layout";
import Part6Layout from "@/components/layouts/Part6Layout";
import Part7Layout from "@/components/layouts/Part7Layout";
import { mockPart5, mockPart6, mockPart7 } from "@/data/mockData";

export default async function ReadingTestPage({
  params,
}: {
  params: Promise<{ partId: string; testId: string }>;
}) {
  const resolvedParams = await params;
  const partId = resolvedParams.partId; // Lấy chữ "part-5" từ thanh URL

  if (partId === "part-5") {
    // Truyền cục mockdata
    return <Part5Layout data={mockPart5[0]} />;
  }
  if (partId === "part-6") {
    // Truyền cục mockdata
    return <Part6Layout data={mockPart6} />;
  }

  if (partId === "part-7") {
    // Truyền cục mockdata
    return <Part7Layout data={mockPart7} />;
  }

  // báo lỗi khi chưa update data
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] font-lexend ">
      <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 animate-bounce">
        construction
      </span>
      <h2 className="text-2xl font-bold text-slate-700">Đang xây dựng...</h2>
      <p className="text-slate-500 mt-2">
        Giao diện của {partId.replace("-", " ")} sắp ra mắt nha!
      </p>
    </div>
  );
}
