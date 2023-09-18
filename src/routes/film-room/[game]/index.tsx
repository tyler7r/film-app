import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import styles from './film-room.module.css'
import Modal from "~/components/modal";
import VideoSettings from "~/components/video-settings";
import { Button } from "~/components/button";

const FilmRoom = component$(() => {
    const modalVisible = useSignal(false);
    const settings = useStore({
        showClips: true,
        myMentionsOnly: false,
        selectAuthor: '',
        selectKeyword: '',
    })

    const applySettings = $((filter: 'showClips' | 'myMentionsOnly' | 'selectAuthor' | 'selectKeyword', value: string = '') => {
        if (filter === 'selectAuthor' || filter === 'selectKeyword') {
            settings[filter] = value;
        } else {
            settings[filter] = !settings[filter]
        }
    })

    const close = $(() => {
        modalVisible.value = false;
    })

    return (
        <div>
            <Button onClick$={() => modalVisible.value = true}>Video Settings</Button>
            {modalVisible.value &&
                <Modal>
                    <h2 q:slot="title" class={styles['modal-title']}>Video Settings</h2>
                    <VideoSettings q:slot='content' settings={settings} applySettings={applySettings} close={close} />
                </Modal>
            }
        </div>
    )
})

export default FilmRoom