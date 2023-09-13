import { Resource, component$ } from "@builder.io/qwik";
import mockData from '../../../data/db.json';
import { routeLoader$ } from "@builder.io/qwik-city";
import { Player } from "~/components/player";
import styles from './profile.module.css'
import { Game } from "~/components/game";

export const getTeamDetails = routeLoader$(async (requestEvent) => {
    const teams = mockData.teams;
    const exampleTeam = teams[2];
    return exampleTeam;
})

export const getPlayerDetails = routeLoader$(async (requestEvent) => {
    const users = mockData.users;
    const players = users.filter(user => user.role === 'player');
    return players;
})

export const getGameDetails = routeLoader$(async (requestEvent) => {
    const games = mockData.games;
    return games;
})

export default component$(() => {
    const team = getTeamDetails();
    const players = getPlayerDetails();
    const games = getGameDetails();

    return (
        <div class='content'>
            <div class={styles['team-profile']}>
                <Resource
                    value={team}
                    onPending={() => <div>Loading...</div>}
                    onResolved={(team) => (
                        <div class={[styles['info-container']]}>
                            <img class={styles['team-logo']} src={team.logo} alt='team-logo' />
                            <div class={styles['team-name']}>{team.city} {team.name}</div>
                        </div>
                    )}
                />
                <div class={styles["team-content"]}>
                    <div class={styles['roster-container']}>
                        <Resource
                            value={players}
                            onPending={() => <div>Loading...</div>}
                            onResolved={(players) => (
                                <div class={styles['container']}>
                                    <div class={styles['container-title']}>Roster</div>
                                    {players && players.map(player => (
                                        <Player name={player.name} id={player.id} number={player.number} />
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                    <div class={styles['games-container']}>
                        <Resource
                            value={games}
                            onPending={() => <div>Loading...</div>}
                            onResolved={(games) => (
                                <div class={styles['container']}>
                                    <div class={styles['container-title']}>Games</div>
                                    {games && games.map(game => (
                                        <Game id={game.id} team1={game.team1} team2={game.team2} tournament={game.tournament} season={game.season} />
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div class={[styles['notes-container'], styles['container']]}>
                    <div class={styles['container-title']}>Notes</div>
                </div>
            </div>
        </div>
    )
})