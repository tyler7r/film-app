import { PropFunction, component$ } from "@builder.io/qwik";
import Modal from "../modal";

interface CreateTeamTypes {
  close: PropFunction<() => void>;
}

const CreateTeam = component$((props: CreateTeamTypes) => {
  const { close } = props;

  return (
    <Modal>
      <div q:slot="close-modal" onClick$={() => close()}>
        X
      </div>
      <h2 q:slot="title">Create New Team</h2>
      <div q:slot="content">Content Page</div>
    </Modal>
  );
});

export default CreateTeam;
