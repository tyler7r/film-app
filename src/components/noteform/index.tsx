import { component$, useStore, $ } from "@builder.io/qwik";
import { Button } from "../button";
import styles from './noteform.module.css'

interface NoteProps {
    close: () => void,
}

export const NoteForm = component$((props: NoteProps) => {

    const { close } = props;

    const noteData = useStore({ 
        author: 'User Display Name', 
        message: '' 
    });

    const submit = $(() => {
        // post logic here
        console.log(noteData.message);
        noteData.message = '';
        close();
    })

    return (
        <form preventdefault:submit class='form-container' onSubmit$={() => submit()}>
            <textarea value={noteData.message} onInput$={(e) => noteData.message = (e.target as HTMLInputElement).value} />
            {noteData.message !== ''
                ? <Button>Submit</Button>
                : <Button class={styles['inactive']} type='button'>Add Note</Button>
            }
        </form>
    )
})