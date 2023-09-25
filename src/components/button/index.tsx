import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

import styles from "./button.module.css";

export const Button = component$(
  ({ class: classProp, ...props }: QwikIntrinsicElements["button"]) => {
    return (
      <button class={`${styles["button"]} ${classProp}`} {...props}>
        <Slot />
      </button>
    );
  },
);
