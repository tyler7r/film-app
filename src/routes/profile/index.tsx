import { Resource, component$ } from "@builder.io/qwik";
import mockData from '../../../data/db.json';
import { routeLoader$ } from "@builder.io/qwik-city";
import { Player } from "~/components/player";
import styles from './profile.module.css'

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

export default component$(() => {
    const team = getTeamDetails();
    const players = getPlayerDetails();

    return (
        <div>
            <Resource
                value={team}
                onPending={() => <div>Loading...</div>}
                onResolved={(team) => (
                    <div class={styles['container']}>
                        <img class={styles['team-logo']} width="150" height="150" src={team.logo} alt='team-logo' />
                        <div>{team.city} {team.name}</div>
                    </div>
                )}
            />
            <Resource 
                value={players}
                onPending={() => <div>Loading...</div>}
                onResolved={(players) => (
                    <div class={styles['team-roster']}>
                        {players && players.map(player => (
                            <Player name={player.name} id={player.id} />
                        ))}
                    </div>
                )}
            />
        </div>
    )
})