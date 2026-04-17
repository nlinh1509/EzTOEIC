"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. HERO SECTION (Banner trên cùng) */}
      <div className="relative h-64 lg:h-80 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 overflow-hidden shrink-0">
        {/* Họa tiết trang trí lấp lánh */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-32 relative z-10">
        {/* 2. KHỐI AVATAR CHÍNH */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-10 shadow-2xl shadow-emerald-900/5 ring-1 ring-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-full blur-lg opacity-50"></div>
              <Image
                src={session?.user?.image || "/logo.png"}
                alt="Avatar"
                width={140}
                height={140}
                className="rounded-full ring-8 ring-white relative z-10 shadow-xl"
              />
              {/* Huy hiệu Pro */}
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-white z-20 shadow-sm">
                PRO
              </div>
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {session?.user?.name}
              </h1>
              <p className="text-slate-500 font-medium mt-1 mb-4">
                {session?.user?.email}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-full">
                  Học viên năng nổ
                </span>
                <span className="px-4 py-1.5 bg-orange-100 text-orange-600 text-sm font-bold rounded-full flex items-center gap-1">
                  🔥 Streak: 12 ngày
                </span>
              </div>
            </div>
          </div>

          <button className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl shadow-slate-200 shrink-0 w-full md:w-auto">
            Chỉnh sửa hồ sơ
          </button>
        </div>

        {/* 3. THỐNG KÊ NHANH (4 Ô VUÔNG) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
          {/* Ô 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
              {/* [SAFARI FIX]: Thêm width="24" height="24" và shrink-0 */}
              <svg
                width="24"
                height="24"
                className="w-6 h-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <p className="text-slate-500 font-medium text-sm">Điểm cao nhất</p>
            <p className="text-3xl font-black text-slate-800 mt-1">850</p>
          </div>
          {/* Ô 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
              {/* [SAFARI FIX] */}
              <svg
                width="24"
                height="24"
                className="w-6 h-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <p className="text-slate-500 font-medium text-sm">
              Giờ học tuần này
            </p>
            <p className="text-3xl font-black text-slate-800 mt-1">
              14h<span className="text-lg text-slate-400"> 30m</span>
            </p>
          </div>
          {/* Ô 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
              {/* [SAFARI FIX] */}
              <svg
                width="24"
                height="24"
                className="w-6 h-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
            </div>
            <p className="text-slate-500 font-medium text-sm">
              Đề Full Test đã làm
            </p>
            <p className="text-3xl font-black text-slate-800 mt-1">5</p>
          </div>
          {/* Ô 4 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
              {/* [SAFARI FIX] */}
              <svg
                width="24"
                height="24"
                className="w-6 h-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <p className="text-slate-500 font-medium text-sm">
              Xếp hạng (Tháng)
            </p>
            <p className="text-3xl font-black text-slate-800 mt-1">#42</p>
          </div>
        </div>

        {/* 4. BIỂU ĐỒ NĂNG LỰC & TIẾN ĐỘ CHUNG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Thẻ Phân Tích Năng Lực */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6">
              Phân tích năng lực
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">Nghe (Listening)</span>
                  <span className="text-emerald-600">Tuyệt vời</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">Đọc (Reading)</span>
                  <span className="text-sky-600">Khá tốt</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">Từ vựng (Vocabulary)</span>
                  <span className="text-amber-500">Cần cải thiện</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                <span className="shrink-0">💡</span> Lời khuyên từ AI: Bạn đang
                làm rất tốt phần Nghe. Hãy dành thêm 30 phút mỗi ngày để ôn tập
                Từ vựng nhé!
              </p>
            </div>
          </div>

          {/* Thẻ Hoạt Động Gần Đây */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800">
                Hoạt động gần đây
              </h3>
              <Link
                href="/exams/history"
                className="text-sm font-bold text-slate-500 hover:text-emerald-600 px-4 py-2 bg-slate-50 rounded-xl transition-colors"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="space-y-4">
              {/* Item 1 */}
              <div className="group flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-50 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    {/* [SAFARI FIX] */}
                    <svg
                      width="24"
                      height="24"
                      className="w-6 h-6 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">
                      ETS 2024 - Test 1
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Full Test • Hôm qua
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-800 text-xl">850</p>
                  <p className="text-xs font-bold text-emerald-500">+50 điểm</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-50 hover:border-sky-500 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    {/* [SAFARI FIX] */}
                    <svg
                      width="24"
                      height="24"
                      className="w-6 h-6 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">
                      Part 1: Photographs
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Practice • 2 ngày trước
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-800 text-xl">8/10</p>
                  <p className="text-xs font-bold text-sky-500">Hoàn thành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
