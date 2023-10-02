import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import mobile from "is-mobile";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { IsMobileProvider } from "~/components/is-mobile";
import { Navbar } from "~/components/navbar";
import { Database } from "~/types";

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

export const useDBTest = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient<Database>(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv,
  );
  const { data } = await supabaseClient.from("teams").select("*").limit(1);
  return { data };
});

export default component$(() => {
  return (
    <IsMobileProvider>
      <Navbar />
      <Slot />
    </IsMobileProvider>
  );
});
