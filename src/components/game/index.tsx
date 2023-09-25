import { component$ } from "@builder.io/qwik";
import styles from "./game.module.css";

interface GameProps {
  id: string;
  team1: string;
  team2: string;
  tournament: string;
  season: string;
  classProp?: string;
}

export const Game = component$((props: GameProps) => {
  const { id, team1, team2, tournament, season, classProp } = props;

  return (
    <div class={`${styles["game-container"]} ${classProp}`}>
      <div class={styles["game-details"]}>
        {season} {tournament}
      </div>
      <div class={styles["game-matchup"]}>
        {team1} vs. {team2}
      </div>
    </div>
  );
});
