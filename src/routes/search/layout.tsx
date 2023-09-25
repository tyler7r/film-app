import { $, Slot, component$, useSignal } from "@builder.io/qwik";

import styles from "./search.module.css";
import { BsSearch } from "@qwikest/icons/bootstrap";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

const SearchLayout = component$(() => {
  const currentSearch = useLocation().params.term;
  const search = useSignal(currentSearch);

  const submit = $(() => {
    window.location.href = `/search/${search.value}`;
    search.value = "";
  });

  return (
    <div class="content">
      <div class={styles["container"]}>
        <form
          preventdefault:submit
          onSubmit$={submit}
          class={styles["search-form"]}
        >
          <input
            class={styles["search-input"]}
            type="text"
            bind:value={search}
          />
          <button class={styles["search-icon"]}>
            <BsSearch />
          </button>
        </form>
        <Slot />
      </div>
    </div>
  );
});

export default SearchLayout;

export const head: DocumentHead = {
  title: "Film Study",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};
