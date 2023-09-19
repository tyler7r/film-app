import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import styles from './term.module.css'
import SearchFilters from "~/components/filters";
import Modal from "~/components/modal";
import { Button } from "~/components/button";
import SearchResults from "~/components/results";

const Search = component$(() => {
    const modalVisible = useSignal(false);
    const searchFilters = useStore({
        keywords: true,
        teams: true,
        players: true,
        games: true,
        season: '',
        tournament: ''
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
        <>
            <Button onClick$={() => modalVisible.value = true}>Add Filters</Button>
            {modalVisible.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => modalVisible.value = false}>X</div>
                    <h2 q:slot='title'>Search Filters</h2>
                    <SearchFilters q:slot='content' close={close} applyFilters={applyFilters} searchFilters={searchFilters} />
                </Modal>
            }
            <SearchResults filters={searchFilters} />
        </>
    )
})

export default Search