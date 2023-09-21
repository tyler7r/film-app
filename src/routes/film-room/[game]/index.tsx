import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import styles from './film-room.module.css'
import mockData from '../../../../data/db.json'
import Modal from "~/components/modal";
import VideoSettings from "~/components/video-settings";
import { Button } from "~/components/button";
import { useLocation } from "@builder.io/qwik-city";
import CreateNote from "~/components/create-note";
import ClipNote from "~/components/clip-note";

const FilmRoom = component$(() => {
    const gameId = useLocation().params.game
    const settingsOpen = useSignal(false);
    const createNoteOpen = useSignal(false);
    const clipNoteOpen = useSignal(false);
    const clipStarted = useSignal(false);

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

    const closeSettings = $(() => {
        settingsOpen.value = false;
    })

    const endClip = $(() => {
        clipStarted.value = false;
    })

    const closeNote = $(() => {
        createNoteOpen.value = false;
    })

    const closeClipNote = $(() => {
        clipNoteOpen.value = false;
    })

    const games = mockData.games;
    let game = games.find(game => game.id === gameId)

    const plays = mockData.plays;

    return (
        <div class={styles['container']}>
            <Button onClick$={() => settingsOpen.value = true}>Video Settings</Button>
            {game &&
                <>
                    <div class={styles["game-title-container"]}>
                        <div class={styles['game-tournament']}>{game.season} {game.tournament}</div>
                        <h2 class={styles['game-title']}>{game.team1} vs. {game.team2}</h2>
                    </div>
                    <div class={styles['mock-player']}>
                        {clipStarted.value
                            ? <div id={styles['active']} class={styles['clip-btn']} onClick$={() => createNoteOpen.value = true}>STOP</div>
                            : <div id={styles['inactive']} class={styles['clip-btn']} onClick$={() => clipStarted.value = true}>START</div>
                        }
                    </div>
                    <div class={styles['play-directory']}>
                        <div class={styles['directory-title']}>Play Directory</div>
                        {plays.map(play => (
                            <div key={play.id} class={styles['play']} onClick$={() => clipNoteOpen.value = true}>{play.note}</div>
                        ))}
                    </div>
                </>
            }
            {createNoteOpen.value &&
                <CreateNote endClip={endClip} close={closeNote} />
            }
            {settingsOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => settingsOpen.value = false}>X</div>
                    <h2 q:slot="title">Video Settings</h2>
                    <VideoSettings q:slot='content' settings={settings} applySettings={applySettings} close={closeSettings} />
                </Modal>
            }
            {clipNoteOpen.value && 
                <ClipNote close={closeClipNote} />
            }
        </div>
    )
})

export default FilmRoom