import type { QRL } from "@builder.io/qwik";
import { $, component$, useStore } from "@builder.io/qwik";
import { Button } from "../button";
import styles from "./create-note.module.css";

interface PropTypes {
  endClip: QRL<() => void>;
  close: QRL<() => void>;
}

const CreateNote = component$((props: PropTypes) => {
  const { endClip, close } = props;

  const formData = useStore({
    note: "",
    keywords: "",
  });

  const submitNote = $(() => {
    //post logic here
    close();
    endClip();
  });

  const closeNote = $(() => {
    close();
    endClip();
  });

  return (
    <div class={styles["container"]}>
      <div class={styles["close"]} onClick$={() => closeNote()}>
        X
      </div>
      <h2 class={styles["title"]}>Create Note</h2>
      <form
        class={styles["form-container"]}
        preventdefault: submit
        onSubmit$={submitNote}
      >
        <label class="input-container">
          <div class="input-title">Note</div>
          <textarea
            onInput$={(e) =>
              (formData.note = (e.target as HTMLInputElement).value)
            }
            value={formData.note}
          />
        </label>
        <label class="input-container">
          <div class="input-title">Keywords</div>
          <input
            type="text"
            onInput$={(e) =>
              (formData.keywords = (e.target as HTMLInputElement).value)
            }
            value={formData.keywords}
          />
        </label>
        {(formData.keywords !== "" || formData.note !== "") && (
          <Button id={styles["button"]}>Save</Button>
        )}
      </form>
    </div>
  );
});

export default CreateNote;
