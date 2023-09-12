import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from './index.module.css';

export default component$(() => {
  return (
    <main>
      <h2>Welcome, (user)</h2>
      <div class={styles['continue-watching']}>
        <div class={styles['continue-watching-title']}>Continue Watching</div>
        <div class={styles['continue-watching-game']}>(game info, timestamp, etc...)</div>
      </div>
      <div class={styles['content']}>
        <div class={styles['content-card']}>
          Assigned Clips
        </div>
        <div class={styles['content-card']}>
          Scouting Tab
        </div>
        <div class={styles['content-card']}>
          Highlight Feed
        </div>
      </div>
    </main>
  )
})

export const head: DocumentHead = {
  title: "Film Study",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};
