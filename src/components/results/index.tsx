import { Resource, component$ } from "@builder.io/qwik";
import styles from "./results.module.css";
import { routeLoader$ } from "@builder.io/qwik-city";
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
        // <Resource
        //     value={plays}
        //     onPending={() => <div>Loading...</div>}
        //     onResolved={(plays) => (
        //         <div class={styles['results']}>
        //             {plays && plays.map(play => (
        //                 <div>{play.note}</div>
        //             ))}
        //         </div>
        //     )}
        // />
        <div class={styles["results"]}>
          <div class={styles["results-title"]}>Keywords</div>
          {plays &&
            plays.map((play) => (
              <div key={play.id} class={styles["result"]}>
                {play.note}
              </div>
            ))}
        </div>
      )}
      {filters.players && (
        // <Resource
        //     value={players}
        //     onPending={() => <div>Loading...</div>}
        //     onResolved={(players) => (
        //         <div class={styles['results']}>
        //             {players && players.map(player => (
        //                 <div>{player.name}</div>
        //             ))}
        //         </div>
        //     )}
        // />
        <div class={styles["results"]} id={styles["player-results"]}>
          <div class={styles["results-title"]} id={styles["players-title"]}>
            Players
          </div>
          {players &&
            players.map((player) => (
              <div key={player.id} class={styles["result"]}>
                {player.name} #{player.number}
              </div>
            ))}
        </div>
      )}
      {filters.teams && (
        // <Resource
        //     value={teams}
        //     onPending={() => <div>Loading...</div>}
        //     onResolved={(teams) => (
        //         <div class={styles['results']}>
        //             {teams && teams.map(team => (
        //                 <div>{team.name}</div>
        //             ))}
        //         </div>
        //     )}
        // />
        <div class={styles["results"]}>
          <div class={styles["results-title"]}>Teams</div>
          {teams &&
            teams.map((team) => (
              <div key={team.id} class={styles["result"]}>
                {team.city} {team.name}
              </div>
            ))}
        </div>
      )}
      {filters.games && (
        // <Resource
        //     value={games}
        //     onPending={() => <div>Loading...</div>}
        //     onResolved={(games) => (
        //         <div class={styles['results']}>
        //             {games && games.map(game => (
        //                 <div>{game.team1} vs. {game.team2}</div>
        //             ))}
        //         </div>
        //     )}
        // />
        <div class={styles["results"]}>
          <div class={styles["results-title"]}>Games</div>
          {games &&
            games.map((game) => (
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
