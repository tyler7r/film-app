import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

import styles from "./site-logo.module.css";

export const SiteLogo = component$((props: QwikIntrinsicElements["span"]) => {
  return (
    <span {...props}>
      <svg
        class={styles["icon"]}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        enable-background="new 0 0 64 64"
      >
        <path
          d="m35 27.869c-1.364 2.463-3.986 4.131-7 4.131h14c-3.014 0-5.636-1.668-7-4.131"
          fill="#757575"
        />
        <circle cx="28" cy="24" r="3" fill="#757575" />
        <circle cx="42" cy="24" r="3" fill="#757575" />
        <path
          d="m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m14 30c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-23c-1.1 0-2-.9-2-2v-.5l-5 2.5v-16l5 2.5v-.5c0-1.1.9-2 2-2h5c-4.418 0-8-3.582-8-8s3.582-8 8-8c3.014 0 5.636 1.668 7 4.131 1.364-2.463 3.986-4.131 7-4.131 4.418 0 8 3.582 8 8s-3.582 8-8 8h4"
          fill="#757575"
        />
      </svg>
      Film Study
    </span>
  );
});