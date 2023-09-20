import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import styles from './film-room.module.css'
import mockData from '../../../../data/db.json'
import Modal from "~/components/modal";
import VideoSettings from "~/components/video-settings";
import { Button } from "~/components/button";
import { useLocation } from "@builder.io/qwik-city";

const FilmRoom = component$(() => {
    const gameId = useLocation().params.game
    const settingsOpen = useSignal(false);
    const createNote = useSignal(false);
    const noteOpen = useSignal(false);
    const clipStarted = useSignal(false);
    const formData = useStore({
        note: '',
        keywords: '',
    });
    const comment = useSignal('');

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
        settingsOpen.value = false;
    })

    const submitNote = $(() => {
        createNote.value = false;
        clipStarted.value = false;
    })

    const submitComment = $(() => {
        if (comment.value !== '') {
            // post logic here
            comment.value = '';
        }
        noteOpen.value = false;
    })

    const games = mockData.games;
    let game = games.find(game => game.id === gameId)

    const plays = mockData.plays;
    const play = plays.find(play => play.id === 'p1')

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
                            ? <div id={styles['active']} class={styles['clip-btn']} onClick$={() => createNote.value = true}>STOP</div>
                            : <div id={styles['inactive']} class={styles['clip-btn']} onClick$={() => clipStarted.value = true}>START</div>
                        }
                    </div>
                    <div class={styles['play-directory']}>
                        <div class={styles['directory-title']}>Play Directory</div>
                        {plays.map(play => (
                            <div class={styles['play']} onClick$={() => noteOpen.value = true}>{play.note}</div>
                        ))}
                    </div>
                </>
            }
            {createNote.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => {createNote.value = false; clipStarted.value = false}}>X</div>
                    <h2 q:slot='title'>Create Note</h2>
                    <form q:slot='content' class='form-container' preventdefault:submit onSubmit$={submitNote}>
                        <label class='input-container'>
                            <div class='input-title'>Note</div>
                            <textarea onInput$={(e) => formData.note = (e.target as HTMLInputElement).value} value={formData.note} />
                        </label>
                        <label class='input-container'>
                            <div class='input-title'>Keywords</div>
                            <input type="text" onInput$={(e) => formData.keywords = (e.target as HTMLInputElement).value} value={formData.keywords} />
                        </label>
                        {(formData.keywords !== '' || formData.note !== '') &&
                            <Button>Save</Button>
                        }
                    </form>
                </Modal>
            }
            {settingsOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => settingsOpen.value = false}>X</div>
                    <h2 q:slot="title">Video Settings</h2>
                    <VideoSettings q:slot='content' settings={settings} applySettings={applySettings} close={close} />
                </Modal>
            }
            {noteOpen.value && 
                <Modal>
                    <div q:slot='close-modal' onClick$={() => noteOpen.value = false}>X</div>
                    <h2 q:slot='title'>Play</h2>
                    <div q:slot='content' class={styles['play-container']}>
                        <div class={styles['play-author']}>{play?.author}</div>
                        <div class={styles['play-note']}>{play?.note}</div>
                        <form class='form-container' preventdefault:submit onSubmit$={submitComment}>
                            <label class='input-container' id={styles['comment-container']}>
                                <div class='input-title'>Comment</div>
                                <textarea bind:value={comment} />
                            </label>
                            {comment.value !== ''
                                ? <Button>Submit</Button>
                                : <Button type='button' onClick$={() => noteOpen.value = false}>Close</Button>
                            }
                        </form>
                    </div>
                </Modal>
            }
        </div>
    )
})

export default FilmRoom