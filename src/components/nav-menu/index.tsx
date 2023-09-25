import type { QRL} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import styles from "./menu.module.css";
import { BsList } from "@qwikest/icons/bootstrap";

interface PropTypes {
  teamId: string;
  close: QRL<() => void>;
}

const NavMenu = component$((props: PropTypes) => {
  const { teamId, close } = props;

  return (
    <div class={styles["overlay"]}>
      <div class={styles["menu-container"]}>
        <BsList class={styles["close"]} onClick$={() => close()} />
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
