import { Resource, component$, useSignal, useStore, $ } from "@builder.io/qwik";
import mockData from '../../../../data/db.json';
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { Player } from "~/components/player";
import styles from './profile.module.css'
import { Game } from "~/components/game";
import { Button } from "~/components/button";
import { NoteForm } from "~/components/noteform";
import Modal from "~/components/modal";
import TeamAnnouncement from "~/components/announcement";
import ScoutingModal from "~/components/scouting";
import CoachTab from "~/components/coach-tab";

export default component$(() => {
    const teamId = useLocation().params.teams;

    const team = mockData.teams[1];
    const games = mockData.games;
    const players = mockData.users.filter(user => user.role === 'player');

    const isUserAffiliated = useSignal(true);
    const newNoteVisible = useSignal(false);
    const inCoachView = useSignal(true);

    const closeNote = $(() => {
        newNoteVisible.value = false;
    })

    return (
        <div class='content'>
            <div class={styles['team-profile']}>
                <div class={styles['info-container']}>
                    <img class={styles['team-logo']} src={team.logo} alt='team-logo' />
                    <div class={styles['team-name']}>{team.city} {team.name}</div>
                </div>
                {inCoachView.value &&
                    <CoachTab />
                }
                <div class={styles["team-content"]}>
                    <div class={styles['container']} id={styles['roster-container']}>
                        <div class={styles['container-title']} id={styles['roster-title']}>Roster</div>
                        {players && players.map(player => (
                            <Player name={player.name} id={player.id} number={player.number} />
                        ))}
                        {inCoachView.value &&
                            <button class={styles['edit-roster']}>Edit Roster</button>
                        }
                    </div>
                    <div class={styles['container']}>
                        <div class={styles['container-title']}>Games</div>
                        {games && games.map(game => (
                            <a href={`/film-room/${game.id}`}><Game id={game.id} team1={game.team1} team2={game.team2} tournament={game.tournament} season={game.season} /></a>
                        ))}
                    </div>
                </div>
                {isUserAffiliated.value &&
                    <div class={[styles['notes-container']]}>
                        {newNoteVisible.value
                            ? <Modal>
                                <div q:slot='close-modal' onClick$={() => newNoteVisible.value = false}>X</div>
                                <h2 q:slot='title'>New Note</h2>
                                <NoteForm q:slot='content' close={closeNote} />
                            </Modal>
                            : <Button onClick$={() => newNoteVisible.value = true}>New Note</Button>
                        }
                        <div class={styles['container-title']}>Team Notes</div>
                        <div class={styles['note']}>This is an example note!</div>
                    </div>
                }
            </div>
        </div>
    )
})

export const head: DocumentHead = {
    title: "Team Profile",
    meta: [
      {
        name: "description",
        content: "Team profile. Where you can check a team's roster, and games played.",
      },
    ],
  };