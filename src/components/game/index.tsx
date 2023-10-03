import { component$ } from "@builder.io/qwik";
import { TeamType } from "~/types/types";
import styles from "./game.module.css";

interface GameProps {
  id: number;
  tournament: string | null;
  team1: TeamType;
  team2: TeamType;
  season: string | null;
  classProp?: string;
}

const Game = component$((props: GameProps) => {
  const { team2, team1, tournament, season, classProp } = props;

  return (
    <div class={`${styles["game-container"]} ${classProp}`}>
      <div class={styles["game-details"]}>
        {season} {tournament}
      </div>
      <div class={styles["game-matchup"]}>
        {team1.city} {team1.name} vs. {team2.city} {team2.name}
      </div>
    </div>
  );
});

export default Game;
