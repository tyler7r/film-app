import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import ContentCard from "~/components/content-card";
import ContentLink from "~/components/content-link";
import { supabase } from "~/utils/supabase";
import { type TeamType } from "~/utils/types";
import mockData from "../../data/db.json";
import styles from "./index.module.css";

export const useGetNextOpponent = routeLoader$(async () => {
  const { data } = await supabase.from("teams").select().eq("id", 5).single();
  return data as TeamType;
});

export default component$(() => {
  const exampleTeam = useGetNextOpponent();
  const exampleGame = mockData.games[1];

  return (
    <main class="content">
      <h2 class={styles["welcome-msg"]}>Welcome, Tyler Randall!</h2>
      <div class={styles["continue-watching"]}>
        <div class={styles["continue-watching-title"]}>Continue Watching</div>
        <div class={styles["continue-watching-game"]}>
          (game info, timestamp, etc...)
        </div>
      </div>
      <div class={styles["content-cards"]}>
        <ContentCard>
          <div q: slot="title">Assigned Clips</div>
          <div q: slot="content">
            <ContentLink href="/film-room/g1" class={styles["assigned-clip"]}>
              I am an example of an assigned clip!
            </ContentLink>
          </div>
        </ContentCard>
        <ContentCard>
          <div q: slot="title">Scouting Tab</div>
          <div q: slot="content">
            <div class={styles["scouting-container"]}>
              <div class={styles["scouting-title"]}>Next Opponent</div>
              <Resource
                onPending={() => <div>Loading...</div>}
                value={exampleTeam}
                onResolved={(team) => (
                  <ContentLink
                    href="/profile/t1"
                    class={styles["next-opponent-container"]}
                  >
                    {team.logo && (
                      <img
                        src={team.logo}
                        class={styles["next-opponent-logo"]}
                        alt="opponent-logo"
                        height={170}
                        width={170}
                      />
                    )}
                    <div>
                      {team.city} {team.name}
                    </div>
                  </ContentLink>
                )}
              />
            </div>
            <div class={styles["scouting-container"]}>
              <div class={styles["scouting-title"]}>Our Last Game</div>
              <ContentLink
                href="/film-room/g1"
                class={styles["last-game-info"]}
              >
                <div>vs. {exampleGame.team2}</div>
                <div>@{exampleGame.tournament}</div>
              </ContentLink>
            </div>
          </div>
        </ContentCard>
        <ContentCard class={styles["highlight-card"]}>
          <div q: slot="title">
            <a href="/highlight-factory">Highlight Factory</a>
          </div>
          <div q: slot="content"></div>
        </ContentCard>
        {/* <div class={styles['content-card']} id={styles['highlight-card']}>
          <a href='/highlight-factory'><div class={styles['highlight-title']}>The Highlight Factory</div></a>
        </div> */}
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Film Study",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};
