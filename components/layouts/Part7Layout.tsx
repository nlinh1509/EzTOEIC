"use client";
import { useState, useEffect } from "react";
import MultipleChoice from "@/components/MultipleChoice";
import { QuestionGroup } from "@/data/mockData";

export default function Part7Layout({ data }: { data: QuestionGroup[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentGroup = data[currentIndex];
  const totalGroups = data.length;

  const handleSelect = (questionId: string, label: string) => {
    if (!isChecked) {
      setAnswers((prev) => ({ ...prev, [questionId]: label }));
    }
  };

  const handleCheck = () => {
    setIsChecked(true);
    let groupScore = 0;
    currentGroup.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) groupScore += 1;
    });
    setScore((prev) => prev + groupScore);
  };

  const handleNext = () => {
    if (currentIndex < totalGroups - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswers({});
      setIsChecked(false);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        !isChecked ? handleCheck() : handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChecked, currentIndex, totalGroups, answers]);

  if (isFinished) {
    const totalQuestions = data.reduce(
      (total, group) => total + group.questions.length,
      0,
    );
    return (
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-md mx-auto mt-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2">
          Hoàn Thành Part 7!
        </h2>
        <p className="text-5xl font-black text-emerald-500 mt-6">
          {score}{" "}
          <span className="text-2xl text-slate-300">/ {totalQuestions}</span>
        </p>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / totalGroups) * 100;

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6 pb-12 mt-6 pt-8">
      {/* Header */}
      <div className="mb-4 ">
        <div className="flex justify-between items-end mb-3 px-2">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              PART 7 - TEST 1
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Read the passage(s) and answer the questions.
            </p>
          </div>
          <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-lg text-sm">
            Passage {currentIndex + 1} / {totalGroups}
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* GIAO DIỆN CHIA 2 CỘT (SPLIT SCREEN) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* CỘT TRÁI: ĐOẠN VĂN (Đã fix lỗi bị cắt chữ bằng max-h và cuộn độc lập) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white shadow-sm border border-slate-100 p-6 md:p-8 rounded-[1.5rem]">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <span
                className="material-symbols-outlined text-emerald-500"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                article
              </span>
              <h3 className="font-bold text-slate-700">Reading Passage</h3>
            </div>
            {/* Render HTML đoạn văn từ Data */}
            <div
              className="prose prose-slate max-w-none text-[15px] md:text-[16px]"
              dangerouslySetInnerHTML={{
                __html: currentGroup.passageText || "",
              }}
            />
          </div>
        </div>

        {/* CỘT PHẢI: DANH SÁCH CÂU HỎI */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {currentGroup.questions.map((q) => (
            <div
              key={q.id}
              className="bg-white shadow-sm border border-slate-100 p-6 md:p-8 rounded-[1.5rem] flex flex-col"
            >
              <p className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm md:text-base font-semibold leading-relaxed text-slate-600">
                <span className="text-emerald-600 font-bold mr-1">
                  Question {q.questionNumber}.
                </span>
                {q.questionText}{" "} 
                {/* <-- Tui đã trả lại nội dung đề bài chuẩn cho câu hỏi ở đây nha */}
              </p>

              <div className="w-full">
                <MultipleChoice
                  options={q.options}
                  selectedOption={answers[q.id] || null}
                  correctAnswer={q.correctAnswer}
                  isChecked={isChecked}
                  onSelect={(label) => handleSelect(q.id, label)}
                />
              </div>

              {/* Giải thích */}
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
                            {q.correctAnswer}
                          </strong>
                        </p>
                        <div className="bg-white/80 p-4 rounded-2xl border border-emerald-100/50">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* NÚT ACTION */}
          <div className="mt-2 flex justify-end">
            {!isChecked ? (
              <button
                onClick={handleCheck}
                disabled={
                  Object.keys(answers).length < currentGroup.questions.length
                }
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answers{" "}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Next Passage{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
