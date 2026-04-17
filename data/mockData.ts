// Định nghĩa cấu trúc dữ liệu (Interfaces) chuẩn mực
export interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface QuestionGroup {
  id: string;
  partNumber: number;
  audioUrl?: string;
  imageUrl?: string;
  passageText?: string;
  transcript?: string;
  questions: Question[];
}

// Định nghĩa cấu trúc cho 1 bài Full Test (200 câu)
export interface FullTest {
  id: string;
  title: string;
  duration: number; // Thời gian thi (giây) - 7200s = 120 phút
  parts: {
    1: QuestionGroup[];
    2: QuestionGroup[];
    3: QuestionGroup[];
    4: QuestionGroup[];
    5: QuestionGroup[];
    6: QuestionGroup[];
    7: QuestionGroup[];
  };
}



// ==========================================
// 📦 MOCK DATA CHO TỪNG PART
// ==========================================

// 🎧 PART 1: Hình ảnh + Audio + 1 Câu hỏi (3 câu test)
export const mockPart1: QuestionGroup[] = [
  {
    id: "p1-group-1",
    partNumber: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    transcript:
      "(A) They are looking at a document.\n(B) The man is writing on a notepad.\n(C) They are arranging chairs.\n(D) The woman is holding a cup.",
    questions: [
      {
        id: "q-1",
        questionNumber: 1,
        questionText:
          "Listen to the audio and choose the best description for the picture.",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
          { label: "D", text: "" },
        ],
        correctAnswer: "A",
        explanation:
          "Hành động chính là hai người đang tập trung quan sát một tờ giấy trên bàn. Do đó chọn A (They are looking at a document).",
      },
    ],
  },
  {
    id: "p1-group-2",
    partNumber: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop", // Hình công trường
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    transcript:
      "(A) The men are wearing safety helmets.\n(B) They are painting the wall.\n(C) The heavy machinery is moving.\n(D) They are taking a break.",
    questions: [
      {
        id: "q-2",
        questionNumber: 2,
        questionText:
          "Listen to the audio and choose the best description for the picture.",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
          { label: "D", text: "" },
        ],
        correctAnswer: "A",
        explanation:
          "Trong hình có công nhân đang đội mũ bảo hộ. B sai vì không có ai sơn tường, C sai vì máy móc đang đứng im.",
      },
    ],
  },
  {
    id: "p1-group-3",
    partNumber: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", // Hình thanh toán ở quầy
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    transcript:
      "(A) The customer is handing over cash.\n(B) The cashier is bagging items.\n(C) A woman is handing a credit card to the cashier.\n(D) They are sitting at a table.",
    questions: [
      {
        id: "q-3",
        questionNumber: 3,
        questionText:
          "Listen to the audio and choose the best description for the picture.",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
          { label: "D", text: "" },
        ],
        correctAnswer: "C",
        explanation:
          "Người phụ nữ đang đưa thẻ tín dụng cho nhân viên thu ngân. Chọn C.",
      },
    ],
  },
];

// 🎧 PART 2: Hỏi & Đáp (3 câu test, chỉ có A, B, C)
export const mockPart2: QuestionGroup[] = [
  {
    id: "p2-group-1",
    partNumber: 2,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    transcript:
      "Q: Why is the office so cold today?\n(A) I'll have it delivered.\n(B) The air conditioning is being repaired.\n(C) No, I didn't see him.",
    questions: [
      {
        id: "q-12",
        questionNumber: 12,
        questionText:
          "Listen carefully to the question and the three responses.",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
        ],
        correctAnswer: "B",
        explanation:
          "Câu hỏi bắt đầu bằng 'Why' tìm kiếm lý do. Đáp án B giải thích lý do (do máy lạnh đang sửa).",
      },
    ],
  },
  {
    id: "p2-group-2",
    partNumber: 2,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    transcript:
      "Q: When does the train to Tokyo leave?\n(A) From platform 4.\n(B) At 3:15 PM.\n(C) It's a very fast train.",
    questions: [
      {
        id: "q-13",
        questionNumber: 13,
        questionText:
          "Listen carefully to the question and the three responses.",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
        ],
        correctAnswer: "B",
        explanation:
          "Hỏi về thời gian 'When', đáp án B chỉ thời gian (3:15 PM) là chính xác nhất.",
      },
    ],
  },
  {
    id: "p2-group-3",
    partNumber: 2,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    transcript:
      "Q: You've sent the invoices out, haven't you?\n(A) Yes, I mailed them this morning.\n(B) The voice is too loud.\n(C) About $50.",
    questions: [
      {
        id: "q-14",
        questionNumber: 14,
        questionText:
          "Listen carefully to the question and the three responses.",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
        ],
        correctAnswer: "A",
        explanation:
          "Câu hỏi đuôi xác nhận việc gửi hóa đơn. Đáp án A xác nhận đã gửi vào sáng nay.",
      },
    ],
  },
];

