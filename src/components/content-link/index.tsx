import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import styles from './content-link.module.css'

const ContentLink = component$(
    ({ class: classProp, href: href, ...props }: QwikIntrinsicElements['a']) => {
    return (
        <a class={`${styles['a']} ${classProp}`} href={href} {...props}>
            <Slot />
        </a>
    )
})

export default ContentLink