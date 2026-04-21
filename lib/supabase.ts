import { createClient } from "@supabase/supabase-js";

// Lôi địa chỉ nhà ra
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// -------------------------------------------------------------
// 1. CỜ LÊ KHÁCH (Dùng cho Frontend - UI)
// -------------------------------------------------------------
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// -------------------------------------------------------------
// 2. CỜ LÊ VẠN NĂNG (CHỈ dùng cho Backend / NextAuth)
// -------------------------------------------------------------
// Dùng thêm || '' để lỡ chưa có key trong .env thì code cũng không sập
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);