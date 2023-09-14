import { PropFunction, Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './modal.css?inline'
import { Button } from "../button";

interface ModalProps {
    close: PropFunction<() => void>,
}

const Modal = component$((props: ModalProps) => {
    const { close } = props;
    useStylesScoped$(styles)

    return (
        <div class='modal-overlay'>
            <div class='modal'>
                <button class='close' onClick$={close}>X</button>
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