"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarMenu = [
  {
    path: "/exams/listening",
    title: "Practice Listening",
    desc: "100 questions splitted into 4 parts",
  },
  {
    path: "/exams/reading",
    title: "Practice Reading",
    desc: "100 questions splitted into 3 parts",
  },
  {
    path: "/exams/full-test", // <-- CHỈ CẦN SỬA CHỖ NÀY
    title: "Reading & Listening",
    desc: "200 questions splitted into 7 parts",
  },
];

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isRootExams = pathname === "/exams";

  // BỘ NHẬN DIỆN MỚI NÈ SẾP:
  // Nếu URL có chứa chữ "part-" hoặc "test-" thì bật công tắc tàng hình Sidebar!
  const isHideSidebar =
    pathname.includes("/part-") || pathname.includes("/test-");

  // =========================================================
  // TRƯỜNG HỢP 1: NẾU ĐANG Ở TRANG CHỌN PART HOẶC LÀM BÀI
  // -> Cắt bỏ Sidebar, cho Content bung xõa Full Width (w-full)
  // =========================================================
  if (isHideSidebar) {
    return (
      <div className="pt-6 lg:pt-12 max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full flex flex-col">
        {children}
      </div>
    );
  }

  // =========================================================
  // TRƯỜNG HỢP 2: NẾU ĐANG Ở TRANG CHỦ HOẶC TRANG LISTENING/READING
  // -> Vẫn giữ nguyên cấu trúc chia 2 cột như cũ
  // =========================================================
  return (
    <div className="pt-6 lg:pt-12 max-w-7xl mx-auto px-4 md:px-8 pb-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
      {/* 1. SIDEBAR */}
      <aside
        className={`${isRootExams ? "flex" : "hidden lg:flex"} w-full lg:w-80 lg:sticky lg:top-28 self-start shrink-0 flex-col gap-6`}
      >
        <div className="bg-white p-5 md:p-6 rounded-[2rem] border-0 shadow-sm">
          <h3 className="text-center text-[13px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4 font-inter">
            ETS TEST
          </h3>
          <div className="flex flex-col gap-3">
            {sidebarMenu.map((menu) => {
              const isActive = pathname.startsWith(menu.path);
              return (
                <Link
                  key={menu.path}
                  href={menu.path}
                  className={`w-full flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all text-left ${isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm" : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"}`}
                >
                  <div className="overflow-hidden">
                    <p className="font-bold text-[14px] leading-tight truncate">
                      {menu.title}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 transition-opacity line-clamp-1 ${isActive ? "opacity-70" : "opacity-50"}`}
                    >
                      {menu.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] text-white shadow-xl shadow-emerald-200/50">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Thống kê L&R
          </p>
          <h4 className="text-lg font-bold mb-4 font-lexend">
            Theo dõi tiến độ của bạn
          </h4>
          <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer">
            Xem thống kê
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main
        className={`${isRootExams ? "hidden lg:block" : "block"} flex-1 w-full`}
      >
        {!isRootExams && (
          <Link
            href="/exams"
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Quay lại Danh sách
          </Link>
        )}
        {children}
      </main>
    </div>
  );
}
