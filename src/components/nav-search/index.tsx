import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal, $ } from "@builder.io/qwik";
import styles from "./nav-search.module.css";
import { Button } from "../button";

interface PropTypes {
  closeSearch: PropFunction<() => void>;
}

const NavSearch = component$((props: PropTypes) => {
  const { closeSearch } = props;
  const search = useSignal("");

  const submit = $(() => {
    closeSearch();
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
        onClick$={() => closeSearch()}
        class={styles["close"]}
      >
        X
      </button>
    </form>
  );
});

export default NavSearch;
