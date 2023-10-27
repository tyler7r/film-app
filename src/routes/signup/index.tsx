import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import PageTitle from "~/components/page-title";
import { validateEmail } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { type MessageType } from "~/utils/types";
import styles from "./signup.module.css";

const Signup = component$(() => {
  const isValidForm = useSignal(false);
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const email = useSignal("");

  // Validate email address
  useVisibleTask$(({ track }) => {
    track(() => email.value);
    const isValidEmail = validateEmail(email.value);
    if (!isValidEmail) {
      message.message = "You must enter a valid email";
    } else {
      isValidForm.value = true;
      message.message = undefined;
    }
  });

  const submit = $(async () => {
    // Initialize resets
    message.message = undefined;
    message.status = "error";

    // Create initial random pwd
    const timestamp = Date.now();
    const pwd = `${Math.floor(Math.random() * 1000000)}${
      email.value
    }${timestamp}`;

    // Signup in Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: pwd,
      options: {
        emailRedirectTo: "http://localhost:5173/staging/details",
      },
    });

    // Confirm signup
    if (error) {
      message.message =
        "There was a problem creating the user. " + error.message;
      isValidForm.value = false;
    } else if (data.user?.identities?.length === 0) {
      message.message =
        "User already registered! Check your email for confirmation link or login";
      message.status = "warning";
      isValidForm.value = false;
    } else {
      message.message =
        "Success. Please verify your email to finish your account creation.";
      message.status = "success";
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
        <label class={styles["signup-input"]}>
          <div class={styles["signup-title"]}>Email</div>
          <input
            type="email"
            onInput$={(e) =>
              (email.value = (e.target as HTMLInputElement).value)
            }
            value={email.value}
          />
        </label>
        <Button class={styles["signup-btn"]} disabled={!isValidForm.value}>
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
