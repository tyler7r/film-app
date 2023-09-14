import { component$, useSignal, $, PropFunction } from "@builder.io/qwik";
import styles from './nav-search.module.css'
import { Button } from "../button";

interface PropTypes {
    closeSearch: PropFunction<() => void>
}

const NavSearch = component$((props: PropTypes) => {
    const { closeSearch } = props; 
    const search = useSignal('');

    const submit = $(() => {
        console.log('run');
        search.value = '';
        closeSearch();
        window.location.href = '/search';
        //link to search page with results in params
    })

    return (
        <form preventdefault:submit onSubmit$={submit} class={styles['search-form']}>
            <input class={styles['search-input']} type='text' value={search.value} onInput$={(e) => (e.target as HTMLInputElement).value} />
            <Button>Search</Button>
            <button type='button' onClick$={() => closeSearch()} class={styles['close']}>X</button>
        </form>
    )
})

export default NavSearch