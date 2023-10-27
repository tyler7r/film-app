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
import { UserSessionContext } from "~/routes/layout";
import { validateTeamSelect } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { type MessageType, type TeamType } from "~/utils/types";
import styles from "./team-select.module.css";

export let teamList: TeamType[] = [];

export const useGetTeams = routeLoader$(async () => {
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
  // const teamId = useContext(TeamContext).teamId;
  const nav = useNavigate();
  const teams = useGetTeams();
  const isValidForm = useSignal(false);
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const info = useStore({
    hasTeam: false,
    teamName: "",
    teamSelect: 0,
  });

  // Check if user has a team affiliation
  const checkTeamAffiliation = $(async () => {
    // Add user info and teamId to store if the user exist
    const teamId = user.teamId;
    if (teamId) {
      info.hasTeam = true;

      // Update user's team data for rendering
      const team = await supabase
        .from("teams")
        .select()
        .eq("id", teamId)
        .single();
      if (team.data) {
        info.teamName = `${team.data.city} ${team.data.name}`;
      }
    }
  });

  // Run team affiliation check on mount
  useVisibleTask$(({ track }) => {
    track(() => user.teamId);
    checkTeamAffiliation();
  });

  // Action for user requesting to join a team from dropdown menu
  const submitRequest = $(async () => {
    // Check for blank team select
    const isTeamSelected = validateTeamSelect(info.teamSelect);
    if (isTeamSelected) {
      // Add user email to team members' request
      const team = teams.value.find((team) => team.id === info.teamSelect);
      let requests = team?.member_requests;

      // Handle request depending on team's request state, ie: empty or full
      if (requests) {
        requests.push(`${user.email}`);
      } else {
        requests = [`${user.email}`];
      }

      // Update team's requests to include user's email
      const { data, error } = await supabase
        .from("teams")
        .update({ member_requests: requests })
        .eq("id", `${info.teamSelect}`)
        .select()
        .single();
      if (data) {
        isValidForm.value = true;
        message.message = `Success. Your join request was sent to ${data.city} ${data.name}`;
        message.status = "success";
      } else {
        isValidForm.value = false;
        message.message =
          "There was an issue sending a request to your team. " + error.message;
      }
    }

    // Give time for user to see message before page change and redirect to home page
    setTimeout(async () => {
      await nav("/");
    }, 1000);
  });

  const finishAccount = $(async () => {
    message.message = "You have successfully created an account!";
    message.status = "success";
    setTimeout(async () => {
      await nav("/");
    }, 1000);
  });

  return (
    <>
      <h2 class={styles["page-title"]}>Join a Team!</h2>
      {!info.hasTeam && (
        <>
          <form
            preventdefault:submit
            onSubmit$={submitRequest}
            class={styles["form-container"]}
          >
            <>
              <div class={styles["select-team-msg"]}>
                Select a team to send a request to join their account.
              </div>
              <Resource
                value={teams}
                onPending={() => <div>Loading...</div>}
                onResolved={(teams) => (
                  <select
                    onInput$={(e) => {
                      info.teamSelect = Number(
                        (e.target as HTMLInputElement).value,
                      );
                    }}
                  >
                    <option value={0} selected>
                      Select your team
                    </option>
                    {teams.map((team: TeamType) => (
                      <option
                        value={team.id}
                        key={team.id}
                      >{`${team.city} ${team.name}`}</option>
                    ))}
                  </select>
                )}
              />
            </>
            <FormMessage message={message} />
            {info.teamSelect === 0 ? (
              <Button disabled={isValidForm.value}>
                Continue without Team Affiliation
              </Button>
            ) : (
              <Button disabled={isValidForm.value}>Finish Account</Button>
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
        </>
      )}
      {info.hasTeam && (
        <div class={styles["already-registered"]}>
          <div class={styles["registered-msg"]}>
            Your email is registered with {info.teamName}
          </div>
          <Button onClick$={() => finishAccount()}>Finish Account</Button>
        </div>
      )}
    </>
  );
});

export default TeamSelect;
