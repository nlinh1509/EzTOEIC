"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-24">
            {/* Chiều cao: 16 cho Mobile/iPad, bung ra 24 cho PC */}
            
            {/* ===================================================
                BÊN TRÁI: Logo + Hamburger + Menu PC
                =================================================== */}
            <div className="flex items-center gap-4 lg:gap-10">
              
              {/* Nút Hamburger: Đã đổi thành lg:hidden (Hiện trên cả Mobile & iPad) */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden pl-1 -ml-2 rounded-xl text-slate-500 hover:text-emerald-600 focus:outline-none transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo EzTOEIC */}
              <Link href="/" className="text-2xl lg:text-[26px] font-black text-emerald-600 tracking-tight">
                <span className="font-extrabold text-slate-900 tracking-tight">
                  Ez<span className="text-emerald-600">TOEIC</span>
                </span>
              </Link>

              {/* Menu Ngang: Đã đổi thành hidden lg:flex (Chỉ hiện từ PC trở lên) */}
              <div className="hidden lg:flex items-center space-x-8 mt-1">
                <Link
                  href="/exams/listening"
                  className={`text-base font-bold transition-all duration-300 ${
                    pathname.startsWith("/exams")
                      ? "text-emerald-600 underline decoration-2 underline-offset-[6px] hover:no-underline"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  ETS TEST
                </Link>

                <Link
                  href="/vocabulary"
                  className={`text-base font-bold transition-all duration-300 ${
                    pathname.startsWith("/vocabulary")
                      ? "text-emerald-600 underline decoration-2 underline-offset-[6px] hover:no-underline"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  Vocabulary
                </Link>

                <Link
                  href="/leaderboard"
                  className={`text-base font-bold transition-all duration-300 ${
                    pathname.startsWith("/leaderboard")
                      ? "text-emerald-600 underline decoration-2 underline-offset-[6px] hover:no-underline"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  Bảng xếp hạng
                </Link>
              </div>
            </div>

            {/* ===================================================
                BÊN PHẢI: Avatar Dropdown (Chỉ hiện từ PC trở lên)
                =================================================== */}
            {/* ===================================================
                BÊN PHẢI: Avatar Dropdown / Nút Đăng nhập
                =================================================== */}
            {/* Đổi từ hidden lg:flex thành flex để lúc nào cũng hiện block bên phải */}
            <div className="flex items-center shrink-0">
              {session ? (
                <>
                  {/* 📱 1. AVATAR CHO MOBILE & IPAD (< 1024px)
                      Bấm vào là phi thẳng ra Trang cá nhân luôn */}
                  <Link
                    href="/profile"
                    className="lg:hidden relative w-9 h-9 md:w-10 md:h-10 rounded-full ring-2 ring-emerald-50 hover:ring-emerald-500/40 hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <Image
                      src={session.user?.image || "/logo.png"}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* 💻 2. AVATAR DROPDOWN CHO PC (>= 1024px)
                      Bấm vào xổ menu xịn sò */}
                  <div className="hidden lg:block relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="block focus:outline-none"
                    >
                      <div className="w-11 h-11 relative rounded-full ring-2 ring-emerald-50 hover:ring-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                        <Image
                          src={session.user?.image || "/logo.png"}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </button>

                    {/* Dropdown Menu PC */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-3 w-60 origin-top-right bg-white rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 z-50 py-2">
                        <div className="px-5 py-3 border-b border-slate-50 mb-1 bg-slate-50/50 mx-2 rounded-xl">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                            Tài khoản của bạn
                          </p>
                          <p className="text-sm font-bold text-slate-800 truncate">
                            {session.user?.email}
                          </p>
                        </div>

                        <div className="px-2">
                          <Link
                            href="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors"
                          >
                            Trang cá nhân
                          </Link>

                          <Link
                            href="/settings"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors"
                          >
                            Cài đặt
                          </Link>
                        </div>

                        <div className="border-t border-slate-100 my-2"></div>

                        <div className="px-2">
                          <button
                            onClick={() => signOut()}
                            className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                          >
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Nút Đăng nhập: Tui vẫn ẩn trên Mobile (lg:flex) để user dùng nút trong Hamburger cho gọn, trên PC thì hiện nút to */
                <Link
                  href="/login"
                  className="hidden lg:flex px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===================================================
          SIDEBAR DÀNH CHO MOBILE & IPAD (< 1024px)
          =================================================== */}
      {/* Đổi thành lg:hidden */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-50 lg:hidden flex flex-col transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
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

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 pb-8">
          {session ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0 w-12 h-12 rounded-full border-2 border-emerald-500 overflow-hidden bg-white">
                    <Image
                      src={session.user?.image || "/logo.png"}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 line-clamp-1">
                      {session.user?.name}
                    </p>
                    <p className="text-[11px] font-bold text-emerald-600 mt-0.5">
                      Xem hồ sơ
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-emerald-600 transition-all shadow-sm mt-2"
              >
                Cài đặt
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full mt-1 py-3 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-[15px] shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors text-center flex justify-center"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </>
  );
}