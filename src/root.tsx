import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";
import { supabase } from "./utils/supabase";
import { UserSess } from "./utils/types";

export const UserSessionContext = createContextId<UserSess>("user-session");

export default component$(() => {
  const userSession = useStore<UserSess>({
    userId: "",
    isLoggedIn: false,
    email: "",
    teamId: null,
  });

  // Update user session context if sign in status changes
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
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
