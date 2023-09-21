import { component$ } from "@builder.io/qwik";
import styles from './film-home.module.css'
import mockData from '../../../data/db.json'

const FilmHome = component$(() => {
    const games = mockData.games;

    return (
        <div class={styles['container']}>
            <h2 class={styles['content-title']}>Game Select</h2>
            <div class={styles['games-container']}>
                {games.map(game => (
                    <a key={game.id} class={styles['game']} href={`/film-room/${game.id}`}>
                        <div class={styles['game-tournament']}>
                            {game.season} {game.tournament}
                        </div>
                        <div class={styles['game-teams']}>
                            {game.team1} vs. {game.team2}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
})

export default FilmHome