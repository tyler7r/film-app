import { component$ } from "@builder.io/qwik";

interface PlayerProps {
    id: string,
    name: string,
}

export const Player = component$((props: PlayerProps) => {
    const { name, id } = props;

    return (
        <div>
            <div>{name}</div>
            <div>{id}</div>
        </div>
    )
})