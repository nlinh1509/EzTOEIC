"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // THÊM DÒNG NÀY VÔ NÈ

  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            {/* BÊN TRÁI: Nút Mobile + Logo + Menu PC */}
            <div className="flex gap-4 md:gap-8 ">
              {/* hamburger */}
              <button
                onClick={() => setIsOpen(true)}
                className=" md:hidden pl-1 -ml-2 rounded-xl text-slate-500 hover:text-emerald-600 focus:outline-none transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* EzTOEIC logo */}
              <Link
                href="/"
                className="text-2xl font-black text-emerald-600 tracking-tight"
              >
                <span className="font-extrabold text-slate-900 tracking-tight">
                  Ez<span className="text-emerald-600">TOEIC</span>
                </span>
              </Link>

              {/* laptop size */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link
                  href="/exams/listening"
                  className={`text-sm font-semibold transition-all duration-300 ${
                    pathname.startsWith("/exams")
                      ? "text-emerald-600 underline decoration-2 underline-offset-[6px] hover:no-underline"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  ETS TEST
                </Link>

                <Link
                  href="/vocabulary"
                  className={`text-sm font-semibold transition-all duration-300 ${
                    pathname.startsWith("/vocabulary")
                      ? "text-emerald-600 underline decoration-2 underline-offset-[6px] hover:no-underline"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  Vocabulary
                </Link>

                <Link
                  href="/leaderboard"
                  className={`text-sm font-semibold transition-all duration-300 ${
                    pathname.startsWith("/leaderboard")
                      ? "text-emerald-600 underline decoration-2 underline-offset-[6px] hover:no-underline"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  Bảng xếp hạng
                </Link>
              </div>
            </div>

            {/* BÊN PHẢI: Avatar luôn hiện             */}
            <div className="flex items-center shrink-0">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="block focus:outline-none cursor-pointer"
                  >
                    <Image
                      src={session.user?.image || "/logo.png"}
                      alt="Avatar"
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-transparent hover:ring-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 object-cover"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="hidden md:block absolute right-0 left-auto top-full mt-2 w-56 origin-top-right bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 py-2">
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-xs font-medium text-slate-400 truncate">
                          Đăng nhập với tư cách
                        </p>
                        <p className="text-sm font-bold text-slate-700 truncate">
                          {session.user?.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                        Trang cá nhân
                      </Link>

                      <Link
                        href="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        Cài đặt
                      </Link>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          ></path>
                        </svg>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Thay vì <button onClick=...>
                <Link
                  href="/login"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed inset-0 bg-slate-900/50 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 md:hidden flex flex-col transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black text-emerald-600 tracking-tight"
            onClick={() => setIsOpen(false)}
          >
            Ez<span className="text-slate-800">TOEIC</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-rose-500 bg-slate-50 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link
            href="/exams"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all ${
              pathname.startsWith("/exams")
                ? "bg-emerald-50 text-emerald-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="text-xl">🎧</span> ETS Test
          </Link>
          <Link
            href="/vocabulary"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all ${
              pathname.startsWith("/vocabulary")
                ? "bg-emerald-50 text-emerald-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="text-xl">📚</span> Vocabulary
          </Link>
          <Link
            href="/leaderboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all ${
              pathname.startsWith("/leaderboard")
                ? "bg-emerald-50 text-emerald-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="text-xl">🏆</span> Bảng xếp hạng
          </Link>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          {session ? (
            <div className="flex flex-col gap-2">
              {" "}
              {/* NÚT 1: HỒ SƠ (Avatar bự) */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0 w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden bg-white">
                    {/* <Image
                      src={session.user?.image || "/logo.png"}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 line-clamp-1">
                      {session.user?.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      Nhấn để xem hồ sơ
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              {/* NÚT 2: CÀI ĐẶT (SẾP MỚI YÊU CẦU NÈ) */}
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-emerald-600 transition-all shadow-sm"
              >
                {/* icon bánh răng */}
                {/* <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg> */}
                Cài đặt
              </Link>
              {/* NÚT 3: ĐĂNG XUẤT */}
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full mt-1 py-2.5 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            // Thay vì <button onClick=...>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors text-center flex justify-center cursor-pointer"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
