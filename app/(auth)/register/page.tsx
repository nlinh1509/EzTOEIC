"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Gắn thông tin gửi xuống "Trạm kiểm duyệt" mình vừa làm
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Nếu API báo lỗi (trùng email, thiếu thông tin...)
        setError(data.error);
        setIsLoading(false);
      } else {
        // Nếu thành công, đẩy về trang đăng nhập
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau!");
      setIsLoading(false);
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
          Tạo tài khoản mới
        </h2>
        <p className="mt-1.5 text-center text-sm text-zinc-600">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-[480px]">
        <div className="bg-white px-6 py-10 shadow-sm rounded-2xl sm:rounded-[2rem] sm:px-12 sm:py-12 border border-zinc-200/60">
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Input Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Họ và tên
              </label>
              <div className="mt-1.5">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="block w-full rounded-xl border-0 py-3 px-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 transition-all"
                />
              </div>
            </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="block w-full rounded-xl border-0 py-3 px-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Mật khẩu
              </label>
              <div className="mt-1.5">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  className="block w-full rounded-xl border-0 py-3 px-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-xl bg-emerald-600 px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-emerald-500 disabled:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all cursor-pointer"
              >
                {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
