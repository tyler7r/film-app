import { component$ } from "@builder.io/qwik";
import styles from './game.module.css'

interface GameProps {
    id: string,
    team1: string,
    team2: string,
    tournament: string,
    season: string
}

export const Game = component$((props: GameProps) => {
    const { id, team1, team2, tournament, season} = props

    return (
        <div class={styles['game-container']}>
            <div>{team1} vs. {team2}</div>
            <div>{season} {tournament}</div>
        </div>
    )
})