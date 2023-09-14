import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './modal.css?inline'

const Modal = component$(() => {
    useStylesScoped$(styles)

    return (
        <div class='modal-overlay'>
            <div class='modal'>
                <div class='modal-title'>
                    <Slot name='title' />
                </div>
                <div class='modal-content'>
                    <Slot name='content' />
                </div>
            </div>
        </div>
    )
})

export default Modal