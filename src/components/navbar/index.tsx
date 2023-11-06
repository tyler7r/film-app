import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

import { useNavigate } from "@builder.io/qwik-city";
import { UserSessionContext } from "~/root";
import { supabase } from "~/utils/supabase";
import { useIsMobile } from "../is-mobile";
import CondensedNavbar from "./condensed";
import ExpandedNavbar from "./expanded";

export const Navbar = component$(() => {
  const nav = useNavigate();
  const user = useContext(UserSessionContext);
  const isLoggedIn = useSignal(user.isLoggedIn);
  const isMobile = useIsMobile();
  const isSearchOpen = useSignal(false);
  const isMenuOpen = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => {
      isMobile.value;
      user.isLoggedIn;
    });
    isLoggedIn.value = user.isLoggedIn;
  });

  const handleLogout = $(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return;
    } else {
      await nav("/");
    }
  });

  return isMobile.value ? (
    <CondensedNavbar
      isSearchOpen={isSearchOpen}
      isMenuOpen={isMenuOpen}
      isLoggedIn={isLoggedIn}
      logout={handleLogout}
    />
  ) : (
    <ExpandedNavbar
      isSearchOpen={isSearchOpen}
      isLoggedIn={isLoggedIn}
      logout={handleLogout}
    />
  );
});
