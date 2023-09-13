import { $, component$, useSignal, useStore } from "@builder.io/qwik";

import styles from './search.module.css'
import { BsSearch } from "@qwikest/icons/bootstrap";
import { Button } from "~/components/button";
import Modal from "~/components/modal";
import SearchFilters from "~/components/filters";

const SearchHome = component$(() => {
    const search = useSignal('');
    const modalVisible = useSignal(true);

    const submit = $(() => {
        console.log(search.value);
        search.value = ''
    })

    const close = $(() => {
        modalVisible.value = false;
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
                <Button onClick$={() => modalVisible.value = true}>Add Filters</Button>
                {modalVisible.value &&
                    <Modal close={close}>
                        <h2 class={styles['modal-title']} q:slot='title'>Filters</h2>
                        <SearchFilters q:slot='content' close={close} />
                    </Modal>
                }
                <div class={styles['results-container']}>
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Players</div>
                    </div>
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Teams</div>
                    </div>
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Plays (keywords)</div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default SearchHome;