// components/Header.tsx
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/logo.png" // Đường dẫn đến file ảnh trong thư mục public
              alt="Strops Logo" // Mô tả ảnh
              width={40} // Chiều rộng (tương đương w-10)
              height={40} // Chiều cao (tương đương h-10)
              className="rounded-xl" // Vẫn giữ bo góc nếu cần
            />
            <span className="text-2xl font-extrabold tracking-tight text-primary">
              STROPS
            </span>
          </Link>

          {/* Search Bar (Dành cho bản Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                className="block w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-emerald-500 rounded-full text-sm"
                placeholder="Search sports, venues, or locations...."
                type="text"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors">
              Login
            </button>
            <button className="px-6 py-2.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-emerald-700 transition-all shadow-md active:scale-95">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
