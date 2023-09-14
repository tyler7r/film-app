import { $, PropFunction, component$, useStore } from "@builder.io/qwik";
import styles from './filters.module.css'
import { Button } from "../button";

interface FilterProps {
    close: PropFunction<() => void>,
}

const SearchFilters = component$((props: FilterProps) => {
    const { close } = props;

    const formData = useStore({
        keywords: true,
        teams: true,
        players: true,
        games: true,
        season: '',
        tournament: ''
    })

    const submit = $(() => {
        console.log(formData)
        close();
    })

    return (
        <form preventdefault:submit onSubmit$={submit} class={styles['form-container']}>
            <label class={styles['checkbox-container']}>
                <div class={styles['input-title']}>Keywords</div>
                <input type='checkbox' onInput$={() => formData.keywords = !formData.keywords} checked={formData.keywords} />
            </label>
            <label class={styles['checkbox-container']}>
                <div class={styles['input-title']}>Players</div>
                <input type='checkbox' onInput$={() => formData.players = !formData.players} checked={formData.players} />
            </label>
            <label class={styles['checkbox-container']}>
                <div class={styles['input-title']}>Teams</div>
                <input type='checkbox' onInput$={() => formData.teams = !formData.teams} checked={formData.teams} />
            </label>
            <label class={styles['checkbox-container']}>
                <div class={styles['input-title']}>Games</div>
                <input type='checkbox' onInput$={() => formData.games = !formData.games} checked={formData.games} />
            </label>
            <label class={styles['input-container']}>
                <div class={styles['input-title']}>Season</div>
                <input type='text' onInput$={(e) => formData.season = (e.target as HTMLInputElement).value} value={formData.season} />
            </label>
            <label class={styles['input-container']}>
                <div class={styles['input-title']}>Tournament</div>
                <input type='text' onInput$={(e) => formData.tournament = (e.target as HTMLInputElement).value} value={formData.tournament} />
            </label>
            <Button>Submit</Button>
        </form>
    )
})

export default SearchFilters