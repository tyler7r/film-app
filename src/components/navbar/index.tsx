import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { BsSearch, BsEnvelopeFill } from "@qwikest/icons/bootstrap";

import { SiteLogo } from "~/components/site-logo";
import { Button } from "~/components/button";
import { TeamLogo } from "~/components/team-logo";

import styles from "./navbar.module.css";

export const Navbar = component$(() => {
  return (
    <nav>
      <a href="/">
        <SiteLogo />
      </a>
      <div class={styles.right}>
        <Button>Film Room</Button>
        <div class={styles.nav_btn}>
          <BsSearch />
        </div>
        <div class={styles.nav_btn}>
          <BsEnvelopeFill />
        </div>
        <TeamLogo team="Atlanta Hustle" />
      </div>
    </nav>
  );
});
