import { component$ } from "@builder.io/qwik";
import styles from "./results.module.css";
import mockData from "../../../data/db.json";

interface SearchFilterType {
  keywords: boolean;
  teams: boolean;
  players: boolean;
  games: boolean;
  season: string;
  tournament: string;
}

interface ResultsProps {
  filters: SearchFilterType;
}

const getKeywordPlays = () => {
  const plays = mockData.plays;
  return plays;
};

const getPlayers = () => {
  const users = mockData.users;
  const players = users.filter((user) => user.role === "player");
  return players;
};

const getTeams = () => {
  const teams = mockData.teams;
  return teams;
};

const getGames = () => {
  const games = mockData.games;
  return games;
};

const SearchResults = component$((props: ResultsProps) => {
  const { filters } = props;
  const plays = getKeywordPlays();
  const players = getPlayers();
  const teams = getTeams();
  const games = getGames();

  return (
    <div class={styles["results-container"]}>
      {filters.keywords && (
        <div class={styles["results"]}>
          <div class={styles["results-title"]}>Keywords</div>
          {plays.map((play) => (
            <div key={play.id} class={styles["result"]}>
              {play.note}
            </div>
          ))}
        </div>
      )}
      {filters.players && (
        <div class={styles["results"]} id={styles["player-results"]}>
          <div class={styles["results-title"]} id={styles["players-title"]}>
            Players
          </div>
          {players.map((player) => (
            <div key={player.id} class={styles["result"]}>
              {player.name} #{player.number}
            </div>
          ))}
        </div>
      )}
      {filters.teams && (
        <div class={styles["results"]}>
          <div class={styles["results-title"]}>Teams</div>
          {teams.map((team) => (
            <div key={team.id} class={styles["result"]}>
              {team.city} {team.name}
            </div>
          ))}
        </div>
      )}
      {filters.games && (
        <div class={styles["results"]}>
          <div class={styles["results-title"]}>Games</div>
          {games.map((game) => (
            <div key={game.id} class={styles["result"]}>
              {game.team1} vs. {game.team2}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default SearchResults;
