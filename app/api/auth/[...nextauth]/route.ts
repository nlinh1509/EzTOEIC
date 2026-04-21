import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // BƯỚC 1: Import công cụ đăng nhập bằng mật khẩu
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs"; // BƯỚC 2: Import công cụ kiểm tra mật khẩu đã băm

const handler = NextAuth({
  providers: [
    // --- 1. ĐĂNG NHẬP BẰNG GOOGLE (Giữ nguyên của bà) ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // --- 2. ĐĂNG NHẬP BẰNG EMAIL/MẬT KHẨU (Mới thêm) ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Hàm authorize sẽ chạy khi người dùng bấm nút Đăng Nhập
      async authorize(credentials) {
        // Kiểm tra xem người dùng có bỏ trống ô nào không
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ email và mật khẩu!");
        }

        // Lấy thông tin user từ Supabase dựa vào email
        const { data: user, error } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .maybeSingle();

        if (error) {
          throw new Error("Lỗi hệ thống khi kiểm tra tài khoản.");
        }

        // Nếu email không có trong DB, HOẶC có nhưng không có password (nghĩa là user này tạo bằng Google)
        if (!user || !user.password) {
          throw new Error("Tài khoản không tồn tại hoặc bạn đang dùng Google để đăng nhập!");
        }

        // Đọ sức mật khẩu: So sánh pass người dùng nhập với cái chuỗi băm trong DB
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Mật khẩu không chính xác!");
        }

        // Nếu vượt qua hết ải trên -> Đăng nhập thành công! Trả về thông tin cho hệ thống
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Logic xử lý khi đăng nhập Google (Giữ nguyên của bà)
      if (account?.provider === "google") {
        try {
          const { data: existingUser, error: selectError } = await supabaseAdmin
            .from("users")
            .select("email")
            .eq("email", user.email)
            .maybeSingle();

          if (selectError) {
            console.error("Lỗi tìm user:", selectError);
            return false;
          }

          if (!existingUser) {
            const { error: insertError } = await supabaseAdmin
              .from("users")
              .insert([
                {
                  email: user.email,
                  name: user.name,
                  avatar_url: user.image,
                },
              ]);

            if (insertError) {
              console.error("Lỗi tạo user mới:", insertError);
              return false;
            }
          }
          return true; // Cho phép đăng nhập Google thành công
        } catch (error) {
          console.error("Lỗi hệ thống:", error);
          return false;
        }
      }
      
      // Nếu đăng nhập bằng Email/Pass, hàm authorize ở trên đã kiểm tra hết rồi, xuống đây chỉ việc cho qua thôi
      return true; 
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };