import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  useLocation,
  type RequestHandler,
} from "@builder.io/qwik-city";
import mobile from "is-mobile";
import { IsMobileProvider } from "~/components/is-mobile";
import { Navbar } from "~/components/navbar";
import { UserSessionContext } from "~/root";
import { noNavbarLocations } from "~/utils/helpers";
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

export const NavbarCheckContext =
  createContextId<Signal<boolean>>("is-navbar-visible");

export default component$(() => {
  const isNavbarPresent = useSignal(false);
  const loc = useLocation();
  const user = useContext(UserSessionContext);

  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user?.id) {
      user.isLoggedIn = true;
      user.email = data.user.email;
      user.teamId = data.user.user_metadata.team_id;
      user.userId = data.user.id;
    } else {
      user.userId = "";
      user.isLoggedIn = false;
      user.email = "";
      user.teamId = null;
    }
  });

  useTask$(({ track }) => {
    track(() => loc.url.pathname);
    if (noNavbarLocations.includes(loc.url.pathname)) {
      isNavbarPresent.value = false;
    } else {
      isNavbarPresent.value = true;
    }
  });

  useContextProvider(NavbarCheckContext, isNavbarPresent);
  return (
    <IsMobileProvider>
      <Navbar />
      <Slot />
    </IsMobileProvider>
  );
});
