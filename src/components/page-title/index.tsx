import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import styles from "./page-title.module.css";

const PageTitle = component$(
  ({ class: classProp, ...props }: QwikIntrinsicElements["h2"]) => {
    return (
      <h2 class={`${styles["title"]} ${classProp}`} {...props}>
        <Slot />
      </h2>
    );
  },
);

export default PageTitle;
