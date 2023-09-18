import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import styles from './film-room.module.css'
import mockData from '../../../../data/db.json'
import Modal from "~/components/modal";
import VideoSettings from "~/components/video-settings";
import { Button } from "~/components/button";
import { useLocation } from "@builder.io/qwik-city";

const FilmRoom = component$(() => {
    const gameId = useLocation().params.game
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

    const games = mockData.games;
    let game = games.find(game => game.id === gameId)

    return (
        <div class={styles['container']}>
            <Button onClick$={() => modalVisible.value = true}>Video Settings</Button>
            {game &&
                <>
                    <h2 class={styles['game-title']}>{game.team1} vs. {game.team2}</h2>
                </>
            }
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