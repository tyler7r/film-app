import { component$ } from "@builder.io/qwik";
import styles from './scouting.module.css'

interface PropTypes {
    close: () => void,
}

const ScoutingModal = component$((props: PropTypes) => {
    const { close } = props;

    return (
        <div>
            
        </div>
    )
})

export default ScoutingModal