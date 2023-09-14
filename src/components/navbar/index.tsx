import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { BsSearch, BsEnvelopeFill } from "@qwikest/icons/bootstrap";

import { SiteLogo } from "~/components/site-logo";
import { Button } from "~/components/button";
import { TeamLogo } from "~/components/team-logo";

import styles from "./navbar.module.css";
import NavSearch from "../nav-search";

export const Navbar = component$(() => {
  const searchOpen = useSignal(false);

  const closeSearch = $(() => {
    searchOpen.value = false;
  })

  return (
    <nav>
      <a href="/">
        <SiteLogo />
      </a>
      {!searchOpen.value
        ? <div class={styles['right']}>
          <Button>Film Room</Button>
          <div class={styles['nav_btn']}>
            <BsSearch onClick$={() => searchOpen.value = true}/>
          </div>
          <div class={styles['nav_btn']}>
            <BsEnvelopeFill />
          </div>
          <TeamLogo team="Atlanta Hustle" />
        </div>
        : <NavSearch closeSearch={closeSearch} />
      }
    </nav>
  );
});
