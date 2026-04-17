export interface ExamItem {
  id: number;
  title: string;
}

const years = ["2026", "2025", "2024", "2023"];

export const examsDatabase: Record<string, ExamItem[]> = years.reduce(
  (acc, year) => {
    acc[year] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `TOEIC ${year} TEST ${index + 1}`,
    }));
    return acc;
  },
  {} as Record<string, ExamItem[]>,
);

export type ExamPart = {
  id: number;
  title: string;
  tag: string;
  desc: string;
  questions: string;
  time: string;
};

export const listeningParts: ExamPart[] = [
  {
    id: 1,
    title: "Part 1: Photographs",
    tag: "Listening",
    desc: "Mô tả hình ảnh - Nghe và chọn phương án đúng nhất mô tả về bức tranh.",
    questions: "6 Questions",
    time: "~5 Minutes",
  },
  {
    id: 2,
    title: "Part 2: Question & Response",
    tag: "Listening",
    desc: "Hỏi và đáp - Nghe câu hỏi và chọn phản hồi phù hợp nhất trong 3 lựa chọn.",
    questions: "25 Questions",
    time: "~15 Minutes",
  },
  {
    id: 3,
    title: "Part 3: Short Conversations",
    tag: "Listening",
    desc: "Hội thoại ngắn - Nghe đoạn hội thoại giữa 2-3 người và trả lời câu hỏi liên quan.",
    questions: "39 Questions",
    time: "~25 Minutes",
  },
  {
    id: 4,
    title: "Part 4: Short Talks",
    tag: "Listening",
    desc: "Bài nói ngắn - Nghe bài thuyết trình hoặc thông báo và trả lời các câu hỏi.",
    questions: "30 Questions",
    time: "~20 Minutes",
  },
];

export const readingParts: ExamPart[] = [
  {
    id: 5,
    title: "Part 5: Incomplete Sentences",
    tag: "Reading",
    desc: "Điền vào chỗ trống - Chọn từ hoặc cụm từ phù hợp nhất để hoàn thành câu.",
    questions: "30 Questions",
    time: "~15 Minutes",
  },
  {
    id: 6,
    title: "Part 6: Text Completion",
    tag: "Reading",
    desc: "Điền từ đoạn văn - Chọn từ, cụm từ hoặc câu phù hợp để hoàn thành đoạn văn.",
    questions: "16 Questions",
    time: "~10 Minutes",
  },
  {
    id: 7,
    title: "Part 7: Reading Comprehension",
    tag: "Reading",
    desc: "Đọc hiểu - Đọc các đoạn văn đơn, kép, đa và trả lời các câu hỏi liên quan.",
    questions: "54 Questions",
    time: "~50 Minutes",
  },
];
