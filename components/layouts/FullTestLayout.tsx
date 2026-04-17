"use client";
import { useState, useEffect } from "react";
import { FullTest } from "@/data/mockData";
import MultipleChoice from "../MultipleChoice";
import AudioPlayer from "../AudioPlayer";

export default function FullTestLayout({ testData }: { testData: FullTest }) {
  const [currentPartNumber, setCurrentPartNumber] = useState<
    1 | 2 | 3 | 4 | 5 | 6 | 7
  >(1);
  const [globalAnswers, setGlobalAnswers] = useState<Record<string, string>>(
    {},
  );

  // 1. THÊM LẠI STATE ĐỂ QUẢN LÝ CÂU HỎI HIỆN TẠI
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const sidebarMenu = [
    { part: 1, label: "Part 1: Photos", icon: "image" },
    { part: 2, label: "Part 2: Q&A", icon: "record_voice_over" },
    { part: 3, label: "Part 3: Conversations", icon: "group" },
    { part: 4, label: "Part 4: Talks", icon: "settings_voice" },
    { part: 5, label: "Part 5: Incomplete Sentences", icon: "edit_note" },
    { part: 6, label: "Part 6: Text Completion", icon: "article" },
    { part: 7, label: "Part 7: Reading", icon: "menu_book" },
  ];

  const currentPartData = testData.parts[currentPartNumber];

  // 2. LOGIC RESET CÂU HỎI KHI ĐỔI PART
  useEffect(() => {
    setCurrentGroupIndex(0);
  }, [currentPartNumber]);

  // 3. CÁC HÀM XỬ LÝ CLICK ĐÁP ÁN, NEXT, PREV
  const handleSelectOption = (questionId: string, label: string) => {
    setGlobalAnswers((prev) => ({
      ...prev,
      [questionId]: label,
    }));
  };

  const handleNext = () => {
    if (currentPartData && currentGroupIndex < currentPartData.length - 1) {
      setCurrentGroupIndex((prev) => prev + 1);
    } else {
      if (currentPartNumber < 7) {
        setCurrentPartNumber((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7);
      }
    }
  };

  const handlePrev = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex((prev) => prev - 1);
    } else {
      if (currentPartNumber > 1) {
        const prevPart = (currentPartNumber - 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
        setCurrentPartNumber(prevPart);
        setTimeout(() => {
          const prevPartData = testData.parts[prevPart];
          setCurrentGroupIndex(prevPartData ? prevPartData.length - 1 : 0);
        }, 0);
      }
    }
  };

  const currentGroup = currentPartData?.[currentGroupIndex];

  return (
    <div className="flex bg-zinc-50 font-sans relative min-h-screen">
      {/* ========================================= */}
      {/* CỘT TRÁI: SIDEBAR */}
      {/* ========================================= */}
      {/* Đã dọn dẹp bớt class dư thừa ở đây cho Linh */}
      <aside className="hidden md:flex flex-col w-72 h-fit sticky top-[72px] bg-zinc-50 border-r border-zinc-200 shrink-0 z-40">
        <div className="p-6">
          <h2 className="text-xl font-black text-emerald-600 font-lexend">
            TOEIC Practice
          </h2>
          <p className="text-sm font-bold text-zinc-500 mt-1">
            Progress: {Object.keys(globalAnswers).length} / 200
          </p>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pb-6 px-4">
          {sidebarMenu.map((item) => {
            const isActive = currentPartNumber === item.part;
            return (
              <button
                key={item.part}
                onClick={() =>
                  setCurrentPartNumber(item.part as 1 | 2 | 3 | 4 | 5 | 6 | 7)
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-bold border-r-4 border-emerald-500"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-left text-sm font-bold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ========================================= */}
      {/* CỘT PHẢI: KHU VỰC LÀM BÀI */}
      {/* ========================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER & TIMER */}
        <header className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="font-black text-xl text-zinc-800 tracking-tight">
              {testData.title}
            </h1>
            <p className="text-emerald-600 font-semibold text-sm mt-0.5 uppercase tracking-wider">
              {sidebarMenu.find((m) => m.part === currentPartNumber)?.label}
            </p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-right flex items-center gap-3 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200">
              <span className="material-symbols-outlined text-zinc-400">
                timer
              </span>
              <p className="font-mono text-xl md:text-2xl font-black text-zinc-700">
                119:59
              </p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold transition-colors cursor-pointer shadow-sm">
              Submit
            </button>
          </div>
        </header>

        {/* ========================================= */}
        {/* NỘI DUNG CÂU HỎI (SINGLE GROUP UI) */}
        {/* ========================================= */}
        <div className="w-full bg-zinc-50/50 flex-1">
          <div className=" mx-auto space-y-8 pb-20">
            {!currentPartData || currentPartData.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-2xl border border-zinc-200 text-zinc-400 font-medium">
                Dữ liệu Part này đang được cập nhật...
              </div>
            ) : (
              currentGroup && (
                <div className="bg-white p-6 md:p-8 flex flex-col gap-6 relative rounded-[1.5rem] border border-zinc-200 shadow-sm">
                  {/* Khu vực hiển thị đề bài: Audio, Image, Passage */}
                  <div className="border-b border-zinc-100 pb-4 mb-2 space-y-4">
                    {/* Thay thế cục render Audio bằng đoạn này */}
                    {/* DÙNG LẠI COMPONENT AUDIOPLAYER XỊN XÒ CỦA LINH */}
                    {currentGroup.audioUrl && (
                      <div className="mb-4 w-full">
                        <AudioPlayer
                          key={currentGroup.audioUrl} // Bắt buộc có key để khi qua câu khác nhạc tự reset
                          src={currentGroup.audioUrl}
                        />
                      </div>
                    )}

                    {currentGroup.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={currentGroup.imageUrl}
                        alt="Question Context"
                        className="max-h-[300px] rounded-xl object-cover border border-zinc-200 mx-auto"
                      />
                    )}

                    {currentGroup.passageText && (
                      <div
                        className="prose prose-zinc max-w-none bg-yellow-50/50 p-6 rounded-xl border border-yellow-100 text-[15px]"
                        dangerouslySetInnerHTML={{
                          __html: currentGroup.passageText,
                        }}
                      />
                    )}
                  </div>

                  {/* Danh sách câu hỏi và đáp án A B C D */}
                  <div className="space-y-6 flex-1">
                    {currentGroup.questions.map((q) => (
                      <div
                        key={q.id}
                        className="bg-zinc-50 p-5 rounded-xl border border-zinc-100"
                      >
                        <p className="font-semibold text-zinc-800 mb-4 text-[15px]">
                          <span className="text-emerald-600 font-black mr-2">
                            Q.{q.questionNumber}:
                          </span>
                          {q.questionText || "Choose the best answer."}
                        </p>

                        <div className="w-full">
                          <MultipleChoice
                            options={q.options}
                            selectedOption={globalAnswers[q.id] || null}
                            correctAnswer={q.correctAnswer} // Truyền vào để không báo lỗi prop
                            isChecked={false} // BẮT BUỘC FALSE TRONG LÚC LÀM BÀI
                            onSelect={(label) =>
                              handleSelectOption(q.id, label)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* KHUNG NÚT ĐIỀU HƯỚNG PREV / NEXT */}
                  <div className="flex justify-between items-center mt-4 border-t border-zinc-100 pt-6">
                    <button
                      onClick={handlePrev}
                      disabled={
                        currentPartNumber === 1 && currentGroupIndex === 0
                      }
                      className="px-6 py-3 rounded-xl font-bold text-zinc-500 bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">
                        arrow_back_ios_new
                      </span>
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-8 py-3 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      {currentPartNumber === 7 &&
                      currentGroupIndex === (currentPartData?.length ?? 1) - 1
                        ? "Finish"
                        : "Next"}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward_ios
                      </span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
