"use client";
import { useState, useEffect } from "react";
import MultipleChoice from "@/components/MultipleChoice";
import AudioPlayer from "@/components/AudioPlayer";
import { QuestionGroup } from "@/data/mockData";

export default function Part1Layout({ data }: { data: QuestionGroup[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentGroup = data[currentIndex];
  const currentQ = currentGroup.questions[0]; // Rút câu hỏi đầu tiên của group
  const totalQuestions = data.length; // Tổng số câu = Tổng số group

  const handleSelect = (label: string) => {
    if (!isChecked) {
      setSelectedOption(label);
      setIsChecked(true);
      if (label === currentQ.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChecked, currentIndex, totalQuestions]);

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

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  // Xóa chữ "Option A, B..."
  const noTextOptions = currentQ.options.map((opt) => ({
    label: opt.label,
    text: "",
  }));

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-6 pb-12 mt-6 pt-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-3 px-2">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              PART 1 - TEST 1
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Listen to the audio and choose the statement that best describes
              the picture.
            </p>
          </div>
          <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-lg text-sm">
            Question {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* process */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* KHUNG GIAO DIỆN CHIA 2 CỘT */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* CỘT TRÁI: HÌNH ẢNH TO ĐÙNG */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full flex-1 min-h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                currentGroup.imageUrl || // LẤY ẢNH TỪ currentGroup NÈ
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
              }
              alt={`Part 1 Question ${currentQ.questionNumber}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            />
          </div>
        </div>

        {/* CỘT PHẢI: AUDIO & ĐÁP ÁN */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <AudioPlayer
            key={currentGroup.audioUrl} // QUAN TRỌNG: Thêm key để React reset audio
            src={
              currentGroup.audioUrl || // LẤY NHẠC TỪ currentGroup NÈ
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            }
          />
          <div className="bg-white shadow-sm border border-slate-100 p-6 md:p-8 rounded-[1.5rem] flex-1 flex flex-col">
            <p className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm md:text-base font-semibold leading-relaxed text-slate-600">
              <span className="text-emerald-600 font-bold mr-1">
                Question {currentQ.questionNumber}.
              </span>
              Look at the picture marked number one in your test book.
            </p>

            <MultipleChoice
              options={noTextOptions}
              selectedOption={selectedOption}
              correctAnswer={currentQ.correctAnswer}
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
