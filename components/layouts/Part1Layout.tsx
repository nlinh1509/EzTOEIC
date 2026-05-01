"use client";
import { useState, useEffect, useCallback } from "react";
import MultipleChoice from "@/components/MultipleChoice";
import AudioPlayer from "@/components/AudioPlayer";

// 1. CẬP NHẬT INTERFACE CHO KHỚP VỚI SUPABASE DATA
interface Question {
  id: number;
  question_number: number;
  content: string;
  image_url: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
}

interface RealPart1Group {
  id: number;
  passage_text: string;
  audio_url: string;
  questions: Question[];
}

export default function Part1Layout({ data }: { data: RealPart1Group[] }) {
  // 1. TOÀN BỘ HOOKS PHẢI NẰM Ở TRÊN CÙNG
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Khai báo biến an toàn để xài trong Hook
  const totalQuestions = data?.length || 0;

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, totalQuestions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isChecked) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChecked, handleNext]);

  // =========================================================
  // 2. TỪ ĐÂY TRỞ XUỐNG MỚI ĐƯỢC XÀI "IF ... RETURN"
  // =========================================================

  // Check an toàn nếu data rỗng
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-slate-500 font-medium">
        Đang tải dữ liệu...
      </div>
    );
  }

  const currentGroup = data[currentIndex];
  const currentQ = currentGroup?.questions?.[0];

  if (!currentQ) {
    return (
      <div className="p-10 text-center mt-10 max-w-md mx-auto bg-rose-50 border border-rose-200 rounded-2xl">
        <h3 className="text-rose-600 font-bold mb-2">Lỗi Dữ Liệu!</h3>
        <p className="text-rose-500 text-sm">
          Không tìm thấy câu hỏi cho đoạn audio này.
        </p>
      </div>
    );
  }

  // Nếu màn hình hiển thị Result Card
  if (isFinished) {
    return (
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-md mx-auto mt-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2">
          Hoàn Thành Part 1!
        </h2>
        <p className="text-5xl font-black text-emerald-500 mt-6">
          {score}{" "}
          <span className="text-2xl text-slate-300">/ {totalQuestions}</span>
        </p>
      </div>
    );
  }

  // =========================================================
  // 3. LOGIC XỬ LÝ GIAO DIỆN CHÍNH
  // =========================================================

  const handleSelect = (label: string) => {
    if (!isChecked) {
      setSelectedOption(label);
      setIsChecked(true);
      if (label === currentQ.correct_answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const noTextOptions = [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ];

  const explanationText = currentQ.explanation || "";
  const transcriptPart = explanationText
    .split("=>")[0]
    ?.replace("Transcript:", "")
    .trim();
  const reasoningPart = explanationText.split("=>")[1]?.trim();

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-6 pb-12 mt-6 pt-8">
      {/* Header */}
      <div className="mb-4">
        {/* 
      - flex-col: Xếp chồng lên nhau khi ở màn hình nhỏ
      - sm:flex-row: Tự động dàn hàng ngang khi màn hình từ 640px trở lên
      - items-start sm:items-end: Căn lề trái trên mobile, căn lề dưới trên desktop
  */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-3 px-2">
          <div className="max-w-2xl">
            <h2 className="text-lg sm:text-xl font-black text-slate-800 uppercase tracking-tight">
              PART 1 - TEST 1
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium leading-tight">
              Listen to the audio and choose the statement that best describes
              the picture.
            </p>
          </div>

          {/* 
        - whitespace-nowrap: Không cho phép cái Badge này bị xuống dòng giữa chữ Question và số
        - self-start sm:self-auto: Giúp Badge không bị kéo dài hết chiều rộng trên mobile
    */}
          <span className="whitespace-nowrap text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-lg text-xs sm:text-sm self-start sm:self-auto shadow-sm">
            Question {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress Bar giữ nguyên hoặc sếp có thể bóp nhẹ margin */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* KHUNG GIAO DIỆN CHIA 2 CỘT */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* CỘT TRÁI: HÌNH ẢNH TO ĐÙNG */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full bg-slate-50 rounded-xl overflow-hidden shadow-sm border border-slate-200 group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.image_url}
              alt={`Part 1 Question ${currentQ.question_number}`}
              className="w-full h-auto block transition-transform duration-700"
            />
          </div>
        </div>

        {/* CỘT PHẢI: AUDIO & ĐÁP ÁN */}
        <div className="w-full md:w-1/2 flex flex-col  gap-6">
          <AudioPlayer
            key={currentGroup.audio_url}
            src={currentGroup.audio_url}
          />
          <div className="bg-white shadow-sm border border-slate-100 p-6 md:p-8 rounded-[1.5rem]  flex flex-col  ">
            <p className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm md:text-base font-semibold leading-relaxed text-slate-600">
              <span className="text-emerald-600 font-bold mr-1">
                Question {currentQ.question_number}.
              </span>
              Look at the picture marked number {currentQ.question_number} in
              your test book.
            </p>

            <MultipleChoice
              options={noTextOptions}
              selectedOption={selectedOption}
              correctAnswer={currentQ.correct_answer}
              isChecked={isChecked}
              onSelect={handleSelect}
            />

            {/* skip/next */}
            <div className="mt-auto pt-8 w-full cursor-pointer">
              {!isChecked ? (
                <button
                  onClick={handleNext}
                  className="w-full px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Skip
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* explan box */}
      {isChecked && (
        <div className="mt-6 bg-emerald-50 border border-emerald-100 p-6 rounded-[1.5rem] animate-in fade-in duration-500">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                check_circle
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-emerald-700 font-black text-lg mb-2">
                Giải thích
              </h3>
              <div className="space-y-3 text-slate-700 font-medium leading-relaxed">
                <p>
                  Đáp án chính xác là:{" "}
                  <strong className="text-emerald-600 font-black text-xl ml-1">
                    {currentQ.correct_answer}
                  </strong>
                </p>
                <div className="bg-white/80 p-4 rounded-2xl border border-emerald-100/50">
                  {currentQ.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
