import { component$, useStore, $ } from "@builder.io/qwik";
import { Button } from "../button";
import styles from './noteform.module.css'

interface NoteProps {
    close: () => void,
}

export const NoteForm = component$((props: NoteProps) => {

    const { close } = props;

    const noteData = useStore({ author: 'User Display Name', message: '' });

    const submit = $(() => {
        // post logic here
        console.log(noteData.message);
        noteData.message = '';
        close();
    })

    return (
        <div class={styles['new-note-container']}>
            <Button class={styles['close-note']} onClick$={close}>Close</Button>
            <form preventdefault:submit class={styles['note-form']} onSubmit$={() => submit()}>
                <label>
                    <span>Note</span>
                    <textarea value={noteData.message} onInput$={(e) => noteData.message = (e.target as HTMLInputElement).value} ></textarea>
                </label>
                <Button>Submit</Button>
            </form>
        </div>
    )
})