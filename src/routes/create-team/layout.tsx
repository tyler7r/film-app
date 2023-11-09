import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  type Signal,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import PageTitle from "~/components/page-title";
import styles from "./create-team.module.css";

export const CreateTeamIdContext =
  createContextId<Signal<number>>("create-team-id");

const CreateTeam = component$(() => {
  const createTeamId = useSignal(0);
  // const user = useContext(UserSessionContext);

  // useVisibleTask$(async () => {
  //   const { data } = await supabase.auth.getUser();
  //   if (data.user) {
  //     user.email = data.user.email;
  //     user.isLoggedIn = true;
  //     user.teamId = data.user.user_metadata.team_id;
  //     user.userId = data.user.id;
  //   } else {
  //     user.email = "";
  //     user.isLoggedIn = false;
  //     user.teamId = null;
  //     user.userId = "";
  //   }
  // });

  useContextProvider(CreateTeamIdContext, createTeamId);
  return (
    <div class={styles["container"]}>
      <PageTitle>Create New Team</PageTitle>
      <Slot />
    </div>
  );
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
