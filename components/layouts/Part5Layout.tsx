"use client";
import { useState, useEffect } from "react";
import MultipleChoice from "@/components/MultipleChoice";
import { QuestionGroup } from "@/data/mockData";

// Nhận Data từ Tầng 3 (Page) truyền xuống
export default function Part5Layout({ data }: { data: QuestionGroup }) {
  const questions = data.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Logic xử lý khi click chọn A, B, C, D
  const handleSelect = (label: string) => {
    if (!isChecked) {
      setSelectedOption(label);
      setIsChecked(true);
      if (label === questions[currentIndex].correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
    }
  };

  // Bắt sự kiện phím Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChecked, currentIndex, questions.length]);

  // --- GIAO DIỆN HOÀN THÀNH ---
  if (isFinished) {
    return (
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-md mx-auto mt-10">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl">
            workspace_premium
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Hoàn Thành!</h2>
        <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 mt-6">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
            Kết quả của bạn
          </p>
          <p className="text-5xl font-black text-emerald-500">
            {score}{" "}
            <span className="text-2xl text-slate-300">
              / {questions.length}
            </span>
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 rounded-2xl cursor-pointer bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          Làm Lại Từ Đầu
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // --- GIAO DIỆN LÀM BÀI ---
  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-6 pb-12 mt-6 pt-8">
      {/* Thanh tiến độ */}
      <div className="mb-2">
        <div className="flex justify-between items-end mb-3 px-2">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              PART 5 - TEST 1
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Choose the word or phrase that best completes the sentence.
            </p>
          </div>
          <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-lg text-sm">
            Question {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-slate-100">
        <div className="mb-8">
          <p className="text-lg md:text-lg font-semibold leading-relaxed text-slate-600 ">
            <span className="text-emerald-600 font-bold mr-1">
              Question {currentQ.questionNumber}.
            </span>
            {currentQ.questionText}
          </p>
        </div>

        {/* multiple choice */}
        <MultipleChoice
          options={currentQ.options}
          selectedOption={selectedOption}
          correctAnswer={currentQ.correctAnswer}
          isChecked={isChecked}
          onSelect={handleSelect}
        />

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          {!isChecked ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              Skip{" "}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-10 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 font-sans transition-all flex items-center gap-2 animate-in fade-in slide-in-from-right-4 cursor-pointer"
            >
              Next{" "}
            </button>
          )}
        </div>
      </div>

      {/* Vùng Giải thích */}
      {isChecked && (
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[1.5rem] animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    {currentQ.correctAnswer}
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
