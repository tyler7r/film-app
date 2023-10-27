import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { UserSessionContext } from "~/routes/layout";
import { supabase } from "~/utils/supabase";
import { type MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { TeamIdContext } from "../layout";

// Make a new faux user (w/email and team_id already attached) after you create a team

export const divisions = [
  "Open",
  "Women's",
  "Mixed",
  "AUDL",
  "PUL",
  "WUL",
  "D1 College Men's",
  "D1 College Women's",
  "D3 College Men's",
  "D3 College Women's",
];

const CreateTeamDetails = component$(() => {
  const teamId = useContext(TeamIdContext);
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

  // Validate form entries
  useTask$(({ track }) => {
    track(() => {
      details.city;
      details.name;
      details.division;
    });
    if (details.city === "") {
      message.message = "Must enter a city!";
      isValidForm.value = false;
    } else if (details.name === "") {
      message.message = "Must enter a team name!";
      isValidForm.value = false;
    } else if (details.division === "") {
      message.message = "Must select a team division!";
      isValidForm.value = false;
    } else {
      message.message = undefined;
      isValidForm.value = true;
    }
  });

  // Double check that the user is creating a new team
  const validateUniqueTeam = $(async () => {
    const { data } = await supabase
      .from("teams")
      .select()
      .match({
        name: details.name,
        city: details.city,
        division: details.division,
      })
      .single();
    if (data) return false;
    else return true;
  });

  const submit = $(async () => {
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
        teamId.value = data.id;
        user.teamId = data.id;
        // Update user's profile to include team_id
        await supabase
          .from("profiles")
          .update({ team_id: data.id })
          .eq("id", user.userId);
        await nav("/create-team/logo");
      } else {
        message.message =
          "There was a problem creating team account. " + error.message;
      }
    } else {
      message.message = "There is already a team account with these details!";
    }
  });
  return (
    <form
      preventdefault:submit
      onSubmit$={submit}
      class={styles["form-container"]}
    >
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>City</div>
        <input
          type="text"
          onInput$={(e) => {
            details.city = (e.target as HTMLInputElement).value;
          }}
          value={details.city}
        />
      </label>
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>Name</div>
        <input
          type="text"
          onInput$={(e) =>
            (details.name = (e.target as HTMLInputElement).value)
          }
          value={details.name}
        />
      </label>
      <select
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
    </form>
  );
});

export default CreateTeamDetails;
