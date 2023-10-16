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

export type UserSess = {
  userId: string;
  isLoggedIn: boolean;
  email: string;
};

export const UserSessionContext = createContextId<UserSess>("user-session");

export default component$(() => {
  const userSession: UserSess = useStore({
    userId: "",
    isLoggedIn: false,
    email: "",
  });

  useVisibleTask$(async () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (event === "SIGNED_IN") {
          // Send cookies to server

          // Set Auth State Context
          userSession.userId = session?.user?.id;
          userSession.email = session?.user?.email;
          userSession.isLoggedIn = true;
        } else if (event === "SIGNED_OUT") {
          // Sign out user

          // Set Auth State Context
          userSession.userId = "";
          userSession.isLoggedIn = false;
          userSession.email = "";
        }
      },
    );

    // Cleanup event listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  // Pass state to children via context
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
