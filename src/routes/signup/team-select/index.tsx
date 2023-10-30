import {
  $,
  Resource,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import PageTitle from "~/components/page-title";
import { UserSessionContext } from "~/root";
import { validateTeamSelect } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { type MessageType, type TeamType } from "~/utils/types";
import styles from "../signup.module.css";

export let teamList: TeamType[] = [];

export const useGetTeams = routeLoader$(async () => {
  const { data } = await supabase.from("teams").select();
  if (data) {
    teamList = data;
  }
  // Realtime updates in order to get accurate team list
  supabase
    .channel("team_db_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "teams",
      },
      async () => {
        const { data } = await supabase.from("teams").select();
        if (data) {
          teamList = data;
        }
      },
    )
    .subscribe();
  return teamList;
});

const TeamSelect = component$(() => {
  const user = useContext(UserSessionContext);
  const nav = useNavigate();
  const teams = useGetTeams();
  const isLoading = useSignal(false);
  const isTeamSelected = useSignal(false);
  const teamSelect = useSignal(0);
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });

  useVisibleTask$(({ track }) => {
    track(() => teamSelect.value);
    const teamIsSelected = validateTeamSelect(teamSelect.value);
    if (teamIsSelected) {
      isTeamSelected.value = true;
    } else {
      isTeamSelected.value = false;
    }
  });

  // Submit action when team is selected
  const submitRequest = $(async () => {
    // Set disable submit button temporarily
    isLoading.value = true;
    // Add user email to team member's requests
    const team = teams.value.find((team) => team.id === teamSelect.value);
    let requests = team?.member_requests;

    // Handle request depending on team's request state, empty or occupied
    if (requests) {
      requests.push(`${user.email}`);
    } else {
      requests = [`${user.email}`];
    }

    // Update team's requests
    const { data, error } = await supabase
      .from("teams")
      .update({ member_requests: requests })
      .eq("id", teamSelect.value)
      .select()
      .single();
    if (data) {
      message.message = `Successfully sent join request to ${data.city} ${data.name}!`;
      message.status = "success";
      setTimeout(async () => {
        await nav("/");
      }, 1000);
    } else {
      message.message = `There was an issue sending your request to your team. ${error.message}`;
      message.status = "error";
      isLoading.value = false;
    }
  });

  // Submit action when no team is selected
  const noTeamSubmit = $(async () => {
    isLoading.value = true;
    message.message = "You have successfully created an account!";
    message.status = "success";
    setTimeout(async () => {
      await nav("/");
    }, 1000);
  });

  return (
    <div class={styles["container"]}>
      <PageTitle>Select Your Team!</PageTitle>
      <form
        preventdefault:submit
        onSubmit$={isTeamSelected.value ? submitRequest : noTeamSubmit}
        class={styles["form-container"]}
      >
        <Resource
          value={teams}
          onPending={() => <div>Loading...</div>}
          onResolved={(teams) => (
            <select
              class={styles["select-menu"]}
              onInput$={(e) =>
                (teamSelect.value = Number(
                  (e.target as HTMLInputElement).value,
                ))
              }
            >
              <option class={styles["option-input"]} value={0} selected>
                Select your team
              </option>
              {teams.length !== 0 &&
                teams.map((team: TeamType) => (
                  <option
                    class={styles["option-input"]}
                    value={team.id}
                    key={team.id}
                  >{`${team.city} ${team.name}`}</option>
                ))}
            </select>
          )}
        />
        <FormMessage message={message} />
        {teamSelect.value === 0 ? (
          <Button disabled={isLoading.value}>
            Finish without Team Affiliation
          </Button>
        ) : (
          <Button disabled={isLoading.value}>Finish Account</Button>
        )}
      </form>
      <div class={styles["create-team-msg"]}>
        <div>Don't see your team?</div>
        <div
          class={styles["create-team"]}
          onClick$={async () => await nav("/create-team/details")}
        >
          Create your team now!
        </div>
      </div>
    </div>
  );
});

export default TeamSelect;
