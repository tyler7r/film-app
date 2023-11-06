import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

import { UserSessionContext } from "~/root";
import { useIsMobile } from "../is-mobile";
import CondensedNavbar from "./condensed";
import ExpandedNavbar from "./expanded";

export const Navbar = component$(() => {
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

  return isMobile.value ? (
    <CondensedNavbar
      isSearchOpen={isSearchOpen}
      isMenuOpen={isMenuOpen}
      isLoggedIn={isLoggedIn}
    />
  ) : (
    <ExpandedNavbar isSearchOpen={isSearchOpen} isLoggedIn={isLoggedIn} />
  );
});
