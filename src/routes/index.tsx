import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from './index.module.css';
import mockData from '../../data/db.json'
import ContentLink from "~/components/content-link";

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
            <ContentLink href='/film-room/g1'>I am an example of an assigned clip!</ContentLink>
          </div>
        </div>
        <div class={styles['content-card']}>
          <div class={styles['card-title']}>Scouting Tab</div>
            <div class={styles['card-content']}>
              <div class={styles['scouting-container']}>
                <div class={styles['scouting-title']}>Next Opponent</div>
                <ContentLink href='/profile/t1'>
                  <img src={exampleTeam.logo} class={styles['next-opponent-logo']} alt='opponent-logo' />
                  <div>{exampleTeam.city} {exampleTeam.name}</div>
                </ContentLink>
              </div>
              <div class={styles['scouting-container']}>
                <div class={styles['scouting-title']}>Our Last Game</div>
                <ContentLink href='/film-room/g1' class={styles['last-game-info']}>
                  <div>vs. {exampleGame.team2}</div>
                  <div>@{exampleGame.tournament}</div>
                </ContentLink>
              </div>
            </div>
        </div>
        <div class={styles['content-card']} id={styles['highlight-card']}>
          <a href='/highlight-factory'><div class={styles['highlight-title']}>The Highlight Factory</div></a>
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
