import { Slot, component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

const Staging = component$(() => {
  return <Slot />;
});

export const head: DocumentHead = {
  title: "Film Room Finish Signup",
  meta: [
    {
      name: "description",
      content: "Sign up for a film room account",
    },
  ],
};

export default Staging;
