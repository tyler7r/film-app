import {
  $,
  Resource,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { validateTeamSelect } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType, TeamType } from "~/utils/types";
import styles from "./team-select.module.css";

export const useGetTeams = routeLoader$(async () => {
  const { data, error } = await supabase.from("teams").select();
  return data as TeamType[];
});

const TeamSelect = component$(() => {
  const nav = useNavigate();
  const teams = useGetTeams();
  const isLoading = useSignal(false);
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const info: {
    teamName: string;
    hasTeam: boolean;
    teamId: number | null;
    userId: number | null;
    userEmail: string | null;
  } = useStore({
    teamName: "",
    hasTeam: false,
    teamId: null,
    userId: null,
    userEmail: null,
  });

  const checkTeamAffiliation = $(async () => {
    // Check if user has a team affiliation
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Add user info and teamId to store if the user exists
    if (user) {
      info.userId = Number(user.id);
      info.userEmail = `${user.email}`;
      const teamId = user.user_metadata.team_id;
      if (teamId) {
        info.hasTeam = true;

        // Update team data
        const team = teams.value.find((team) => team.id === teamId);
        if (team) {
          info.teamId = team.id;
          info.teamName = `${team.city} ${team.name}`;
        }
      }
    }
  });

  // Run team affiliation check on Mount
  useVisibleTask$(async () => {
    await checkTeamAffiliation();
  });

  const submit = $(async () => {
    // Check for blank team select
    const isTeamSelected = validateTeamSelect(info.teamId);
    if (isTeamSelected) {
      // Add user email to team members' request
      const team = teams.value.find((team) => team.id === info.teamId);
      let requests = team?.member_requests;

      // Handle request depending on team's request state, ie: empty or full
      if (requests) {
        requests.push(`${info.userEmail}`);
      } else {
        requests = [`${info.userEmail}`];
      }

      // Update team's requests to include user's email
      const { data, error } = await supabase
        .from("teams")
        .update({ member_requests: requests })
        .eq("id", `${info.teamId}`)
        .select()
        .single();
      if (data && !error) {
        isLoading.value = true;
        message.message = `Success. Your join request was sent to ${data.city} ${data.name}`;
        message.status = "success";
      } else {
        isLoading.value = true;
        message.message =
          "There was an issue sending a request to your team. " + error.message;
      }
    }

    // Give time for user to see message before page change
    setTimeout(async () => {
      await nav("/");
    }, 1000);
  });

  return (
    <>
      <h2 class={styles["page-title"]}>Join a Team!</h2>
      <form
        preventdefault:submit
        onSubmit$={submit}
        class={styles["form-container"]}
      >
        {info.hasTeam && (
          <div>Your email is registered with {info.teamName}</div>
        )}
        {!info.hasTeam && (
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
                    info.teamId = Number((e.target as HTMLInputElement).value);
                  }}
                >
                  <option value={0} selected>
                    Select your team
                  </option>
                  {teams &&
                    teams.map((team: TeamType) => (
                      <option
                        value={team.id}
                        key={team.id}
                      >{`${team.city} ${team.name}`}</option>
                    ))}
                </select>
              )}
            />
            <div class={styles["create-team-msg"]}>
              <div>Don't see your team?</div>
              <div
                class={styles["create-team"]}
                onClick$={async () => await nav("/staging/create-team")}
              >
                Create your team now!
              </div>
            </div>
          </>
        )}
        <FormMessage message={message} />
        {info.teamId === null || info.teamId === 0 ? (
          <Button disabled={isLoading.value}>
            Continue without Team Affiliation
          </Button>
        ) : (
          <Button disabled={isLoading.value}>Continue</Button>
        )}
      </form>
    </>
  );
});

export default TeamSelect;
