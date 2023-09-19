import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from './index.module.css';
import mockData from '../../data/db.json'

export default component$(() => {
  const exampleTeam = mockData.teams[1];
  const exampleGame = mockData.games[1];

  return (
    <main class='content'>
      <h2 class={styles['welcome-msg']}>Welcome, Tyler Randall!</h2>
      <div class={styles['continue-watching']}>
        <div class={styles['continue-watching-title']}>Continue Watching</div>
        <div class={styles['continue-watching-game']}>(game info, timestamp, etc...)</div>
      </div>
      <div class={styles['content-cards']}>
        <div class={styles['content-card']}>
          <div class={styles['card-title']}>Assigned Clips</div>
          <div class={styles['card-content']}>
            <a href='/film-room/g1'><div class={styles['assigned-clip']}>I am an example of an assigned clip!</div></a>
          </div>
        </div>
        <div class={styles['content-card']}>
          <div class={styles['card-title']}>Scouting Tab</div>
            <div class={styles['card-content']}>
              <div class={styles['scouting-container']}>
                <div class={styles['scouting-title']}>Next Opponent</div>
                <a href='/profile/t1'><div class={styles["scouting-info"]}>
                  <img src={exampleTeam.logo} class={styles['next-opponent-logo']} alt='opponent-logo' />
                  <div class={styles['next-opponent-name']}>{exampleTeam.city} {exampleTeam.name}</div>
                </div></a>
              </div>
              <div class={styles['scouting-container']}>
                <div class={styles['scouting-title']}>Our Last Game</div>
                <a href='/film-room/g1'><div class={styles["scouting-info"]} id={styles['last-game-info']}>
                  <div class={styles['last-game-opponent']}>vs. {exampleGame.team2}</div>
                  <div class={styles['last-game-tournament']}>@{exampleGame.tournament}</div>
                </div></a>
              </div>
            </div>
        </div>
        <div class={styles['content-card']} id={styles['highlight-card']}>
          <div class={styles['highlight-title']}>The Highlight Factory</div>
        </div>
      </div>
    </main>
  )
})

export const head: DocumentHead = {
  title: "Film Study",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};
