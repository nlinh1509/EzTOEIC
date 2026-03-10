interface FullCardProps {
  title: string;
  isVerified?: boolean;
}

export default function FullCard({ title, isVerified }: FullCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-sm hover-lift group relative overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 shrink-0 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl font-bold">
            article
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-lexend">
          {title}
        </h3>
      </div>

      {/* info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-slate-500">
          <span className=" material-symbols-outlined text-slate-400 text-xl">
            face
          </span>
          <p className="text-[13px] font-medium">100 câu nghe - Điền khuyết</p>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span className="material-symbols-outlined text-slate-400 text-xl">
            menu_book
          </span>
          <p className="text-[13px] font-medium">100 câu đọc - Chi tiết</p>
        </div>
      </div>

      {/* action buttons */}
      <div className="flex gap-3 relative z-10">
        <button className="text-sm grow flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-100 cursor-pointer">
          <span className="material-symbols-outlined filled-icon text-lg">
            play_circle
          </span>
          Làm Bài
        </button>
        {/* <button className=" text-sm flex items-center justify-center gap-2 px-6 border-2 border-orange-100 bg-orange-50 text-orange-600 font-bold py-3.5 rounded-2xl hover:bg-orange-100 transition-all cursor-pointer">
          <span className="material-symbols-outlined filled-icon text-lg">
            visibility
          </span>
          Review
        </button> */}
      </div>

      {/* Verified Watermark */}
      {isVerified && (
        <div className="absolute -top-1 -right-1 pointer-events-none">
          <span className="material-symbols-outlined text-emerald-200/50 text-6xl rotate-12">
            verified
          </span>
        </div>
      )}
    </div>
  );
}
