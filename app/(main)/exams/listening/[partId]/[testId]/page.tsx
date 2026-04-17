import Part1Layout from "@/components/layouts/Part1Layout";
import Part2Layout from "@/components/layouts/Part2Layout";
import Part3Layout from "@/components/layouts/Part3Layout";
import Part4Layout from "@/components/layouts/Part4Layout";

import { mockPart1, mockPart2, mockPart3 } from "@/data/mockData";

export default async function ListeningTestPage({
  params,
}: {
  params: Promise<{ partId: string; testId: string }>;
}) {
  const resolvedParams = await params;
  const partId = resolvedParams.partId; // Lấy chữ "part-1" từ thanh URL

  // Bắt đường dẫn Part 1
  if (partId === "part-1") {
    // Truyền tạm data giả vào để render giao diện
    return <Part1Layout data={mockPart1} />;
  }

  if (partId === "part-2") {
    // Truyền tạm data giả vào để render giao diện
    return <Part2Layout data={mockPart2} />;
  }

  // Nhớ import Part3Layout và mockPart3 ở trên cùng nha
  if (partId === "part-3") {
    return <Part3Layout data={mockPart3} />;
  }

  if (partId === "part-4") {
    return <Part4Layout data={mockPart3} />;
  }

  // Nếu lỡ bấm qua part 2, part 3, part 4 thì báo lỗi nhẹ
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] font-sans">
      <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
        headphones
      </span>
      <h2 className="text-2xl font-bold text-slate-700">Đang xây dựng...</h2>
      <p className="text-slate-500 mt-2">
        Giao diện của {partId.replace("-", " ")} sắp ra mắt nha!
      </p>
    </div>
  );
}
