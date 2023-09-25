import type { QRL} from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { Button } from "../button";

interface PropTypes {
  close: QRL<() => void>;
}

const ScoutingModal = component$((props: PropTypes) => {
  const { close } = props;
  const nextOpponent = useSignal("");
  const lastGame = useSignal("");

  const submit = $(() => {
    //post logic here
    close();
  });

  return (
    <form class="form-container" preventdefault: submit onSubmit$={submit}>
      <label class="input-container">
        <div class="input-title">Next Opponent</div>
        <input
          type="text"
          placeholder="No next opponent..."
          bind: value={nextOpponent}
        />
      </label>
      <label class="input-container">
        <div class="input-title">Game to Watch</div>
        <input
          type="text"
          placeholder="No suggested game to watch..."
          bind: value={lastGame}
        />
      </label>
      <Button>Submit</Button>
    </form>
  );
});

export default ScoutingModal;
