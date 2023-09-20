import { $, component$, useSignal } from "@builder.io/qwik";
import styles from './highlight-factory.module.css'
import { DocumentHead } from "@builder.io/qwik-city";
import mockData from '../../../data/db.json'
import { BsHeart } from "@qwikest/icons/bootstrap";

const HighlightFactory = component$(() => {
    const view = useSignal('Popular');

    interface ViewTypes {
        view: 'Popular' | 'Liked' | 'Tagged'
    }

    const changeView = $((v: ViewTypes['view']) => {
        view.value = v;
    })

    const buttonStatus = $((v: ViewTypes['view']) => {
        if (view.value === v) {
            return <button class={[styles['view-btn'], styles['active']]} onClick$={() => changeView(v)}>{v}</button>
        } else {
            return <button class={styles['view-btn']} onClick$={() => changeView(v)}>{v}</button>
        }
    })

    const plays = mockData.plays;

    return (
        <div class='content'>
            <div class={styles['title']}>The Highlight Factory</div>
            <div class={styles['menu-select']}>
                {buttonStatus('Popular')}
                {buttonStatus('Tagged')}
                {buttonStatus('Liked')}
            </div>
            <div class={styles['highlight-container']}>
                {plays.map(play => (
                    <div key={play.id} class={styles['highlight']}>
                        <div class={styles['clip']}></div>
                        <div class={styles["highlight-info"]}>
                            <div class={styles['like-btn']}>
                                <BsHeart />
                            </div>
                            <div class={styles["info-container"]}>
                                <div class={styles['container-title']}>Author: </div>
                                <div class={styles['highlight-author']}>{play.author}</div>
                            </div>
                            <div class={styles["info-container"]}>
                                <div class={styles['container-title']}>Players Involved: </div>
                                <div class={styles['players-involved']}>
                                    {play.players.map(player => (
                                        <div key={player} class={styles['player']}>@{player}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default HighlightFactory

export const head: DocumentHead = {
    title: "Highlight Factory",
    meta: [
      {
        name: "description",
        content: "Where all the best plays live!",
      },
    ],
  };