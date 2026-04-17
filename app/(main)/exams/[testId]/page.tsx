import FullTestLayout from "@/components/layouts/FullTestLayout";
import { mockFullTest1 } from "@/data/mockData";

export default async function FullTestPage({
  params,
  searchParams,
}: {
  params: Promise<{ testId: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  // 1. Bắt cái testId từ URL (VD: "test-1")
  const resolvedParams = await params;
  const testId = resolvedParams.testId;

  // 2. Bắt cái năm từ dấu ? (VD: "2026") - Sau này dùng để lọc đề
  const resolvedSearchParams = await searchParams;
  const year = resolvedSearchParams.year;

  // Sau này Linh sẽ dùng testId và year để chọc xuống Database lấy đúng đề.
  // Còn bây giờ mình đang làm UI, cứ quăng tạm thằng mockFullTest1 vào trước đã:
  return <FullTestLayout testData={mockFullTest1} />;
}
