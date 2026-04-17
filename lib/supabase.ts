import { createClient } from "@supabase/supabase-js";

// Lôi chìa khóa từ file .env.local ra
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Chế tạo cái cờ lê vặn ốc
export const supabase = createClient(supabaseUrl, supabaseKey);