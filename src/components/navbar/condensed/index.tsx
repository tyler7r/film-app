import { component$, type QRL, type Signal } from "@builder.io/qwik";
import { BsList, BsSearch } from "@qwikest/icons/bootstrap";
import NavMenu from "~/components/nav-menu";
import NavSearch from "~/components/nav-search";
import { SiteLogo } from "~/components/site-logo";
import styles from "../navbar.module.css";

interface CondensedNavType {
  isSearchOpen: Signal<boolean>;
  isMenuOpen: Signal<boolean>;
  isLoggedIn: boolean;
  logout: QRL<() => void>;
}

const CondensedNavbar = component$(
  ({ isSearchOpen, isMenuOpen, isLoggedIn, logout }: CondensedNavType) => {
    return (
      <nav>
        {!isSearchOpen.value ? (
          <>
            <a href="/">
              <SiteLogo />
            </a>
            <div class={styles["right"]}>
              <BsSearch
                class={styles["nav-btn"]}
                onClick$={() => (isSearchOpen.value = true)}
              />
              <BsList
                class={styles["nav-btn"]}
                onClick$={() => (isMenuOpen.value = true)}
              />
            </div>
            {isMenuOpen.value && (
              <NavMenu
                teamId={"t1"}
                isMenuOpen={isMenuOpen}
                isLoggedIn={isLoggedIn}
                logout={logout}
              />
            )}
          </>
        ) : (
          <NavSearch isSearchOpen={isSearchOpen} />
        )}
      </nav>
    );
  },
);

export default CondensedNavbar;
