import { $, component$, useSignal, type Signal } from "@builder.io/qwik";
import { Button } from "../button";
import styles from "./nav-search.module.css";

interface NavSearchType {
  isSearchOpen: Signal<boolean>;
}

const NavSearch = component$(({ isSearchOpen }: NavSearchType) => {
  const search = useSignal("");

  const submit = $(() => {
    isSearchOpen.value = false;
    window.location.href = `/search/${search.value}`;
    search.value = "";
  });

  return (
    <form
      preventdefault:submit
      onSubmit$={submit}
      class={styles["search-form"]}
    >
      <input class={styles["search-input"]} type="text" bind:value={search} />
      <Button>Search</Button>
      <button
        type="button"
        onClick$={() => (isSearchOpen.value = false)}
        class={styles["close"]}
      >
        X
      </button>
    </form>
  );
});

export default NavSearch;
