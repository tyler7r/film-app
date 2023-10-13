import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import PageTitle from "~/components/page-title";
import { validateEmail, validateName } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import styles from "./signup.module.css";

const Signup = component$(() => {
  const isLoading = useSignal(false);
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const info = useStore({
    name: "",
    email: "",
    role: "",
  });

  const checkIfTeamAffiliated = $(async () => {
    // Check if email exists in any team member email array
    const { data, error } = await supabase
      .from("teams")
      .select("id")
      .contains("member_emails", [info.email])
      .single();
    if (data && !error) {
      return data.id;
    } else {
      return null;
    }
  });

  const submit = $(async () => {
    // Initialize resets
    isLoading.value = true;
    message.message = undefined;
    message.status = "error";

    // Validate name
    const isValidName = validateName(info.name);
    if (!isValidName) {
      message.message = "You must enter a valid name.";
      isLoading.value = false;
      return;
    }

    // Validate email
    const isValidEmail = validateEmail(info.email);
    if (!isValidEmail) {
      message.message = "You must enter a valid email.";
      isLoading.value = false;
      return;
    }

    // Validate role
    if (info.role === "") {
      message.message = "You must select a role";
      isLoading.value = false;
      return;
    }

    // Create initial random pwd
    const timestamp = Date.now();
    const pwd = `${Math.floor(Math.random() * 1000000)}${
      info.email
    }${timestamp}`;

    const userTeam = await checkIfTeamAffiliated();

    // Signup in Supabase
    const { data, error } = await supabase.auth.signUp({
      email: info.email,
      password: pwd,
      options: {
        emailRedirectTo: "http://localhost:5173/staging/password",
        data: {
          name: info.name,
          role: info.role,
          team_id: userTeam,
        },
      },
    });

    // Confirm signup
    if (error) {
      message.message =
        "There was a problem creating the user. " + error.message;
      isLoading.value = false;
    } else if (data.user?.identities?.length === 0) {
      message.message =
        "User already registered! Check your email for confirmation link or login";
      message.status = "warning";
      isLoading.value = false;
    } else {
      message.message =
        "Success. Please verify your email to finish your account creation.";
      message.status = "success";

      // add team_id to profile
      const { error } = await supabase
        .from("profiles")
        .update({ team_id: userTeam })
        .eq("id", `${data.user?.id}`);
      if (error) {
        message.message =
          "There was an error processing user information " + error;
        return;
      }
    }
  });

  return (
    <div class={styles["signup-container"]}>
      <PageTitle>Sign Up!</PageTitle>
      <form
        class={styles["signup-form"]}
        preventdefault:submit
        onSubmit$={submit}
      >
        <label class={styles["signup-input"]} id={styles["radio-container"]}>
          <div class={styles["radio-inputs"]}>
            <div class={styles["radio"]}>
              <div class={styles["signup-title"]}>Player</div>
              <input
                name="role"
                type="radio"
                onInput$={(e) =>
                  (info.role = (e.target as HTMLInputElement).value)
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
                  (info.role = (e.target as HTMLInputElement).value)
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
            onInput$={(e) => (info.name = (e.target as HTMLInputElement).value)}
            value={info.name}
          />
        </label>
        <label class={styles["signup-input"]}>
          <div class={styles["signup-title"]}>Email</div>
          <input
            type="email"
            onInput$={(e) =>
              (info.email = (e.target as HTMLInputElement).value)
            }
            value={info.email}
          />
        </label>
        <Button class={styles["signup-btn"]} disabled={isLoading.value}>
          Sign Up
        </Button>
      </form>
      <FormMessage message={message} />
      <div class={styles["account-container"]}>
        <div>Already have an account?</div>
        <a href="/login" class={styles["account-link"]}>
          Login!
        </a>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Film Room Signup",
  meta: [
    {
      name: "description",
      content: "Sign up for a film room account",
    },
  ],
};

export default Signup;
