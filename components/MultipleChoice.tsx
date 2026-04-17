"use client";

interface Option {
  label: string; // "A", "B", "C", "D"
  text: string; // "actively", "activity", hoặc "" (rỗng)
}

interface MultipleChoiceProps {
  options: Option[];
  selectedOption: string | null;
  correctAnswer?: string; // Tùy chọn: Truyền vào khi đã nộp bài để biết câu nào đúng
  isChecked: boolean; // Trạng thái: Đã chốt đáp án chưa?
  onSelect: (label: string) => void;
}

export default function MultipleChoice({
  options,
  selectedOption,
  correctAnswer,
  isChecked,
  onSelect,
}: MultipleChoiceProps) {
  // Xác định xem mảng options này có chứa chữ không (để lát biết đường dàn layout)
  const hasText = options.some((opt) => opt.text.trim() !== "");

  return (
    // Nếu có chữ thì xếp dọc (1 cột), nếu không có chữ (Part 1, 2) thì xếp ngang ngang cho gọn
    <div
      className={`grid gap-4 ${
        hasText
          ? "grid-cols-1 md:grid-cols-2" // Nếu có chữ thì chia 2 cột
          : options.length === 3
            ? "grid-cols-3" // Nếu Part 2 (3 đáp án) thì chia 3 cột
            : "grid-cols-2 md:grid-cols-4" // Nếu Part 1 (4 đáp án) thì chia 4 cột
      }`}
    >
      {options.map((opt) => {
        // 1. let tailwind
        let btnStyle =
          "border-slate-200 bg-white hover:border-emerald-700/50 hover:bg-emerald-50/50 cursor-pointer active:scale-[0.98]";
        let letterStyle =
          "bg-slate-100 text-slate-500 group-hover:bg-emerald-500 group-hover:text-white";
        let textStyle = "text-slate-600";

        // 2. Style khi user click chọn (nhưng chưa nộp bài)
        if (!isChecked && selectedOption === opt.label) {
          btnStyle =
            "border-emerald-500 bg-emerald-50 shadow-md ring-1 ring-emerald-500/20";
          letterStyle = "bg-emerald-500 text-white";
          textStyle = "text-slate-900 font-bold";
        }

        // 3. Style sau khi bấm "Nộp bài / Chấm điểm" (isChecked = true)
        if (isChecked) {
          if (opt.label === correctAnswer) {
            // user chọn đúng -> XANH LÁ
            btnStyle = "border-emerald-600/80 bg-emerald-50 cursor-default";
            letterStyle = "bg-emerald-600 text-white";
            textStyle = "text-slate-900 font-bold";
          } else if (opt.label === selectedOption) {
            // user chọn sai -> ĐỎ
            btnStyle = "border-rose-500 bg-rose-50 cursor-default";
            letterStyle = "bg-rose-500 text-white";
            textStyle = "text-rose-900 font-bold";
          } else {
            // còn lại -> MỜ ĐI
            btnStyle = "border-slate-100 bg-white opacity-40 cursor-default";
            letterStyle = "bg-slate-50 text-slate-400";
            textStyle = "text-slate-400";
          }
        }

        return (
          <button
            key={opt.label}
            disabled={isChecked}
            onClick={() => onSelect(opt.label)}
            className={`flex items-center p-4 border-2 rounded-2xl transition-all duration-200 text-left group ${btnStyle} ${!hasText && "justify-center"}`}
          >
            {/* Chữ cái A, B, C, D */}
            <span
              className={`w-8 h-10 shrink-0 flex items-center justify-center rounded-xl font-bold text-lg transition-colors tracking-wider ${textStyle} ${hasText ? "mr-0" : ""}`}
            >
              {opt.label}
              {hasText ? "." : ""}
            </span>

            {/* answer*/}
            {hasText && opt.text !== "" && (
              <span
                className={`text-base font-semibold transition-colors ${textStyle} font-sans`}
              >
                {opt.text}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
