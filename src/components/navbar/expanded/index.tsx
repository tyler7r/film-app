import { component$, type QRL, type Signal } from "@builder.io/qwik";
import { BsEnvelopeFill, BsSearch } from "@qwikest/icons/bootstrap";
import { Button } from "../../button";
import NavSearch from "../../nav-search";
import { SiteLogo } from "../../site-logo";
import { TeamLogo } from "../../team-logo";
import styles from "../navbar.module.css";

interface ExpandedNavType {
  isSearchOpen: Signal<boolean>;
  isLoggedIn: boolean;
  logout: QRL<() => void>;
}

const ExpandedNavbar = component$(
  ({ isSearchOpen, isLoggedIn, logout }: ExpandedNavType) => {
    return (
      <nav>
        <a href="/">
          <SiteLogo />
        </a>
        {!isSearchOpen.value ? (
          <div class={styles["right"]}>
            <a href="/film-room">
              <Button>Film Room</Button>
            </a>
            <BsSearch
              class={styles["nav-btn"]}
              onClick$={() => (isSearchOpen.value = true)}
            />
            {isLoggedIn ? (
              <>
                <a href="/inbox" class={styles["nav-btn"]}>
                  <BsEnvelopeFill />
                </a>
                <a href={`/profile/t1`}>
                  <TeamLogo />
                </a>
                <Button onClick$={() => logout()}>Log Out</Button>
              </>
            ) : (
              <a href="/login">
                <Button>Login</Button>
              </a>
            )}
          </div>
        ) : (
          <NavSearch isSearchOpen={isSearchOpen} />
        )}
      </nav>
    );
  },
);

export default ExpandedNavbar;
