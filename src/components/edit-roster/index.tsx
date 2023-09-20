import { component$ } from "@builder.io/qwik";
import styles from './edit-roster.module.css'

interface PropTypes {
    close: () => void,
}

const EditRoster = component$((props: PropTypes) => {
    const { close } = props;
    
    return (
        <div>

        </div>
    )
})

export default EditRoster