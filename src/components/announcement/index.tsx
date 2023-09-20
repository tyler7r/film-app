import { component$ } from "@builder.io/qwik";
import styles from './announcement.module.css'

interface PropTypes {
    close: () => void,
}

const TeamAnnouncement = component$((props: PropTypes) => {
    const { close } = props;
    
    return (
        <div>

        </div>
    )
})

export default TeamAnnouncement