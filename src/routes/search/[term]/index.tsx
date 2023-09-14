import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import styles from './term.module.css'
import SearchFilters from "~/components/filters";
import Modal from "~/components/modal";
import { Button } from "~/components/button";
import SearchResults from "~/components/results";
import { routeLoader$ } from "@builder.io/qwik-city";

interface SearchFilterType {
    keywords: boolean,
    teams: boolean,
    players: boolean,
    games: boolean,
    season: string,
    tournament: string
}

interface SearchProps {
    filters: SearchFilterType
}

const Search = component$((props: SearchProps) => {
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
                <Modal close={close}>
                    <h2 class={styles['modal-title']} q:slot='title'>Filters</h2>
                    <SearchFilters q:slot='content' close={close} applyFilters={applyFilters} searchFilters={searchFilters} />
                </Modal>
            }
            <SearchResults filters={searchFilters} />
        </>
    )
})

export default Search