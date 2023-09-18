import { Slot, component$ } from "@builder.io/qwik";
import styles from './film-home.module.css'
import Modal from "~/components/modal";

export default component$(() => {
    return (
        <div class='content'>
            <Slot />
        </div>
    )
})