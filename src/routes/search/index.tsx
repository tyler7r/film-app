import { component$ } from "@builder.io/qwik";
import styles from './search.module.css'

const SearchHome = component$(() => {
    return (
        <div class={styles['empty-search']}>
            Search for something!
        </div>
    )
})

export default SearchHome;