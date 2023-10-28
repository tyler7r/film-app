import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  type Signal,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import styles from "./create-team.module.css";

export const TeamIdContext = createContextId<Signal<number | null>>("team_id");

const CreateTeam = component$(() => {
  const teamId = useSignal(null);

  useContextProvider(TeamIdContext, teamId);
  return (
    <>
      <h2 class={styles["page-title"]}>Create a Team</h2>
      <Slot />
    </>
  );
});

export const head: DocumentHead = {
  title: "Film Room Create Team",
  meta: [
    {
      name: "description",
      content: "Create a team account on Film Room",
    },
  ],
};

export default CreateTeam;
