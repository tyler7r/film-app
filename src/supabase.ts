import { createClient } from "@supabase/supabase-js";
import { type Database } from "./types/generated_types";

export const supabase = createClient<Database>(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.PUBLIC_SUPABASE_ANON_KEY!,
);
