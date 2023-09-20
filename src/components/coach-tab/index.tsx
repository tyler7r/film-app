import { $, component$, useSignal } from "@builder.io/qwik";
import styles from './coach-tab.module.css'
import Modal from "../modal";
import TeamAnnouncement from "../announcement";
import ScoutingModal from "../scouting";

const CoachTab = component$(() => {
    const teamAnnouncementOpen = useSignal(false);
    const setScoutingOpen = useSignal(false);

    const closeAnnouncement = $(() => {
        teamAnnouncementOpen.value = false;
    })

    const closeScouting = $(() => {
        setScoutingOpen.value = false;
    })

    return (
        <div class={styles['container']}>
            <div class={styles['container-title']}>The Coach Box</div>
            <div class={styles["btn-container"]}>
                <button class={styles['coach-btn']} onClick$={() => teamAnnouncementOpen.value = true}>Send Team Announcement</button>
                <button class={styles['coach-btn']} onClick$={() => setScoutingOpen.value = true}>Set Scouting Tab</button>
            </div>
            {teamAnnouncementOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => teamAnnouncementOpen.value = false}>X</div>
                    <h2 q:slot='title'>Team Announcment</h2>
                    <TeamAnnouncement close={closeAnnouncement} />
                </Modal>
            }
            {setScoutingOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => setScoutingOpen.value = false}>X</div>
                    <h2 q:slot="title">Adjust Scouting</h2>
                    <ScoutingModal close={closeScouting} />
                </Modal>
            }
        </div>
    )
})

export default CoachTab