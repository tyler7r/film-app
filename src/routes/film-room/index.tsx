import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import ContentLink from "~/components/content-link";
import Game from "~/components/game";
import PageTitle from "~/components/page-title";
import { supabase } from "../layout";
import styles from "./film-home.module.css";

const useGetAllGames = routeLoader$(async (requestEv) => {
  const { data } = await supabase
    .from("games")
    .select(`*, team1: team1_id(*), team2: team2_id(*)`);
  const result = data;
  return result;
});

const FilmHome = component$(() => {
  const games = useGetAllGames();
  return (
    <div class={styles["container"]}>
      <PageTitle>Game Select</PageTitle>
      <div class={styles["games-container"]}>
        <Resource
          onPending={() => <div>Loading...</div>}
          value={games}
          onResolved={(games) => (
            <>
              {games &&
                games.map((game: any) => (
                  <ContentLink
                    key={`game-link${game.id}`}
                    href={`/film-room/g${game.id}`}
                  >
                    <Game
                      id={game.id}
                      season={game.season}
                      tournament={game.tournament}
                      team1={game.team1}
                      team2={game.team2}
                    />
                  </ContentLink>
                ))}
              {games?.length === 0 && <div>No Games Recorded</div>}
            </>
          )}
        />
      </div>
    </div>
  );
});

export default FilmHome;
