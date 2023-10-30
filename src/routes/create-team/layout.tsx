import {
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export const CreateTeamIdContext =
  createContextId<Signal<number>>("create-team-id");

const CreateTeam = component$(() => {
  const createTeamId = useSignal(0);

  useContextProvider(CreateTeamIdContext, createTeamId);
  return <Slot />;
});

export const head: DocumentHead = {
  title: "Create a New Team",
  meta: [
    {
      name: "description",
      content: "Collaboratively upload, watch, and review film.",
    },
  ],
};

export default CreateTeam;
