import type { QRL} from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import styles from "./clip-note.module.css";
import { Button } from "../button";
import mockData from "../../../data/db.json";

interface PropTypes {
  close: QRL<() => void>;
}

const ClipNote = component$((props: PropTypes) => {
  const { close } = props;

  const comment = useSignal("");

  const submitComment = $(() => {
    if (comment.value !== "") {
      // post logic here
      comment.value = "";
    }
    close();
  });

  const plays = mockData.plays;
  const play = plays.find((play) => play.id === "p1");

  return (
    <div class={styles["container"]}>
      <div class={styles["close"]} onClick$={() => close()}>
        X
      </div>
      <h2 class={styles["title"]}>Clip</h2>
      <div class={styles["play-container"]}>
        <div class={styles["play-author"]}>Author: {play?.author}</div>
        <div class={styles["play-note"]}>{play?.note}</div>
        <form
          class="form-container"
          preventdefault: submit
          onSubmit$={submitComment}
        >
          <label class="input-container" id={styles["comment-container"]}>
            <div class="input-title">Comment</div>
            <textarea bind: value={comment} />
          </label>
          {comment.value !== "" && (
            <Button id={styles["button"]}>Submit</Button>
          )}
        </form>
      </div>
    </div>
  );
});

export default ClipNote;
