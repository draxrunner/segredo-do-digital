const SUPABASE_URL = "https://TESTE.supabase.co";
const SUPABASE_KEY = "TESTE";

const supabase = window.supabase?.createClient?.(
  SUPABASE_URL,
  SUPABASE_KEY
);
