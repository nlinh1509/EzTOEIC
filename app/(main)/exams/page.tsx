export default function ExamsRootPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 font-lexend mb-2">
        Khu vực Luyện Thi TOEIC
      </h2>
      <p className="text-slate-500 font-medium max-w-sm">
        Vui lòng chọn kỹ năng bạn muốn luyện tập ở thanh Menu bên trái để bắt
        đầu.
      </p>
    </div>
  );
}
