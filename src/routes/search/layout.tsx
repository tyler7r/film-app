import { $, Slot, component$, useSignal, useStore } from "@builder.io/qwik";

import styles from './search.module.css'
import { BsSearch } from "@qwikest/icons/bootstrap";
import { Button } from "~/components/button";
import Modal from "~/components/modal";
import SearchFilters from "~/components/filters";

const SearchLayout = component$(() => {
    const search = useSignal('');

    const submit = $(() => {
        search.value = ''
    })

    return (
        <div class='content'>
            <div class={styles['container']}>
                <form preventdefault:submit onSubmit$={submit} class={styles['search-form']}>
                    <input class={styles['search-input']} type='text' value={search.value} onInput$={(e) => search.value = (e.target as HTMLInputElement).value} />
                    <button class={styles['search-icon']}>
                        <BsSearch />
                    </button>
                </form>
                <Slot />
            </div>
        </div>
    )
})

export default SearchLayout;