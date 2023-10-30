import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { UserSessionContext } from "~/root";
import { divisions } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { CreateTeamIdContext } from "../layout";

const CreateTeamDetails = component$(() => {
  const createTeamId = useContext(CreateTeamIdContext);
  const user = useContext(UserSessionContext);
  const nav = useNavigate();
  const isValidForm = useSignal(false);
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const details = useStore({
    city: "",
    name: "",
    division: "",
  });

  // Check for valid form entries
  useVisibleTask$(({ track }) => {
    track(() => {
      details.name;
      details.city;
      details.division;
    });
    if (details.city === "") {
      message.message = "Must enter a city.";
      isValidForm.value = false;
    } else if (details.name === "") {
      message.message = "Must enter a team name.";
      isValidForm.value = false;
    } else if (details.division === "") {
      message.message = "Must select a division.";
      isValidForm.value = false;
    } else {
      message.message = undefined;
      isValidForm.value = true;
    }
  });

  // Validate that the created team is valid
  const validateUniqueTeam = $(async () => {
    const { error } = await supabase
      .from("teams")
      .select()
      .match({
        name: details.name,
        city: details.city,
        division: details.division,
      })
      .single();
    if (error) return true;
  });

  const submit = $(async () => {
    isValidForm.value = false;
    const isValidTeam = await validateUniqueTeam();
    if (isValidTeam) {
      const { data, error } = await supabase
        .from("teams")
        .insert({
          name: details.name,
          city: details.city,
          division: details.division,
          owner: user.userId,
        })
        .select()
        .single();

      // Assign teamId context the newly created team's id
      if (data) {
        createTeamId.value = data.id;
        user.teamId = data.id;
        // Update user's profile to include the team id
        await supabase
          .from("profiles")
          .update({ team_id: data.id })
          .eq("id", user.userId);
        setTimeout(async () => {
          await nav("/create-team/logo");
        }, 1000);
      } else {
        message.message =
          "There was a problem creating the new team. " + error.message;
        isValidForm.value = true;
      }
    } else {
      message.message = "There is already a team account with these details.";
      message.status = "warning";
      isValidForm.value = true;
    }
  });
  return (
    <form preventdefault:submit onSubmit$={submit} class="form-container">
      <label class="input-container">
        <div class="input-title">City</div>
        <input
          type="text"
          onInput$={(e) => {
            details.city = (e.target as HTMLInputElement).value;
          }}
          value={details.city}
        />
      </label>
      <label class="input-container">
        <div class="input-title">Name</div>
        <input
          type="text"
          onInput$={(e) =>
            (details.name = (e.target as HTMLInputElement).value)
          }
          value={details.name}
        />
      </label>
      <select
        class={styles["select-menu"]}
        onInput$={(e) =>
          (details.division = (e.target as HTMLInputElement).value)
        }
      >
        <option value="" disabled selected>
          Team's division
        </option>
        {divisions.map((division: string) => (
          <option value={division} key={division}>
            {division}
          </option>
        ))}
      </select>
      <Button disabled={!isValidForm.value}>Next</Button>
      <FormMessage message={message} />
      <a href="/signup/team-select" class={styles["go-back"]}>
        Back to Team Select
      </a>
    </form>
  );
});

export default CreateTeamDetails;
