import { component$ } from "@builder.io/qwik";
import styles from "./inbox.module.css";

import type { DocumentHead } from "@builder.io/qwik-city";

const Inbox = component$(() => {
  return (
    <div class={styles["inbox-container"]}>
      <div class={styles["container-title"]}>Inbox</div>
      <div class={styles["results"]}>
        <div class={styles["results-title"]}>Team Announcements</div>
        <div class={styles["result"]}>New Announcement!</div>
      </div>
      <div class={styles["results"]}>
        <div class={styles["results-title"]}>Mentions</div>
        <div class={styles["result"]}>New Mention</div>
      </div>
      <div class={styles["results"]}>
        <div class={styles["results-title"]}>Comments</div>
        <div class={styles["result"]}>New Comment</div>
      </div>
      <div class={styles["results"]}>
        <div class={styles["results-title"]}>Highlight Mentions</div>
        <div class={styles["result"]}>New Highlight Mention</div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Film Study Inbox",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};

export default Inbox;
