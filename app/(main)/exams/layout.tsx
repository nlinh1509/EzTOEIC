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
    path: "/exams",
    title: " Reading & Listening",
    desc: "200 questions splitted into 7 parts",
  },
  // { path: "/exams/writing", title: "Practice Writing", desc: "..." },
];

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // filter display sidebar
  const isTestPage = pathname.includes("/part-") || pathname.includes("/test-");

  if (isTestPage) {
    return (
      <div className="min-h-screen bg-slate-50 pb-10 ">{children}</div>
    );
  }
  return (
    <div className="pt-12 max-w-7xl mx-auto px-6 md:px-8 pb-10 flex flex-col lg:flex-row gap-10 ">
      {/* sidebar */}
      <aside className="sticky top-28 self-start w-80 shrink-0 flex flex-col gap-6">
        {/* menu box (ets test box) */}
        <div className="bg-white p-6 rounded-[2rem] border-0 shadow-sm">
          <h3 className="text-center text-[13px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4  font-inter">
            ETS TEST
          </h3>
          <div className="space-y-2">
            {/* luồn chạy map
            Hiển thị theo map (only content with path, title, desc)
            1. bấm nút (exams/listening)
            2. dò từng Link 
            3. dò box 1 (full test) mà url à exams 
            không giống 
            => isActive (của fulltest) là false 
            4. dò tiếp listening, giống url của 2 cái dống hệt 
            => true
            */}

            {sidebarMenu.map((menu) => {
              const isActive =
                menu.path === "/exams"
                  ? pathname === "/exams"
                  : pathname.startsWith(menu.path);

              return (
                <Link
                  key={menu.path}
                  // khi bấm vào path đc cập nhật ở đây đầu tiên
                  href={menu.path}
                  className={` w-full flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all text-left ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-bold text-[14px] leading-tight truncate">
                      {menu.title}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 transition-opacity ${
                        isActive ? "opacity-70" : "opacity-50"
                      }`}
                    >
                      {menu.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* statistics */}
        <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] text-white shadow-xl shadow-emerald-200/50">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Thông kê L&R
          </p>
          <h4 className="text-lg font-bold mb-4 font-lexend">
            Theo dõi tiến độ của bạn
          </h4>
          <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer">
            Xem thống kê
          </button>
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
