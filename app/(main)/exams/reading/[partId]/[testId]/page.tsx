import Part5Layout from "@/components/layouts/Part5Layout";
import Part6Layout from "@/components/layouts/Part6Layout";
import Part7Layout from "@/components/layouts/Part7Layout";
import { mockPart7 } from "@/data/mockData";
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
}: {
  params: Promise<{ partId: string; testId: string }>;
}) {
  const resolvedParams = await params;
  const partId = resolvedParams.partId; 
  const testIdRaw = resolvedParams.testId; 

  const examId = parseInt(testIdRaw.replace(/\D/g, ""), 10);

  // ====================================================================
  // XỬ LÝ PART 5
  // ====================================================================
  if (partId === "part-5") {
    const { data: groupData, error } = await supabase
      .from("question_groups")
      .select(`
        id,
        questions (
          id, question_number, content, option_a, option_b, option_c, option_d, correct_answer, explanation
        )
      `)
      .eq("exam_id", examId)
      .eq("part", 5)
      .single();

    if (error || !groupData) {
       return <div>Lỗi: {error?.message || "Không tìm thấy đề"}</div>;
    }

    // Ép kiểu cho questions từ Supabase
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
  // XỬ LÝ PART 6 (DATA CHUẨN KHÔNG DÙNG ANY)
  // ====================================================================
  if (partId === "part-6") {
    const { data: groups, error } = await supabase
      .from("question_groups")
      .select(`
        id,
        passage_text,
        questions (
          id, question_number, content, option_a, option_b, option_c, option_d, correct_answer, explanation
        )
      `)
      .eq("exam_id", examId)
      .eq("part", 6)
      .order("id", { ascending: true });

    if (error || !groups) {
      return <div>Không tìm thấy dữ liệu Part 6</div>;
    }

    // Ép kiểu cho danh sách groups từ Supabase
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

  return <div>Đang phát triển...</div>;
}