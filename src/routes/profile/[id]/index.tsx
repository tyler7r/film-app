import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import mockData from '../../../../data/db.json';

interface TeamData {
    id: string,
    name: string,
    city: string,
    logo: string,
    division: string,
    roster: string[],
    games: string[],
}

export const TeamProfile = component$((props) => {
    const teams = mockData.teams;
    console.log(teams);
    return (
        <div>
            {/* <Resource
                value={team}
                onPending={() => <div>Loading...</div>}
                onResolved={(teams) => (
                    teams && 
                )}  
            /> */}
        </div>
    )
})