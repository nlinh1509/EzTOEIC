import Hero from "../../components/Hero";
import { supabase } from "../../lib/supabase"; // Nhớ trỏ đúng đường dẫn tới cái cờ lê supabase.ts nha Linh

export default async function Home() {
  // Bốc thử dữ liệu từ mây về
  const { data: exams, error } = await supabase.from("exams").select("*");

  return (
    <main>
      {/* test supabase */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {error && (
          <p className="text-red-500 font-bold p-4 bg-red-50 rounded-xl border border-red-200">
            Lỗi rồi: {error.message}
          </p>
        )}

        {!error && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-bold">
                ✅ KẾT NỐI SUPABASE THÀNH CÔNG RỰC RỠ!
              </p>
              <p className="text-sm mt-1">
                Kho dữ liệu hiện tại đang có: <b>{exams?.length}</b> đề thi
                (chưa có gì là đúng nha).
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Hero />
      </section>
    </main>
  );
}
