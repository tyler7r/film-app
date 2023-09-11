import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { BsSearch, BsEnvelopeFill } from "@qwikest/icons/bootstrap";

import { SiteLogo } from "~/components/site-logo";
import { Button } from "~/components/button";
import { TeamLogo } from "~/components/team-logo";

import styles from "./navbar.module.css?inline";

export const Navbar = component$(() => {
  useStylesScoped$(styles);

  return (
    <nav>
      <a href="/">
        <SiteLogo />
      </a>
      <Button>Film Room</Button>
      {/* buttons are causing annoying warnings in console */}
      {/* <BsSearch />
      <BsEnvelopeFill /> */}
      <TeamLogo team="Atlanta Hustle" />
    </nav>
  );
});
