import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import HomeStyles from './home.css?inline';

export default component$(() => {
  useStylesScoped$(HomeStyles);

  return (
    <main>
      <h2>Welcome, (user)</h2>
      <div class='continue-watching'>
        <div class='continue-watching-title'>Continue Watching</div>
        <div class='continue-watching-game'>(game info, timestamp, etc...)</div>
      </div>
      <div class='content'>
        <div class='content-card'>
          Assigned Clips
        </div>
        <div class='content-card'>
          Scouting Tab
        </div>
        <div class='content-card'>
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
