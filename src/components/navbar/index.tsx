import {
  Signal,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

import { UserSessionContext } from "~/root";
import { useIsMobile } from "../is-mobile";
import CondensedNavbar from "./condensed";
import ExpandedNavbar from "./expanded";

export interface isSearchOpenType {
  isSearchOpen: Signal<boolean>;
}

export const Navbar = component$(() => {
  const user = useContext(UserSessionContext);
  const isLoggedIn = useSignal(user.isLoggedIn);
  const isMobile = useIsMobile();
  const isSearchOpen = useSignal(false);
  const isMenuOpen = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => isMobile.value);
    console.log(isMobile.value);
  });

  return isMobile.value ? (
    <CondensedNavbar isSearchOpen={isSearchOpen} isMenuOpen={isMenuOpen} />
  ) : (
    <ExpandedNavbar isSearchOpen={isSearchOpen} />
  );
});
