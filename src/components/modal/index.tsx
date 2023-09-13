import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './modal.module.css?inline'
import { Button } from "../button";

interface ModalProps {
    close: () => void,
}

export default component$((props: ModalProps) => {
    const { close } = props;
    useStylesScoped$(styles)

    return (
        <div class='content'>
            <div class={`modal`}>
                <Button class='close' onClick$={close}>Close</Button>
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