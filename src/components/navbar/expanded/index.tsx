import { component$ } from "@builder.io/qwik";
import { BsEnvelopeFill, BsGearFill, BsSearch } from "@qwikest/icons/bootstrap";
import { isSearchOpenType } from "..";
import { Button } from "../../button";
import NavSearch from "../../nav-search";
import { SiteLogo } from "../../site-logo";
import { TeamLogo } from "../../team-logo";
import styles from "../navbar.module.css";

const ExpandedNavbar = component$(({ isSearchOpen }: isSearchOpenType) => {
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
          <a href="/inbox" class={styles["nav-btn"]}>
            <BsEnvelopeFill />
          </a>
          <a href={`/profile/t1`} class={styles["team-logo"]}>
            <TeamLogo team="Atlanta Hustle" />
          </a>
          <a href="/login" class={styles["nav-btn"]}>
            <BsGearFill />
          </a>
        </div>
      ) : (
        <NavSearch isSearchOpen={isSearchOpen} />
      )}
    </nav>
  );
});

export default ExpandedNavbar;
