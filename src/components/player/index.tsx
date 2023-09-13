import { component$ } from "@builder.io/qwik";
import styles from './player.module.css'

interface PlayerProps {
    id: string,
    name: string,
    number?: number,
}

export const Player = component$((props: PlayerProps) => {
    const { name, id, number } = props;

    return (
        <div class={styles['player-info']}>
            <div>{name}</div>
            <div>#{number}</div>
        </div>
    )
})