import { $, QwikMouseEvent, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { BsSearch, BsEnvelopeFill, BsGearFill, BsList } from "@qwikest/icons/bootstrap";

import { SiteLogo } from "~/components/site-logo";
import { Button } from "~/components/button";
import { TeamLogo } from "~/components/team-logo";

import styles from "./navbar.module.css";
import NavSearch from "../nav-search";
import NavMenu from "../nav-menu";

interface PropTypes {
  isMobile: boolean,
}

export const Navbar = component$((props: PropTypes) => {
  const { isMobile } = props;
  const searchOpen = useSignal(false);
  const menuOpen = useSignal(false);

  const closeSearch = $(() => {
    searchOpen.value = false;
  })

  const closeMenu = $(() => {
    menuOpen.value = false;
  })

  const teamId = 't1';

  return (
    <>
      {!isMobile &&
        <nav>
          <a href="/">
            <SiteLogo />
          </a>
          {!searchOpen.value
            ? <div class={styles['right']}>
                <a href='/film-room'><Button>Film Room</Button></a>
                <BsSearch class={styles['nav-btn']} onClick$={() => searchOpen.value = true}/>
                <a href='/inbox' class={styles['nav-btn']}>
                  <BsEnvelopeFill />
                </a>
                <a href={`/profile/${teamId}`} class={styles['team-logo']}><TeamLogo team="Atlanta Hustle" /></a>
                <a href='/login' class={styles['nav-btn']}>
                  <BsGearFill />
                </a>
              </div>
            : <NavSearch closeSearch={closeSearch} />
          }
        </nav>
      }
      {isMobile &&
        <nav>
          {!searchOpen.value
            ? <>
              <a href='/'>
                <SiteLogo />
              </a>
              <div class={styles["right"]}>
                <BsSearch class={styles['nav-btn']} onClick$={() => searchOpen.value = true} />
                <BsList class={styles['nav-btn']} onClick$={() => menuOpen.value = true} />
              </div>
              {menuOpen.value &&
                <NavMenu teamId={teamId} close={closeMenu} />
              }
            </>
            : <NavSearch closeSearch={closeSearch} />
          }
        </nav>
      }
    </>
  );
});
