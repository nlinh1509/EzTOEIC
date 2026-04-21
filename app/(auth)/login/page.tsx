"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  // 1. Tạo các biến trạng thái (state) để lưu dữ liệu người dùng gõ
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Lưu câu thông báo lỗi
  const [isLoading, setIsLoading] = useState(false); // Trạng thái nút bấm (đang xoay)

  // 2. Hàm xử lý khi người dùng bấm nút "Đăng nhập"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của form
    setIsLoading(true);
    setError("");

    // Gọi hàm signIn của NextAuth, chọn kiểu 'credentials'
    const res = await signIn("credentials", {
      redirect: false, // Bắt buộc false để mình tự bắt lỗi ở dưới
      email,
      password,
    });

    if (res?.error) {
      setError(res.error); // Nếu có lỗi (sai pass, v.v.), hiện lỗi lên
      setIsLoading(false);
    } else {
      router.push("/"); // Nếu đúng, đẩy thẳng về trang chủ
      router.refresh(); // Làm mới lại navbar để hiện avatar
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto w-full max-w-md flex flex-col items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 group cursor-pointer mb-5"
        >
          <span className="text-3xl font-black text-slate-900 tracking-tight font-lexend">
            Ez<span className="text-emerald-600">TOEIC</span>
          </span>
        </Link>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
          Đăng nhập vào tài khoản
        </h2>
        <p className="mt-1.5 text-center text-sm text-zinc-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            Đăng ký ngay miễn phí
          </Link>
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-[480px]">
        <div className="bg-white px-6 py-10 shadow-sm rounded-2xl sm:rounded-[2rem] sm:px-12 sm:py-12 border border-zinc-200/60">
          {/* --- KHU VỰC HIỆN THÔNG BÁO LỖI (Màu đỏ) --- */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {/* 3. Gắn hàm handleSubmit vào sự kiện onSubmit của form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Input Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Địa chỉ Email
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  type="email"
                  required
                  value={email} // Gắn biến email vào đây
                  onChange={(e) => setEmail(e.target.value)} // Cập nhật biến khi gõ
                  placeholder="hello@example.com"
                  className="block w-full rounded-xl border-0 py-3 px-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Mật khẩu
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <div className="mt-1.5">
                <input
                  id="password"
                  type="password"
                  required
                  value={password} // Gắn biến password vào đây
                  onChange={(e) => setPassword(e.target.value)} // Cập nhật biến khi gõ
                  placeholder="••••••••"
                  className="block w-full rounded-xl border-0 py-3 px-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 transition-all"
                />
              </div>
            </div>

            {/* Nút Đăng Nhập */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading} // Nếu đang xử lý thì làm mờ nút đi, không cho bấm 2 lần
                className="flex w-full justify-center rounded-xl bg-slate-900 px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-slate-800 disabled:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-all cursor-pointer"
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-4 text-zinc-500">
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            {/* Nút Đăng nhập Google (Giữ nguyên) */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
