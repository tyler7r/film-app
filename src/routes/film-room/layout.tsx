import { Slot, component$ } from "@builder.io/qwik";
import styles from "./film-home.module.css";
import Modal from "~/components/modal";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="content">
      <Slot />
    </div>
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
