import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    // box bg
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 ">
      {/* box size, layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* content in box */}
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 cursor-pointer ">
            <Image
              src="/logo.png"
              alt="strops logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h1 className="text-2xl text-primary font-black tracking-tight">
              STROPS
            </h1>
          </Link>

          {/* search bar */}

          {/* layout wrapper */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full   ">
              <input
                className="block w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all  "
                type="text"
                placeholder="Search sports, venues, or locations..."
              />
            </div>
          </div>

          {/* auth buttons */}
          <div className="flex gap-4 ">
            <button className="px-5 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer ">
              Login
            </button>
            <button className="px-6 py-2.5 font-bold bg-primary text-white rounded-full hover:bg-emerald-700 transition-colors shadow-md active:scale-95 cursor-pointer">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
