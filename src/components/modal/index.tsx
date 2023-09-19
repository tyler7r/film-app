import { Slot, component$ } from "@builder.io/qwik";
import styles from './modal.module.css'

const Modal = component$(() => {
    return (
        <div class={styles['modal-overlay']}>
            <div class={styles['modal']}>
                <div class={styles['close']}>
                    <Slot name='close-modal' />
                </div>
                <div class={styles['modal-title']}>
                    <Slot name='title' />
                </div>
                <div class={styles['modal-content']}>
                    <Slot name='content' />
                </div>
            </div>
        </div>
    )
})

export default Modal