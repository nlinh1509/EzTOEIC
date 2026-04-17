"use client";

// [MỚI] Kéo thêm useState ra để làm công tắc bật/tắt Menu
import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // [MỚI] Biến công tắc: Trạng thái đóng/mở của Dropdown Menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isHiddenPage =
    pathname === "/login" ||
    pathname.startsWith("/exams/full-test") ||
    pathname === "/register";

  if (isHiddenPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/60 px-8 py-4">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl z-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* logo*/}
          <Link
            href="/"
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="strops logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Ez<span className="text-emerald-600">TOEIC</span>
            </span>
          </Link>

          {/* menu */}
          <div className="hidden md:flex space-x-8">
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
        {/* auth buttons */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
          ) : session ? (
            // [CÚ CHỐT CUỐI CÙNG] Thêm chữ "relative" vào cái div này!
            <div className="relative inline-block">
              {/* Nút bấm là Avatar + Tên */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-slate-50 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <Image
                  src={session.user?.image || "/logo.png"}
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="rounded-full ring-2 ring-emerald-500/20"
                />
                <span className="hidden md:block text-sm font-bold text-slate-700 pr-2">
                  {session.user?.name}
                </span>
                {/* Icon mũi tên xổ xuống */}
                <svg
                  className="w-4 h-4 text-slate-400 hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Nếu công tắc BẬT thì hiện Menu */}
              {isDropdownOpen && (
                <>
                  {/* Tấm khiên tàng hình: Bấm ra ngoài là tự đóng */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>

                  {/* Khung Menu rớt xuống - Vì thằng Cha nó có "relative" nên "absolute" ở đây sẽ bám chặt vào đít Cha nó */}
                  <div className="absolute right-0 left-auto top-full mt-2 w-56 origin-top-right bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 py-2">
                    {" "}
                    {/* Chỗ này để hiển thị lại Email cho người dùng thấy */}
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
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
