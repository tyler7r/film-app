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

export const channel = supabase
  .channel("team_db_changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "teams",
    },
    (payload) => {
      console.log(payload.new);
    },
  )
  .subscribe();
