import { $, component$, useContext, useSignal } from "@builder.io/qwik";

import { useNavigate } from "@builder.io/qwik-city";
import { UserSessionContext } from "~/root";
import { NavbarCheckContext } from "~/routes/layout";
import { supabase } from "~/utils/supabase";
import { useIsMobile } from "../is-mobile";
import { SiteLogo } from "../site-logo";
import CondensedNavbar from "./condensed";
import ExpandedNavbar from "./expanded";
import styles from "./navbar.module.css";

export const Navbar = component$(() => {
  const nav = useNavigate();
  const user = useContext(UserSessionContext);
  const isNavbarPresent = useContext(NavbarCheckContext);
  const isMobile = useIsMobile();
  const isSearchOpen = useSignal(false);
  const isMenuOpen = useSignal(false);

  const handleLogout = $(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return;
    } else {
      await nav("/");
    }
  });

  return isNavbarPresent.value ? (
    isMobile.value ? (
      <CondensedNavbar
        isSearchOpen={isSearchOpen}
        isMenuOpen={isMenuOpen}
        isLoggedIn={user.isLoggedIn}
        logout={handleLogout}
      />
    ) : (
      <ExpandedNavbar
        isSearchOpen={isSearchOpen}
        isLoggedIn={user.isLoggedIn}
        logout={handleLogout}
      />
    )
  ) : (
    <a href="/" class={styles["site-logo"]}>
      <SiteLogo />
    </a>
  );
});
