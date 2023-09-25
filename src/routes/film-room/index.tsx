import { component$ } from "@builder.io/qwik";
import styles from "./film-home.module.css";
import mockData from "../../../data/db.json";
import { Game } from "~/components/game";
import PageTitle from "~/components/page-title";

const FilmHome = component$(() => {
  const games = mockData.games;

  return (
    <div class={styles["container"]}>
      <PageTitle>Game Select</PageTitle>
      <div class={styles["games-container"]}>
        {games.map((game) => (
          <a href={`/film-room/${game.id}`}>
            <Game
              key={game.id}
              id={game.id}
              team1={game.team1}
              team2={game.team2}
              season={game.season}
              tournament={game.tournament}
              classProp={styles["game"]}
            />
          </a>
        ))}
      </div>
    </div>
  );
});

export default FilmHome;
