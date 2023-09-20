import { $, component$, useSignal } from "@builder.io/qwik";
import styles from './scouting.module.css'
import { Button } from "../button";

interface PropTypes {
    close: () => void,
}

const ScoutingModal = component$((props: PropTypes) => {
    const { close } = props;
    const nextOpponent = useSignal('');
    const lastGame = useSignal('');

    const submit = $(() => {
        //post logic here
        close();
    })

    return (
        <form class='form-container' preventdefault:submit onSubmit$={submit}>
            <label class='input-container'>
                <div class='input-title'>Next Opponent</div>
                <input type='text' bind:value={nextOpponent} />
            </label>
            <label class='input-container'>
                <div class='input-title'>Game to Watch</div>
                <input type='text' bind:value={lastGame} />
            </label>
            <Button>Submit</Button>
        </form>
    )
})

export default ScoutingModal