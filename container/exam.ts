export interface ExamItem {
  id: number;
  title: string;
}

// Record < key, value(array)
export const examsDatabase: Record<string, ExamItem[]> = {
  "2026": [
    { id: 1, title: "TOEIC 2026 TEST 1" },
    { id: 2, title: "TOEIC 2026 TEST 2" },
    { id: 3, title: "TOEIC 2026 TEST 3" },
    { id: 4, title: "TOEIC 2026 TEST 4" },
    { id: 5, title: "TOEIC 2026 TEST 5" },
    { id: 6, title: "TOEIC 2026 TEST 6" },
    { id: 7, title: "TOEIC 2026 TEST 7" },
    { id: 8, title: "TOEIC 2026 TEST 8" },
    { id: 9, title: "TOEIC 2026 TEST 9" },
    { id: 10, title: "TOEIC 2026 TEST 10" },
  ],

  "2025": [
    { id: 1, title: "TOEIC 2025 TEST 1" },
    { id: 2, title: "TOEIC 2025 TEST 2" },
    { id: 3, title: "TOEIC 2025 TEST 3" },
    { id: 4, title: "TOEIC 2025 TEST 4" },
    { id: 5, title: "TOEIC 2025 TEST 5" },
    { id: 6, title: "TOEIC 2025 TEST 6" },
    { id: 7, title: "TOEIC 2025 TEST 7" },
    { id: 8, title: "TOEIC 2025 TEST 8" },
    { id: 9, title: "TOEIC 2025 TEST 9" },
    { id: 10, title: "TOEIC 2025 TEST 10" },
  ],

  "2024": [
    { id: 1, title: "TOEIC 2024 TEST 1" },
    { id: 2, title: "TOEIC 2024 TEST 2" },
    { id: 3, title: "TOEIC 2024 TEST 3" },
    { id: 4, title: "TOEIC 2024 TEST 4" },
    { id: 5, title: "TOEIC 2024 TEST 5" },
    { id: 6, title: "TOEIC 2024 TEST 6" },
    { id: 7, title: "TOEIC 2024 TEST 7" },
    { id: 8, title: "TOEIC 2024 TEST 8" },
    { id: 9, title: "TOEIC 2024 TEST 9" },
    { id: 10, title: "TOEIC 2024 TEST 10" },
  ],
  "2023": [
    { id: 1, title: "TOEIC 2023 TEST 1" },
    { id: 2, title: "TOEIC 2023 TEST 2" },
    { id: 3, title: "TOEIC 2023 TEST 3" },
    { id: 4, title: "TOEIC 2023 TEST 4" },
    { id: 5, title: "TOEIC 2023 TEST 5" },
    { id: 6, title: "TOEIC 2023 TEST 6" },
    { id: 7, title: "TOEIC 2023 TEST 7" },
    { id: 8, title: "TOEIC 2023 TEST 8" },
    { id: 9, title: "TOEIC 2023 TEST 9" },
    { id: 10, title: "TOEIC 2023 TEST 10" },
  ],
};
