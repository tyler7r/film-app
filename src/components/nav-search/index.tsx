import { $, component$, useSignal } from "@builder.io/qwik";
import { Button } from "../button";
import { isSearchOpenType } from "../navbar";
import styles from "./nav-search.module.css";

const NavSearch = component$(({ isSearchOpen }: isSearchOpenType) => {
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
