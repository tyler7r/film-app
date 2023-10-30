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
import PageTitle from "~/components/page-title";
import { UserSessionContext } from "~/root";
import { validateField } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { type MessageType } from "~/utils/types";
import styles from "../signup.module.css";

const ProfileDetails = component$(() => {
  const user = useContext(UserSessionContext);
  const nav = useNavigate();
  const isValidForm = useSignal(false);
  const details = useStore({
    name: "",
    role: "",
  });
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });

  useVisibleTask$(({ track }) => {
    // Validate form entries
    track(() => {
      details.name;
      details.role;
    });
    const isValidName = validateField(details.name);
    const isValidRole = validateField(details.role);
    if (!isValidRole) {
      message.message = "You must select a role!";
      isValidForm.value = false;
    } else if (!isValidName) {
      message.message = "You must enter a name!";
      isValidForm.value = false;
    } else {
      message.message = undefined;
      isValidForm.value = true;
    }
  });

  const submit = $(async () => {
    // Update user's account with new name and role
    const { error } = await supabase
      .from("profiles")
      .update({ name: details.name, role: details.role })
      .eq("id", user.userId);
    if (error) {
      message.message =
        "There was a problem adding your name and role. " + error.message;
      isValidForm.value = true;
    } else {
      message.message = "Successfully added name and role!";
      message.status = "success";
      isValidForm.value = false;

      // Navigate to team-select page upon success
      setTimeout(async () => {
        await nav("/signup/team-select");
      }, 1000);
    }
  });

  return (
    <div class={styles["container"]}>
      <form
        onSubmit$={submit}
        preventdefault:submit
        class={styles["form-container"]}
      >
        <PageTitle>Account Details</PageTitle>
        <label class={styles["input-container"]} id={styles["radio-container"]}>
          <div class={styles["radio-title"]}>Choose Your Role</div>
          <div class={styles["radio-inputs"]}>
            <div class={styles["radio"]}>
              <div class={styles["input-title"]}>Player</div>
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
              <div class={styles["input-title"]}>Coach</div>
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
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>Full Name</div>
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
    </div>
  );
});

export default ProfileDetails;
