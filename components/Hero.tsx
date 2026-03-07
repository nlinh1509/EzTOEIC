export default function Hero() {
  return (
    <section className="mesh-gradient rounded-[3rem] p-12 md:p-20 mt-10 relative overflow-hidden shadow-2xl shadow-emerald-900/20 text-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-100 tracking-wide uppercase">
          <span className="material-symbols-outlined text-emerald-300 filled-icon text-base">
            verified
          </span>
          <span>Chinh phục 990 TOEIC cùng Trí tuệ nhân tạo</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
          Bắt đầu học <br />
          <span className="text-emerald-400">ngay lập tức.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-emerald-50/80 text-xl leading-relaxed font-medium">
          Nền tảng học TOEIC hiện đại nhất Việt Nam. Không cần thủ tục đăng ký
          rườm rà, thử sức với các bài học AI ngay bây giờ.
        </p>

        {/* Call to Action Buttons */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 px-12 rounded-2xl transition-all shadow-2xl shadow-emerald-500/40 flex items-center gap-3 text-lg group">
            HỌC THỬ NGAY - KHÔNG CẦN ĐĂNG NHẬP
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              rocket_launch
            </span>
          </button>
          <p className="text-emerald-200/60 text-sm font-medium italic">
            * Kết quả của bạn sẽ không được lưu nếu chưa tạo tài khoản
          </p>
        </div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
    </section>
  );
}
