import { $, component$, useSignal, useStore } from "@builder.io/qwik";

import styles from './search.module.css'
import { BsSearch } from "@qwikest/icons/bootstrap";

export default component$(() => {
    const search = useSignal('');

    const submit = $(() => {
        console.log(search.value);
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
            </div>
        </div>
    )
})