import { component$ } from "@builder.io/qwik";
import styles from './film-home.module.css'
import mockData from '../../../data/db.json'
import { Game } from "~/components/game";

const FilmHome = component$(() => {
    const games = mockData.games;

    return (
        <div class={styles['container']}>
            <h2 class={styles['content-title']}>Game Select</h2>
            <div class={styles['games-container']}>
                {games.map(game => (
                    <a href={`/film-room/${game.id}`}><Game key={game.id} id={game.id} team1={game.team1} team2={game.team2} season={game.season} tournament={game.tournament} classProp={styles['game']} /></a>
                ))}
            </div>
        </div>
    )
})

export default FilmHome