// 🎧 PART 3/4: Đoạn hội thoại/Bài nói (1 Group có 1 Audio + 3 Câu hỏi)
export const mockPart3: QuestionGroup[] = [
  {
    id: "p3-group-1",
    partNumber: 3,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    transcript:
      "Man: Let's move the meeting to Friday morning instead. I have a scheduling conflict on Thursday.\nWoman: That works for me. I'll email the rest of the team to let them know about the change.\nMan: Thanks. Could you also attach the revised budget report?",
    questions: [
      {
        id: "q-45",
        questionNumber: 45,
        questionText: "What does the man suggest doing?",
        options: [
          { label: "A", text: "Ordering replacement parts" },
          { label: "B", text: "Postponing a staff meeting" },
          { label: "C", text: "Hiring a consultant" },
          { label: "D", text: "Updating a website" },
        ],
        correctAnswer: "B",
        explanation:
          "Người đàn ông đề nghị 'move the meeting' (dời cuộc họp). Điều này tương ứng với việc 'Postponing'.",
      },
      {
        id: "q-46",
        questionNumber: 46,
        questionText: "Why does the man make the suggestion?",
        options: [
          { label: "A", text: "He is feeling sick" },
          { label: "B", text: "He has a scheduling conflict" },
          { label: "C", text: "He needs to travel" },
          { label: "D", text: "He missed a deadline" },
        ],
        correctAnswer: "B",
        explanation:
          "Ông ấy nói rõ lý do là 'I have a scheduling conflict on Thursday'.",
      },
      {
        id: "q-47",
        questionNumber: 47,
        questionText: "What will the woman probably do next?",
        options: [
          { label: "A", text: "Call a client" },
          { label: "B", text: "Send an email" },
          { label: "C", text: "Print a report" },
          { label: "D", text: "Book a flight" },
        ],
        correctAnswer: "B",
        explanation:
          "Người phụ nữ nói 'I'll email the rest of the team', do đó hành động tiếp theo là gửi email.",
      },
    ],
  },
];

// 📖 PART 5: Điền từ vào câu (4 câu test)
export const mockPart5: QuestionGroup[] = [
  {
    id: "p5-group-1",
    partNumber: 5,
    questions: [
      {
        id: "q-101",
        questionNumber: 101,
        questionText:
          "The marketing department is ________ seeking a candidate with extensive experience in digital analytics.",
        options: [
          { label: "A", text: "actively" },
          { label: "B", text: "activity" },
          { label: "C", text: "active" },
          { label: "D", text: "activate" },
        ],
        correctAnswer: "A",
        explanation:
          "Vị trí trống nằm giữa to-be 'is' và V-ing 'seeking', cần một Trạng từ (adverb) để bổ nghĩa cho động từ chính.",
      },
      {
        id: "q-102",
        questionNumber: 102,
        questionText:
          "All employees must submit their travel expense reports ________ the 15th of each month.",
        options: [
          { label: "A", text: "by" },
          { label: "B", text: "on" },
          { label: "C", text: "in" },
          { label: "D", text: "at" },
        ],
        correctAnswer: "A",
        explanation:
          "Giới từ 'by' mang nghĩa là 'trước lúc, chậm nhất là' - phù hợp với ngữ cảnh nộp báo cáo trước ngày 15.",
      },
      {
        id: "q-103",
        questionNumber: 103,
        questionText:
          "The new software update will run much more ________ than the previous version.",
        options: [
          { label: "A", text: "smooth" },
          { label: "B", text: "smoother" },
          { label: "C", text: "smoothly" },
          { label: "D", text: "smoothness" },
        ],
        correctAnswer: "C",
        explanation:
          "Bổ nghĩa cho động từ thường 'run' cần một trạng từ (smoothly).",
      },
      {
        id: "q-104",
        questionNumber: 104,
        questionText:
          "Ms. Jenkins was promoted to branch manager ________ her outstanding sales performance.",
        options: [
          { label: "A", text: "because" },
          { label: "B", text: "due to" },
          { label: "C", text: "although" },
          { label: "D", text: "however" },
        ],
        correctAnswer: "B",
        explanation:
          "Sau chỗ trống là một cụm danh từ (her outstanding sales performance), nên phải dùng giới từ 'due to'.",
      },
    ],
  },
];

