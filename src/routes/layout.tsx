import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import mobile from "is-mobile";
import { IsMobileProvider } from "~/components/is-mobile";
import { Navbar } from "~/components/navbar";
import { supabase } from "~/utils/supabase";

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

export type UserSess = {
  userId: string;
  isLoggedIn: boolean;
  email: string | undefined;
  teamId: number | null;
};

export const UserSessionContext = createContextId<UserSess>("user-session");

export default component$(() => {
  const userSession = useStore<UserSess>({
    userId: "",
    isLoggedIn: false,
    email: "",
    teamId: null,
  });

  useVisibleTask$(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: string, session) => {
        if (event === "SIGNED_IN" && session) {
          userSession.userId = session.user.id;
          userSession.email = session.user.email;
          userSession.teamId = session.user.user_metadata.team_id;
          userSession.isLoggedIn = true;
        } else {
          userSession.userId = "";
          userSession.email = "";
          userSession.teamId = null;
          userSession.isLoggedIn = false;
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  useContextProvider(UserSessionContext, userSession);
  return (
    <IsMobileProvider>
      <Navbar />
      <Slot />
    </IsMobileProvider>
  );
});
