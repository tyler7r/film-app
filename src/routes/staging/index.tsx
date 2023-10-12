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
import CreateTeam from "~/components/create-team";
import FormMessage from "~/components/form-message";
import { validatePwdMatch } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType, type TeamType } from "~/utils/types";
import styles from "./staging.module.css";

export const useGetTeams = routeLoader$(async () => {
  const { data } = await supabase.from("teams").select();
  const result = data;
  return result as TeamType[];
});

const Staging = component$(() => {
  const nav = useNavigate();
  const teams = useGetTeams();
  const isLoading = useSignal(false);
  const createTeamModal = useSignal(false);
  const info = useStore({
    password: "",
    confirmPwd: "",
    selectTeam: "",
    hasTeam: false,
    teamName: "",
  });
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });

  const checkTeamAffiliation = $(async () => {
    // Check if user has a team affiliation
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const teamId = user?.user_metadata.team_id;
    if (teamId) {
      info.hasTeam = true;

      // Update team data
      const team = teams.value.find((team) => team.id === teamId);
      info.teamName = `${team?.city} ${team?.name}`;
    }
  });

  // Run team affiliation check on Mmunt
  useVisibleTask$(async () => {
    await checkTeamAffiliation();
  });

  // Close create team modal logic
  const closeCreateTeam = $(() => {
    createTeamModal.value = false;
  });

  // Submit form data
  const submit = $(async () => {
    // Validate passwords match
    const validatePwd = validatePwdMatch(info.password, info.confirmPwd);
    if (!validatePwd) {
      message.message = "Passwords do not match!";
      return;
    }
    // Update user password if matches
    const { data, error } = await supabase.auth.updateUser({
      password: `${info.password}`,
    });

    // Confirm form submit
    if (data && !error) {
      message.message = "Successfully updated password";
      message.status = "success";
      await nav("/login");
    } else {
      message.message =
        "There was an error updating the user account. " + error?.message;
      return;
    }
  });

  return (
    <form
      preventdefault:submit
      onSubmit$={submit}
      class={styles["form-container"]}
    >
      <h1 class={styles["page-title"]}>Finish Your Account!</h1>
      {info.hasTeam && <div>Your email is registerd with {info.teamName}</div>}
      {!info.hasTeam && (
        <>
          <Resource
            value={teams}
            onPending={() => <div>Loading...</div>}
            onResolved={(teams) => (
              <select
                onInput$={(e) =>
                  (info.selectTeam = (e.target as HTMLInputElement).value)
                }
              >
                <option value="" disabled selected>
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
              onClick$={() => (createTeamModal.value = true)}
            >
              Create your team's account now!
            </div>
          </div>
          {createTeamModal.value && <CreateTeam close={closeCreateTeam} />}
        </>
      )}
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>Password</div>
        <input
          type="password"
          onInput$={(e) =>
            (info.password = (e.target as HTMLInputElement).value)
          }
          value={info.password}
        />
      </label>
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>Confirm Password</div>
        <input
          type="password"
          onInput$={(e) =>
            (info.confirmPwd = (e.target as HTMLInputElement).value)
          }
          value={info.confirmPwd}
        />
      </label>
      <FormMessage message={message} />
      <Button disabled={isLoading.value}>Submit</Button>
    </form>
  );
});

export default Staging;