// 📖 PART 7: Đọc hiểu văn bản (1 Đoạn văn + 3 Câu hỏi)
export const mockPart7: QuestionGroup[] = [
  {
    id: "p7-group-1",
    partNumber: 7,
    passageText: `
      <h3>Internal Memorandum</h3>
      <p><strong>To:</strong> All Staff</p>
      <p><strong>From:</strong> Maintenance Department</p>
      <p><strong>Subject:</strong> Air Conditioning Maintenance</p>
      <br/>
      <p>Please be advised that the central air conditioning system will undergo scheduled maintenance this coming Friday, starting at 6:00 PM. We expect the work to be completed by Sunday evening.</p>
      <p>During this period, the building's temperature may rise higher than usual. We recommend that staff who plan to work over the weekend bring portable fans if they have them. We apologize for any inconvenience this may cause and appreciate your cooperation.</p>
    `,
    questions: [
      {
        id: "q-155",
        questionNumber: 155,
        questionText: "What is the main purpose of the email?",
        options: [
          { label: "A", text: "To announce a change in staff assignments" },
          { label: "B", text: "To provide information about building repairs" },
          { label: "C", text: "To request suggestions for a new menu" },
          { label: "D", text: "To introduce a new catering company" },
        ],
        correctAnswer: "B",
        explanation:
          "Email thông báo về việc bảo trì hệ thống điều hòa (building repairs).",
      },
      {
        id: "q-156",
        questionNumber: 156,
        questionText: "When will the maintenance work begin?",
        options: [
          { label: "A", text: "On Thursday morning" },
          { label: "B", text: "On Friday evening" },
          { label: "C", text: "On Saturday morning" },
          { label: "D", text: "On Sunday evening" },
        ],
        correctAnswer: "B",
        explanation:
          "Đoạn văn có ghi rõ thời gian bắt đầu: 'starting at 6:00 PM' vào 'this coming Friday' (Tối thứ Sáu).",
      },
      {
        id: "q-157",
        questionNumber: 157,
        questionText: "What are weekend workers advised to do?",
        options: [
          { label: "A", text: "Work from home" },
          { label: "B", text: "Wear casual clothes" },
          { label: "C", text: "Bring a fan" },
          { label: "D", text: "Open the windows" },
        ],
        correctAnswer: "C",
        explanation:
          "Đoạn văn khuyên nhân viên mang theo quạt cầm tay: 'bring portable fans if they have them'.",
      },
    ],
  },
  {
    id: "p7-group-2",
    partNumber: 7,
    passageText: `
      <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-sans space-y-4">
        <h3 class="text-center text-slate-500 font-semibold mb-4 border-b border-slate-200 pb-2">Text Message Conversation</h3>
        
        <div>
          <p><strong class="text-slate-800">Yi-Seul Kwak</strong> <span class="text-xs text-slate-500 ml-2">[1:16 P.M.]</span></p>
          <p class="mt-1 bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 text-slate-700 inline-block shadow-sm">Stacy, are you back from lunch yet?</p>
        </div>

        <div class="text-right">
          <p><span class="text-xs text-slate-500 mr-2">[1:17 P.M.]</span> <strong class="text-emerald-700">Stacy Ulrich</strong></p>
          <p class="mt-1 bg-emerald-500 text-white p-3 rounded-xl rounded-tr-none inline-block shadow-sm">Yes, I'm at my desk. What's up?</p>
        </div>

        <div>
          <p><strong class="text-slate-800">Yi-Seul Kwak</strong> <span class="text-xs text-slate-500 ml-2">[1:18 P.M.]</span></p>
          <p class="mt-1 bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 text-slate-700 inline-block shadow-sm">I'm at the store picking up supplies for the office, and I need a favor. You know those yellow notepads that the lawyers like to use?<br/>I just realized I'm not sure how many of them we have left.</p>
        </div>

        <div class="text-right">
          <p><span class="text-xs text-slate-500 mr-2">[1:19 P.M.]</span> <strong class="text-emerald-700">Stacy Ulrich</strong></p>
          <p class="mt-1 bg-emerald-500 text-white p-3 rounded-xl rounded-tr-none inline-block shadow-sm">OK, I'll find out. Where should I look?</p>
        </div>

        <div>
          <p><strong class="text-slate-800">Yi-Seul Kwak</strong> <span class="text-xs text-slate-500 ml-2">[1:20 P.M.]</span></p>
          <p class="mt-1 bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 text-slate-700 inline-block shadow-sm">They're in a box in the supply room.</p>
        </div>

        <div class="text-right">
          <p><span class="text-xs text-slate-500 mr-2">[1:22 P.M.]</span> <strong class="text-emerald-700">Stacy Ulrich</strong></p>
          <p class="mt-1 bg-emerald-500 text-white p-3 rounded-xl rounded-tr-none inline-block shadow-sm">The supply room is full of boxes.</p>
        </div>

        <div>
          <p><strong class="text-slate-800">Yi-Seul Kwak</strong> <span class="text-xs text-slate-500 ml-2">[1:23 P.M.]</span></p>
          <p class="mt-1 bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 text-slate-700 inline-block shadow-sm">Oh, right. It's on a bottom shelf near the door, and "Bynum, Inc." is printed on the sides.</p>
        </div>

        <div class="text-right">
          <p><span class="text-xs text-slate-500 mr-2">[1:24 P.M.]</span> <strong class="text-emerald-700">Stacy Ulrich</strong></p>
          <p class="mt-1 bg-emerald-500 text-white p-3 rounded-xl rounded-tr-none inline-block shadow-sm">I found it. There's only one notepad in here.</p>
        </div>

        <div>
          <p><strong class="text-slate-800">Yi-Seul Kwak</strong> <span class="text-xs text-slate-500 ml-2">[1:25 P.M.]</span></p>
          <p class="mt-1 bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 text-slate-700 inline-block shadow-sm">That's definitely not enough! I'm glad I checked.<br/>Thank you, Stacy!</p>
        </div>
      </div>
    `,
    questions: [
      {
        id: "q-153",
        questionNumber: 153,
        questionText: "What problem does Ms. Kwak have?",
        options: [
          { label: "A", text: "She cannot locate the office supply room." },
          { label: "B", text: "She forgot to bring her wallet to the store." },
          {
            label: "C",
            text: "She does not know the current inventory level.",
          },
          { label: "D", text: "She lost an important document from a lawyer." },
        ],
        correctAnswer: "C",
        explanation:
          "Vào lúc [1:18 P.M.], Ms. Kwak nói: 'I just realized I'm not sure how many of them we have left' (Tôi vừa nhận ra tôi không chắc chúng ta còn lại bao nhiêu cuốn). Điều này có nghĩa là cô ấy không rõ số lượng hàng tồn kho (inventory level).",
      },
      {
        id: "q-154",
        questionNumber: 154,
        questionText:
          "At 1:22 P.M., what does Ms. Ulrich imply when she writes, 'The supply room is full of boxes'?",
        options: [
          { label: "A", text: "She does not have time to help Ms. Kwak." },
          {
            label: "B",
            text: "She needs more specific directions to find the item.",
          },
          {
            label: "C",
            text: "The supply room needs to be cleaned immediately.",
          },
          {
            label: "D",
            text: "A large delivery has just arrived at the office.",
          },
        ],
        correctAnswer: "B",
        explanation:
          "Khi Ms. Ulrich nói 'Phòng chứa đồ đầy những hộp', ý cô là cô không thể tìm được nếu chỉ dựa vào thông tin 'trong một cái hộp' chung chung. Cô ấy cần Ms. Kwak miêu tả cụ thể cái hộp đó trông như thế nào hoặc nằm ở đâu (needs more specific directions).",
      },
    ],
  },
];

