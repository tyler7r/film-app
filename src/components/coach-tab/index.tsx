import { $, component$, useSignal } from "@builder.io/qwik";
import styles from './coach-tab.module.css'
import Modal from "../modal";
import TeamAnnouncement from "../announcement";
import ScoutingModal from "../scouting";
import EditRoster from "../edit-roster";

const CoachTab = component$(() => {
    const teamAnnouncementOpen = useSignal(false);
    const setScoutingOpen = useSignal(false);
    const editRosterOpen = useSignal(false);

    const closeAnnouncement = $(() => {
        teamAnnouncementOpen.value = false;
    })

    const closeScouting = $(() => {
        setScoutingOpen.value = false;
    })

    const closeRoster = $(() => {
        editRosterOpen.value = false;
    })

    return (
        <div class={styles['container']}>
            <div class={styles['container-title']}>The Coach Box</div>
            <div class={styles["btn-container"]}>
                <button class={styles['coach-btn']} id={styles['announcement-btn']} onClick$={() => teamAnnouncementOpen.value = true}>Send Team Announcement</button>
                <button class={styles['coach-btn']} onClick$={() => setScoutingOpen.value = true}>Set Scouting Tab</button>
                <button class={styles['coach-btn']} onClick$={() => editRosterOpen.value = true}>Edit Roster</button>
            </div>
            {teamAnnouncementOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => closeAnnouncement()}>X</div>
                    <h2 q:slot='title'>Team Announcment</h2>
                    <TeamAnnouncement q:slot="content" close={closeAnnouncement} />
                </Modal>
            }
            {setScoutingOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => closeScouting()}>X</div>
                    <h2 q:slot="title">Scouting Tab</h2>
                    <ScoutingModal q:slot="content" close={closeScouting} />
                </Modal>
            }
            {editRosterOpen.value &&
                <Modal>
                    <div q:slot='close-modal' onClick$={() => closeRoster()}>X</div>
                    <h2 q:slot="title">Edit Roster</h2>
                    <EditRoster q:slot="content" close={closeRoster} />
                </Modal>
            }
        </div>
    )
})

export default CoachTab