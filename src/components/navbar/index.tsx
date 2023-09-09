import { component$ } from "@builder.io/qwik";
import { BsSearch, BsEnvelopeFill } from "@qwikest/icons/bootstrap";

import { SiteLogo } from "~/components/site-logo";
import { Button } from "~/components/button";
import { TeamLogo } from "~/components/team-logo";

import styles from "./navbar.module.css";

export const Navbar = component$(() => {
  return (
    <nav>
      <a href="/" class={styles["link"]}>
        <SiteLogo />
      </a>
      <Button>Film Room</Button>
      <BsSearch />
      <BsEnvelopeFill />
      <TeamLogo team="Atlanta Hustle" />
    </nav>
  );
});
