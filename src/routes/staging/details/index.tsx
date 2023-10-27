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
import { validateName } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { type MessageType } from "~/utils/types";
import styles from "./details.module.css";

const ProfileDetails = component$(() => {
  const user = useContext(UserSessionContext);
  const nav = useNavigate();
  const isValidForm = useSignal(true);
  const details = useStore({ name: "", role: "" });
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });

  // Validate form entries
  useTask$(({ track }) => {
    track(() => {
      details.name;
      details.role;
    });
    const isValidName = validateName(details.name);
    if (details.role === "") {
      isValidForm.value = false;
      message.message = "You must select a role.";
    } else if (!isValidName) {
      isValidForm.value = false;
      message.message = "You must enter a valid name.";
    } else {
      message.message = undefined;
      isValidForm.value = true;
    }
  });

  const submit = $(async () => {
    // Update user profile with entered details
    const { error } = await supabase
      .from("profiles")
      .update({ name: details.name, role: details.role })
      .eq("id", user.userId);
    if (error) {
      message.message =
        "There was a problem adding your name and role. " + error.message;
    } else {
      message.message = "Successfully added your name and role!";
      message.status = "success";
      setTimeout(async () => {
        await nav("/staging/password");
      }, 1000);
    }
  });

  return (
    <form
      onSubmit$={submit}
      preventdefault:submit
      class={styles["form-container"]}
    >
      <h2 class={styles["page-title"]}>Account Details</h2>
      <label class={styles["signup-input"]} id={styles["radio-container"]}>
        <div class={styles["radio-title"]}>Choose Your Role</div>
        <div class={styles["radio-inputs"]}>
          <div class={styles["radio"]}>
            <div class={styles["signup-title"]}>Player</div>
            <input
              name="role"
              type="radio"
              onInput$={(e) =>
                (details.role = (e.target as HTMLInputElement).value)
              }
              value={"player"}
            />
          </div>
          <div class={styles["radio"]}>
            <div class={styles["signup-title"]}>Coach</div>
            <input
              name="role"
              type="radio"
              onInput$={(e) =>
                (details.role = (e.target as HTMLInputElement).value)
              }
              value={"coach"}
            />
          </div>
        </div>
      </label>
      <label class={styles["signup-input"]}>
        <div class={styles["signup-title"]}>Full Name</div>
        <input
          type="text"
          onInput$={(e) =>
            (details.name = (e.target as HTMLInputElement).value)
          }
          value={details.name}
        />
      </label>
      <Button disabled={!isValidForm.value}>Continue</Button>
      <FormMessage message={message} />
    </form>
  );
});

export default ProfileDetails;
