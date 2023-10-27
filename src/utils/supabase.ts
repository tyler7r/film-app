import { createClient } from "@supabase/supabase-js";
import { type Database } from "./generated_types";

export const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
);

export const supabaseAdmin = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  import.meta.env.PUBLIC_SERVICE_ROLE_KEY!,
);
