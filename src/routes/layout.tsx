import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
import mobile from "is-mobile";
import { IsMobileProvider } from "~/components/is-mobile";
import { Navbar } from "~/components/navbar";
import { type Database } from "~/types/type-generator";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useMobileBrowserUserAgentSniffing = routeLoader$(
  (requestEvent) => {
    return mobile({ ua: requestEvent.headers.get("User-Agent") ?? undefined });
  },
);

export const supabase = createClient<Database>(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.PUBLIC_SUPABASE_ANON_KEY!,
);

export default component$(() => {
  return (
    <IsMobileProvider>
      <Navbar />
      <Slot />
    </IsMobileProvider>
  );
});
