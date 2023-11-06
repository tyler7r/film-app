import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { BsList } from "@qwikest/icons/bootstrap";
import styles from "./menu.module.css";

interface NavMenuTypes {
  teamId: string;
  isMenuOpen: Signal<boolean>;
}

const NavMenu = component$(({ teamId, isMenuOpen }: NavMenuTypes) => {
  return (
    <div class={styles["overlay"]}>
      <div class={styles["menu-container"]}>
        <BsList
          class={styles["close"]}
          onClick$={() => (isMenuOpen.value = false)}
        />
        <div class={styles["btn-container"]}>
          <a href="/film-room" class={styles["menu-btn"]}>
            Film Room
          </a>
          <a href="/inbox" class={styles["menu-btn"]}>
            Inbox
          </a>
          <a href={`/profile/${teamId}`} class={styles["menu-btn"]}>
            Team Profile
          </a>
          <a href="/login" class={styles["menu-btn"]}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
});

export default NavMenu;