// 📖 PART 7: Đọc hiểu văn bản (Đoạn Chat)

// 📖 PART 6: Điền từ vào đoạn văn (1 Đoạn văn + 4 Câu hỏi)
export const mockPart6: QuestionGroup[] = [
  {
    id: "p6-group-1",
    partNumber: 6,
    passageText: `
      <div class="space-y-4 text-slate-700 leading-relaxed">
        <div class="border-b border-slate-200 pb-4 mb-4">
          <p><strong>To:</strong> All Employees</p>
          <p><strong>From:</strong> HR Department</p>
          <p><strong>Date:</strong> October 12</p>
          <p><strong>Subject:</strong> Annual Leave Policy Update</p>
        </div>
        <p>This is a reminder that the new annual leave policy will take effect on January 1st. Under the new policy, employees must submit their vacation requests at least two weeks in <strong>[ 131 ] </strong>________.</p>
        <p>Furthermore, any unused leave days from this year cannot be rolled over to the next year. Therefore, we strongly encourage everyone to check their leave balances and schedule time off <strong>[ 132 ] </strong>________.</p>
        <p><strong>[ 133 ] </strong>________. The updated employee handbook containing all the details is attached to this email.</p>
        <p>Thank you for your <strong>[ 134 ] </strong>________ in this matter.</p>
      </div>
    `,
    questions: [
      {
        id: "q-131",
        questionNumber: 131,
        questionText: "",
        options: [
          { label: "A", text: "advance" },
          { label: "B", text: "front" },
          { label: "C", text: "before" },
          { label: "D", text: "ahead" },
        ],
        correctAnswer: "A",
        explanation:
          "Cụm từ cố định 'in advance' có nghĩa là 'trước' (in advance = beforehand).",
      },
      {
        id: "q-132",
        questionNumber: 132,
        questionText: "",
        options: [
          { label: "A", text: "accordingly" },
          { label: "B", text: "rarely" },
          { label: "C", text: "heavily" },
          { label: "D", text: "mostly" },
        ],
        correctAnswer: "A",
        explanation:
          "'Accordingly' (một cách phù hợp) bổ nghĩa cho hành động lên lịch nghỉ phép dựa trên số dư hiện tại.",
      },
      {
        id: "q-133",
        questionNumber: 133,
        questionText: "",
        options: [
          { label: "A", text: "We are hiring new staff next month." },
          { label: "B", text: "Please review the new guidelines carefully." },
          { label: "C", text: "The cafeteria will be closed on Fridays." },
          { label: "D", text: "Our quarterly profits have increased." },
        ],
        correctAnswer: "B",
        explanation:
          "Câu trước nói về chính sách mới, câu sau nhắc đến sổ tay nhân viên được đính kèm. Câu B (Vui lòng xem kỹ các hướng dẫn mới) là câu kết nối logic nhất.",
      },
      {
        id: "q-134",
        questionNumber: 134,
        questionText: "",
        options: [
          { label: "A", text: "cooperate" },
          { label: "B", text: "cooperative" },
          { label: "C", text: "cooperation" },
          { label: "D", text: "cooperated" },
        ],
        correctAnswer: "C",
        explanation:
          "Sau tính từ sở hữu 'your' cần một danh từ. 'cooperation' (sự hợp tác) là danh từ duy nhất.",
      },
    ],
  },
];

// Đóng gói toàn bộ các Part lẻ tẻ ở trên thành 1 bài Test Hoàn Chỉnh
export const mockFullTest1: FullTest = {
  id: "test-1",
  title: "ETS 2026 - Test 1",
  duration: 7200, // 120 phút
  parts: {
    1: mockPart1,
    2: mockPart2,
    3: mockPart3,
    4: mockPart3, // Tạm dùng data Part 3 đắp vào Part 4 cho có dữ liệu
    5: mockPart5,
    6: mockPart6,
    7: mockPart7,
  },
};