"use client";
import { useState, useEffect } from "react";
import MultipleChoice from "@/components/MultipleChoice";
import AudioPlayer from "@/components/AudioPlayer";
import { QuestionGroup } from "@/data/mockData";

export default function Part4Layout({ data }: { data: QuestionGroup[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dùng Object để lưu đáp án của 3 câu hỏi cùng lúc (VD: { "q-45": "A", "q-46": "C" })
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentGroup = data[currentIndex];
  const totalGroups = data.length;

  // Cập nhật đáp án cho câu hỏi tương ứng
  const handleSelect = (questionId: string, label: string) => {
    if (!isChecked) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: label,
      }));
    }
  };

  // Nút Check Answers (Chấm điểm cả 3 câu)
  const handleCheck = () => {
    setIsChecked(true);
    let groupScore = 0;
    currentGroup.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        groupScore += 1;
      }
    });
    setScore((prev) => prev + groupScore);
  };

  // Nút Next (Chuyển sang đoạn hội thoại tiếp theo)
  const handleNext = () => {
    if (currentIndex < totalGroups - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswers({}); // Xóa sạch đáp án cũ
      setIsChecked(false); // Trả lại trạng thái chưa nộp
    } else {
      setIsFinished(true);
    }
  };

  // Hỗ trợ bấm Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!isChecked) {
          handleCheck(); // Nếu chưa nộp thì Enter = Nộp
        } else {
          handleNext(); // Nếu nộp rồi thì Enter = Next
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChecked, currentIndex, totalGroups, answers]);

  if (isFinished) {
    // Tính tổng số lượng câu hỏi con trong toàn bộ các Group
    const totalQuestions = data.reduce(
      (total, group) => total + group.questions.length,
      0,
    );
    return (
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-md mx-auto mt-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2">
          Hoàn Thành Part 4!
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
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-6 pb-12 mt-6 pt-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-3 px-2">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              PART 4 - TEST 1
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Listen to the short talk and answer the questions.{" "}
            </p>
          </div>
          <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-lg text-sm">
            Talk {currentIndex + 1} / {totalGroups}
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

      {/* KHUNG AUDIO - DÍNH TRÊN TRẦN NHÀ */}
      <div className="">
        <AudioPlayer
          key={currentGroup.audioUrl}
          src={
            currentGroup.audioUrl ||
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          }
        />
      </div>
      {/* DANH SÁCH 3 CÂU HỎI CON */}
      <div className="flex flex-col gap-6">
        {currentGroup.questions.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow-sm border border-slate-100 p-6 md:p-8 rounded-[1.5rem] flex flex-col"
          >
            <p className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm md:text-lg font-semibold leading-relaxed text-slate-600">
              <span className="text-emerald-600 font-bold mr-1">
                Question {q.questionNumber}.
              </span>
              {q.questionText}
            </p>

            <div className="w-full">
              <MultipleChoice
                options={q.options}
                selectedOption={answers[q.id] || null} // Truyền đáp án tương ứng của câu này vào
                correctAnswer={q.correctAnswer}
                isChecked={isChecked}
                onSelect={(label) => handleSelect(q.id, label)} // Chọn xong lưu vào ID tương ứng
              />
            </div>

            {/* Khung giải thích UI chuẩn của Linh */}
            {isChecked && (
              <div className="mt-6 bg-emerald-50 border border-emerald-100 p-6 rounded-[1.5rem] animate-in fade-in slide-in-from-bottom-4 duration-500">
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
      </div>

      {/* KHUNG NÚT ACTION (NẰM DƯỚI CÙNG) */}
      <div className="mt-4 mb-8 flex justify-end">
        {!isChecked ? (
          <button
            onClick={handleCheck}
            className="w-full md:w-auto px-8 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition-all shadow-sm cursor-pointer"
          >
            Check Answers
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full md:w-auto px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            Next Talk{" "}
          </button>
        )}
      </div>
    </div>
  );
}
