import { component$, useSignal, $ } from "@builder.io/qwik";
import mockData from "../../../../data/db.json";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Player } from "~/components/player";
import styles from "./profile.module.css";
import { Game } from "~/components/game";
import { Button } from "~/components/button";
import { NoteForm } from "~/components/noteform";
import Modal from "~/components/modal";
import CoachTab from "~/components/coach-tab";
import ContentLink from "~/components/content-link";
import ContentCard from "~/components/content-card";

export default component$(() => {
  const teamId = useLocation().params.teams;

  const team = mockData.teams[1];
  const games = mockData.games;
  const players = mockData.users.filter((user) => user.role === "player");

  const isUserAffiliated = useSignal(true);
  const newNoteVisible = useSignal(false);
  const inCoachView = useSignal(true);

  const closeNote = $(() => {
    newNoteVisible.value = false;
  });

  return (
    <div class="content">
      <div class={styles["team-profile"]}>
        <div class={styles["info-container"]}>
          <img class={styles["team-logo"]} src={team.logo} alt="team-logo" />
          <div class={styles["team-name"]}>
            {team.city} {team.name}
          </div>
        </div>
        {inCoachView.value && <CoachTab />}
        <div class={styles["team-content"]}>
          <ContentCard>
            <div q:slot="title">Roster</div>
            <div q:slot="content" class={styles["roster-container"]}>
              {players &&
                players.map((player) => (
                  <Player
                    key={player.id}
                    name={player.name}
                    id={player.id}
                    number={player.number}
                  />
                ))}
            </div>
          </ContentCard>
          <ContentCard>
            <div q:slot="title">Games</div>
            <div q:slot="content" class={styles["game-container"]}>
              {games &&
                games.map((game) => (
                  <ContentLink key={game.id} href={`/film-room/${game.id}`}>
                    <Game
                      id={game.id}
                      team1={game.team1}
                      team2={game.team2}
                      tournament={game.tournament}
                      season={game.season}
                    />
                  </ContentLink>
                ))}
            </div>
          </ContentCard>
        </div>
        {isUserAffiliated.value && (
          <div class={[styles["notes-container"]]}>
            {newNoteVisible.value ? (
              <Modal>
                <div q:slot="close-modal" onClick$={() => closeNote()}>
                  X
                </div>
                <h2 q:slot="title">New Note</h2>
                <NoteForm q:slot="content" close={closeNote} />
              </Modal>
            ) : (
              <Button onClick$={() => (newNoteVisible.value = true)}>
                New Note
              </Button>
            )}
            <div class={styles["container-title"]}>Team Notes</div>
            <div class={styles["note"]}>This is an example note!</div>
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Team Profile",
  meta: [
    {
      name: "description",
      content:
        "Team profile. Where you can check a team's roster, and games played.",
    },
  ],
};
