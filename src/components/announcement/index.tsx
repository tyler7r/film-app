import type { QRL} from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { Button } from "../button";

interface PropTypes {
  close: QRL<() => void>;
}

const TeamAnnouncement = component$((props: PropTypes) => {
  const { close } = props;
  const announcement = useSignal("");

  const submit = $(() => {
    //post logic here
    close();
  });

  return (
    <form preventdefault: submit onSubmit$={submit} class="form-container">
      <textarea
        bind: value={announcement}
        placeholder="Write an announcement that will be sent to all team member's inbox"
      />
      {announcement.value !== "" && <Button>Send</Button>}
    </form>
  );
});

export default TeamAnnouncement;
