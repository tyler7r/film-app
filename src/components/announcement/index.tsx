import { $, component$, useSignal } from "@builder.io/qwik";
import styles from './announcement.module.css'
import { Button } from "../button";

interface PropTypes {
    close: () => void,
}

const TeamAnnouncement = component$((props: PropTypes) => {
    const { close } = props;
    const announcement = useSignal('')

    const submit = $(() => {
        //post logic here
        close();
    })

    return (
        <form preventdefault:submit onSubmit$={submit} class='form-container'>
            <textarea bind:value={announcement} />
            {announcement.value !== '' &&
                <Button>Send</Button>
            }
        </form>
    )
})

export default TeamAnnouncement