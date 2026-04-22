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
      <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 lg:-mt-32 relative z-10">
        
        {/* 2. KHỐI AVATAR CHÍNH & MỤC TIÊU */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl lg:rounded-[2.5rem] p-6 lg:p-10 shadow-2xl shadow-emerald-900/5 ring-1 ring-white flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6 text-center md:text-left w-full">
            
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-full blur-lg opacity-50"></div>
              <div className="relative w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-full ring-4 lg:ring-8 ring-white z-10 shadow-xl overflow-hidden bg-white">
                 <Image
                  src={session?.user?.image || "/logo.png"}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] lg:text-[10px] font-black px-2 py-0.5 lg:px-3 lg:py-1 rounded-full border-2 border-white z-20 shadow-sm">
                PRO
              </div>
            </div>

            <div className="mt-2 md:mt-0 flex-1 w-full">
              <h1 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {session?.user?.name || "Nguyễn Văn A"}
              </h1>
              <p className="text-slate-500 text-sm lg:text-base font-medium mt-0.5 lg:mt-1 mb-3">
                {session?.user?.email || "nguyenvana@gmail.com"}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                <span className="px-3 py-1 lg:px-4 lg:py-1.5 bg-slate-100 text-slate-600 text-xs lg:text-sm font-bold rounded-full">
                  Học viên năng nổ
                </span>
                {/* Cập nhật: Trực quan hóa Streak */}
                <div className="px-3 py-1 lg:px-4 lg:py-1.5 bg-orange-100 text-orange-600 text-xs lg:text-sm font-bold rounded-full flex items-center gap-2">
                  <span>🔥 Streak: 12 ngày</span>
                  <div className="flex items-center gap-0.5 ml-1 hidden lg:flex">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  </div>
                </div>
              </div>

              {/* Cập nhật: Thanh Progress Bar Mục Tiêu */}
              <div className="w-full max-w-md bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs lg:text-sm font-bold mb-1.5">
                  <span className="text-slate-600">Mục tiêu: 900</span>
                  <span className="text-emerald-600">Hiện tại: 850</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full relative" style={{ width: "94%" }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="px-6 py-3 lg:px-8 lg:py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm lg:text-base font-bold rounded-xl lg:rounded-2xl transition-all shadow-xl shadow-slate-200 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            Chỉnh sửa hồ sơ
          </button>
        </div>

        {/* 3. THỐNG KÊ NHANH (Giữ nguyên cấu trúc, tinh chỉnh UI nhẹ) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mt-6 lg:mt-8">
          {/* Ô 1 */}
          <div className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 text-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 shrink-0">
              <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-slate-500 font-medium text-xs lg:text-sm line-clamp-1">Điểm cao nhất</p>
            <p className="text-2xl lg:text-3xl font-black text-slate-800 mt-1">850</p>
          </div>
          {/* Ô 2 */}
          <div className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sky-100 text-sky-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 shrink-0">
              <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-slate-500 font-medium text-xs lg:text-sm line-clamp-1">Giờ học tuần này</p>
            <p className="text-2xl lg:text-3xl font-black text-slate-800 mt-1">14h<span className="text-sm lg:text-lg text-slate-400"> 30m</span></p>
          </div>
          {/* Ô 3 */}
          <div className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 text-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 shrink-0">
              <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <p className="text-slate-500 font-medium text-xs lg:text-sm line-clamp-1">Đề Full Test đã làm</p>
            <p className="text-2xl lg:text-3xl font-black text-slate-800 mt-1">5</p>
          </div>
          {/* Ô 4 */}
          <div className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-rose-100 text-rose-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 shrink-0">
              <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <p className="text-slate-500 font-medium text-xs lg:text-sm line-clamp-1">Xếp hạng (Tháng)</p>
            <p className="text-2xl lg:text-3xl font-black text-slate-800 mt-1">#42</p>
          </div>
        </div>

        {/* 4. BIỂU ĐỒ NĂNG LỰC 7 PARTS & HOẠT ĐỘNG GẦN ĐÂY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
          
          {/* Thẻ Phân Tích Năng Lực (Đã cập nhật chia 7 Parts TOEIC) */}
          <div className="bg-white rounded-3xl lg:rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-5 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-black text-slate-800">
                Phân tích 7 Parts
              </h3>
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md">
                Điểm yếu: Part 7
              </span>
            </div>

            <div className="space-y-4">
              {/* Listening Group */}
              <div>
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Listening</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P1: Photos</span><span className="text-emerald-600">90%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P2: Q-Resp</span><span className="text-emerald-600">85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P3: Conv</span><span className="text-emerald-600">80%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P4: Talks</span><span className="text-sky-600">75%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-sky-500 rounded-full" style={{ width: "75%" }}></div></div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Reading Group */}
              <div>
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Reading</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P5: Incomp. Sent.</span><span className="text-sky-600">70%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-sky-500 rounded-full" style={{ width: "70%" }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P6: Text Comp.</span><span className="text-amber-500">60%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-amber-400 rounded-full" style={{ width: "60%" }}></div></div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1">
                      <span className="text-slate-700">P7: Reading Comp.</span><span className="text-rose-500">45%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-rose-400 rounded-full" style={{ width: "45%" }}></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights cập nhật sát sườn bài thi hơn */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-xs lg:text-sm font-bold text-indigo-800 flex items-start gap-2">
                <span className="shrink-0 text-lg">🤖</span> 
                <span>AI phân tích: Bạn mất nhiều điểm nhất ở Part 7 (Double/Triple Passages). Hãy luyện thêm kỹ năng Skimming & Scanning nhé!</span>
              </p>
            </div>
          </div>

          {/* Thẻ Hoạt Động Gần Đây (Cập nhật thêm tính năng Resume) */}
          <div className="bg-white rounded-3xl lg:rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-5 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-black text-slate-800">
                Lịch sử làm bài
              </h3>
              <Link href="/exams/history" className="text-xs lg:text-sm font-bold text-slate-500 hover:text-emerald-600 px-3 py-1.5 lg:px-4 lg:py-2 bg-slate-50 rounded-lg lg:rounded-xl transition-colors">
                Xem tất cả
              </Link>
            </div>

            <div className="space-y-3 lg:space-y-4">
              
              {/* Item Mới: Đang làm dở (In Progress) */}
              <div className="group flex items-center justify-between p-3 lg:p-4 bg-white rounded-2xl border-2 border-indigo-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className="flex items-center gap-3 lg:gap-4 pl-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-base lg:text-lg line-clamp-1">Mini Test - Part 7</p>
                    <p className="text-xs lg:text-sm font-medium text-amber-500 line-clamp-1">Đang làm dở (Câu 12/25)</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs lg:text-sm font-bold rounded-xl transition-colors shadow-md shadow-indigo-200">
                    Tiếp tục
                  </button>
                </div>
              </div>

              {/* Item 1 */}
              <div className="group flex items-center justify-between p-3 lg:p-4 bg-white rounded-2xl border-2 border-slate-50 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-base lg:text-lg line-clamp-1">ETS 2024 - Test 1</p>
                    <p className="text-xs lg:text-sm font-medium text-slate-500 line-clamp-1">Full Test • Hôm qua</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-slate-800 text-lg lg:text-xl">850</p>
                  <p className="text-[10px] lg:text-xs font-bold text-emerald-500">+50 điểm</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group flex items-center justify-between p-3 lg:p-4 bg-white rounded-2xl border-2 border-slate-50 hover:border-sky-500 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <svg width="24" height="24" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                  </div>
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-800 text-base lg:text-lg truncate">Part 1: Photographs</p>
                    <p className="text-xs lg:text-sm font-medium text-slate-500 truncate">Practice • 2 ngày trước</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-slate-800 text-lg lg:text-xl">8/10</p>
                  <p className="text-[10px] lg:text-xs font-bold text-sky-500">Hoàn thành</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}