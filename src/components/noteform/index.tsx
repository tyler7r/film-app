import type { QRL } from "@builder.io/qwik";
import { $, component$, useStore } from "@builder.io/qwik";
import { Button } from "../button";

interface NoteProps {
  close: QRL<() => void>;
}

export const NoteForm = component$((props: NoteProps) => {
  const { close } = props;

  const noteData = useStore({
    author: "User Display Name",
    message: "",
  });

  const submit = $(() => {
    // post logic here
    console.log(noteData.message);
    noteData.message = "";
    close();
  });

  return (
    <form
      preventdefault: submit
      class="form-container"
      onSubmit$={() => submit()}
    >
      <textarea
        value={noteData.message}
        placeholder="Make a note about this team that only your teammates can see"
        onInput$={(e) =>
          (noteData.message = (e.target as HTMLInputElement).value)
        }
      />
      {noteData.message !== "" && <Button>Submit</Button>}
    </form>
  );
});
