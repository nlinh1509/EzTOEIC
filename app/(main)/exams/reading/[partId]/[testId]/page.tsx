import Part5Layout from "@/components/layouts/Part5Layout";
import Part6Layout from "@/components/layouts/Part6Layout";
import Part7Layout from "@/components/layouts/Part7Layout";
import { supabase } from "@/lib/supabase";

// --- ĐỊNH NGHĨA CÁC KIỂU DỮ LIỆU TỪ DATABASE (SUPABASE) ---
interface DBQuestion {
  id: number;
  question_number: number;
  content: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string | null;
}

interface DBQuestionGroup {
  id: number;
  passage_text: string;
  questions: DBQuestion[];
}

export default async function ReadingTestPage({
  params,
  searchParams,
}: {
  params: Promise<{ partId: string; testId: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const partId = resolvedParams.partId;
  const testIdRaw = resolvedParams.testId;

  // Lấy ra số 1, 2, 3 từ chữ "test-1"
  const testNum = parseInt(testIdRaw.replace(/\D/g, ""), 10);

  // Lấy năm từ URL (VD: ?year=2025), nếu không có thì mặc định 2026
  const examYear = parseInt(resolvedSearchParams.year || "2026", 10);

  // TÌM ID THẬT CỦA ĐỀ THI (Dựa vào Năm + Tên Test)
  const { data: currentExam, error: examError } = await supabase
    .from("exams")
    .select("id")
    .eq("exam_year", examYear)
    .ilike("title", `%Test ${testNum}%`)
    .single();

  // Nếu tìm không ra đề thi của năm đó
  if (examError || !currentExam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
          search_off
        </span>
        <h2 className="text-2xl font-bold text-slate-700">
          Không tìm thấy đề thi!
        </h2>
        <p className="text-slate-500 mt-2">
          Chưa có Test {testNum} cho năm {examYear}.
        </p>
      </div>
    );
  }

  // Lấy được ID thật rồi (VD nó là số 1, 2 hoặc 3)
  const realExamId = currentExam.id;

  // ====================================================================
  // XỬ LÝ PART 5
  // ====================================================================
  if (partId === "part-5") {
    const { data: groupData, error } = await supabase
      .from("question_groups")
      .select(
        `
        id,
        questions (
          id, question_number, content, option_a, option_b, option_c, option_d, correct_answer, explanation
        )
      `,
      )
      .eq("exam_id", realExamId)
      .eq("part", 5)
      .single();

    // 🔥 FIX Ở ĐÂY: Thêm groupData.questions.length === 0 để chặn đứng mảng rỗng
    if (error || !groupData || groupData.questions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
            search_off
          </span>
          <h2 className="text-2xl font-bold text-slate-700">
            Chưa có dữ liệu Part 5
          </h2>
          <p className="text-slate-500 mt-2">
            Đề thi này chưa được nạp câu hỏi Part 5 vào Database.
          </p>
        </div>
      );
    }

    // ... phần dưới giữ nguyên

    const questions = groupData.questions as unknown as DBQuestion[];

    const realData = {
      id: groupData.id,
      questions: questions
        .sort((a, b) => a.question_number - b.question_number)
        .map((q) => ({
          id: q.id,
          questionNumber: q.question_number,
          questionText: q.content,
          options: [
            { label: "A", text: q.option_a.replace(/^\([A-D]\)\s*/, "") },
            { label: "B", text: q.option_b.replace(/^\([A-D]\)\s*/, "") },
            { label: "C", text: q.option_c.replace(/^\([A-D]\)\s*/, "") },
            { label: "D", text: q.option_d.replace(/^\([A-D]\)\s*/, "") },
          ],
          correctAnswer: q.correct_answer,
          explanation: q.explanation || "Chưa có giải thích.",
        })),
    };

    return <Part5Layout data={realData} />;
  }

  // ====================================================================
  // XỬ LÝ PART 6
  // ====================================================================
  if (partId === "part-6") {
    const { data: groups, error } = await supabase
      .from("question_groups")
      .select(
        `
        id,
        passage_text,
        questions (
          id, question_number, content, option_a, option_b, option_c, option_d, correct_answer, explanation
        )
      `,
      )
      .eq("exam_id", realExamId) // Đã sửa examId thành realExamId
      .eq("part", 6)
      .order("id", { ascending: true });

    if (error || !groups || groups.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-slate-700">
            Chưa có dữ liệu Part 6
          </h2>
        </div>
      );
    }

    const typedGroups = groups as unknown as DBQuestionGroup[];

    const realPart6Data = typedGroups.map((group) => ({
      id: group.id,
      passageText: group.passage_text,
      questions: group.questions
        .sort((a, b) => a.question_number - b.question_number)
        .map((q) => ({
          id: q.id,
          questionNumber: q.question_number,
          options: [
            { label: "A", text: q.option_a.replace(/^\([A-D]\)\s*/, "") },
            { label: "B", text: q.option_b.replace(/^\([A-D]\)\s*/, "") },
            { label: "C", text: q.option_c.replace(/^\([A-D]\)\s*/, "") },
            { label: "D", text: q.option_d.replace(/^\([A-D]\)\s*/, "") },
          ],
          correctAnswer: q.correct_answer,
          explanation: q.explanation || "Chưa có giải thích.",
        })),
    }));

    return <Part6Layout data={realPart6Data} />;
  }
  // ====================================================================
  // XỬ LÝ PART 7
  // ====================================================================
  if (partId === "part-7") {
    const { data: groups, error } = await supabase
      .from("question_groups")
      .select(
        `
        id,
        passage_text,
        questions (
          id, question_number, content, option_a, option_b, option_c, option_d, correct_answer, explanation
        )
      `,
      )
      .eq("exam_id", realExamId)
      .eq("part", 7)
      .order("id", { ascending: true });

    if (error || !groups || groups.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
            search_off
          </span>
          <h2 className="text-2xl font-bold text-slate-700">
            Chưa có dữ liệu Part 7
          </h2>
          <p className="text-slate-500 mt-2">
            Đề thi này chưa được nạp câu hỏi Part 7 vào Database.
          </p>
        </div>
      );
    }


    const typedGroups = groups as unknown as DBQuestionGroup[];

    const realPart7Data = typedGroups.map((group) => ({
      id: group.id,
      passageText: group.passage_text,
      questions: group.questions
        .sort((a, b) => a.question_number - b.question_number)
        .map((q) => ({
          id: q.id,
          questionNumber: q.question_number,
          questionText: q.content, // 🔥 SẾP QUÊN DÒNG NÀY NÈ! THÊM VÀO NHA!
          options: [
            { label: "A", text: q.option_a.replace(/^\([A-D]\)\s*/, "") },
            { label: "B", text: q.option_b.replace(/^\([A-D]\)\s*/, "") },
            { label: "C", text: q.option_c.replace(/^\([A-D]\)\s*/, "") },
            { label: "D", text: q.option_d.replace(/^\([A-D]\)\s*/, "") },
          ],
          correctAnswer: q.correct_answer,
          explanation: q.explanation || "Chưa có giải thích.",
        })),
    }));

    return <Part7Layout data={realPart7Data} />;
  }

  return <div>Đang phát triển...</div>;
}
