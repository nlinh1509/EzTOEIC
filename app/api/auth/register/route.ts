import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin!" },
        { status: 400 },
      );
    }

    // 1. Kiểm tra xem email này đã có ai đăng ký chưa
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email này đã được sử dụng!" },
        { status: 400 },
      );
    }

    // 2. Băm mật khẩu (Mã hóa)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Lưu user mới vào Supabase
    const { error: insertError } = await supabaseAdmin.from("users").insert([
      {
        name,
        email,
        password: hashedPassword,
        // avatar_url có thể để trống hoặc cho một cái hình mặc định sau
      },
    ]);

    if (insertError) {
      console.error("Lỗi khi tạo user:", insertError);
      return NextResponse.json(
        { error: "Không thể tạo tài khoản lúc này." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Đăng ký thành công!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lỗi server:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra từ phía máy chủ." },
      { status: 500 },
    );
  }
}
