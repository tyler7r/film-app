import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hello!</h1>
      <p>
        This is the landing page. I haven't built it yet, but I threw together a
        stupid little navbar for you to get a sense of what qwik is about.
      </p>
      <p>
        We still have to talk about state management and things like that, but
        this will kind of give you an idea of what we're working with.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Film Study",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};
