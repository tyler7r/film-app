import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import styles from './content-card.module.css'

const ContentCard = component$(
    ({ class: classProp, ...props }: QwikIntrinsicElements['div']) => {
        return (
            <div class={`${styles['content-card']} ${classProp}`} {...props}>
                <div class={styles['content-title']}>
                    <Slot name='title' />
                </div>
                <div class={styles['content']}>
                    <Slot name='content' />
                </div>
            </div>
        )
})

export default ContentCard;