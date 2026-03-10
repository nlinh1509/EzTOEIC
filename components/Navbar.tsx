import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-8 py-4">
      {/* inset-x-0 đảm bảo navbar luôn full chiều rộng khi dùng fixed */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
              Ez<span className="text-primary">ToX</span>
            </span>
          </Link>

          {/* menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
              href="/exams"
            >
              Luyện đề
            </Link>
            <Link
              className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
              href="/"
            >
              Thư viện đề thi
            </Link>
            <Link
              className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
              href="/leaderboard"
            >
              Bảng xếp hạng
            </Link>
          </div>
        </div>

        {/* auth buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer">
            Đăng nhập
          </button>
          <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer">
            Đăng ký ngay
          </button>
        </div>
      </div>
    </nav>
  );
}
