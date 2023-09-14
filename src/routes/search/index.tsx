import { $, Slot, component$, useSignal, useStore } from "@builder.io/qwik";

import styles from './search.module.css'
import { BsSearch } from "@qwikest/icons/bootstrap";
import { Button } from "~/components/button";
import Modal from "~/components/modal";
import SearchFilters from "~/components/filters";

import mockData from '../../../data/db.json';

const SearchHome = component$(() => {
    const search = useSignal('');
    const modalVisible = useSignal(false);
    const searchFilters = useStore({
        keywords: true,
        teams: true,
        players: true,
        games: true,
        season: '',
        tournament: ''
    })

    const submit = $(() => {
        console.log(search.value);
        search.value = ''
    })

    const close = $(() => {
        modalVisible.value = false;
    })
    
    const applyFilters = $((filter: 'keywords' | 'teams' | 'players' | 'games' | 'season' | 'tournament', value: string = '') => {
        if (filter === 'season' || filter === 'tournament') {
            searchFilters[filter] = value;
        } else {
            searchFilters[filter] = !searchFilters[filter]
        }
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
                        <SearchFilters q:slot='content' close={close} applyFilters={applyFilters} searchFilters={searchFilters} />
                    </Modal>
                }
                <div class={styles['results-container']}>
                    {}
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Keywords</div>
                        <Slot name='keywords' />
                    </div>
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Players</div>
                    </div>
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Teams</div>
                    </div>
                    <div class={styles['results']}>
                        <div class={styles['results-title']}>Games</div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default SearchHome;