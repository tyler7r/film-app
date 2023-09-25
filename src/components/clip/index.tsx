import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import styles from "./clip.module.css";

interface PropTypes {
  open: () => void;
  note: string;
}

const Clip = component$((props: PropTypes) => {
  const { open, note } = props;

  return (
    <div onClick$={() => open()} class={`${styles["clip"]}`}>
      {note}
    </div>
  );
});

export default Clip;
