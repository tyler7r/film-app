import { $, Resource, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { Button } from "~/components/button";
import CoachTab from "~/components/coach-tab";
import ContentCard from "~/components/content-card";
import ContentLink from "~/components/content-link";
import { Game } from "~/components/game";
import Modal from "~/components/modal";
import { NoteForm } from "~/components/noteform";
import { Player } from "~/components/player";
import { Database } from "~/types";
import mockData from "../../../../data/db.json";
import styles from "./profile.module.css";

export const useTeamDetails = routeLoader$(async (requestEv) => {
  const teamId = requestEv.params.team;
  const supabaseClient = createServerClient<Database>(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv,
  );
  const { data } = await supabaseClient
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .limit(1);
  if (data) {
    return data[0];
  }
});

export default component$(() => {
  const team = useTeamDetails();
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
        <Resource
          value={team}
          onPending={() => <div>Loading...</div>}
          onResolved={(team) => (
            <div class={styles["info-container"]}>
              <img
                class={styles["team-logo"]}
                src={team?.logo}
                height={170}
                width={170}
                alt="team-logo"
              />
              <div class={styles["team-name"]}>
                {team?.city} {team?.name}
              </div>
            </div>
          )}
        />
        {inCoachView.value && <CoachTab />}
        <div class={styles["team-content"]}>
          <ContentCard>
            <div q: slot="title">Roster</div>
            <div q: slot="content" class={styles["roster-container"]}>
              {players.map((player) => (
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
            <div q: slot="title">Games</div>
            <div q: slot="content" class={styles["game-container"]}>
              {games.map((game) => (
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
                <div q: slot="close-modal" onClick$={() => closeNote()}>
                  X
                </div>
                <h2 q: slot="title">New Note</h2>
                <NoteForm q: slot="content" close={closeNote} />
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
