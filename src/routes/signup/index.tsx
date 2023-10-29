import { $, component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form-message";
import PageTitle from "~/components/page-title";
import { MessageType } from "~/utils/helpers";
import styles from "./signup.module.css";

const Signup = component$(() => {
  const message: MessageType = { message: undefined, status: "error" };
  const info = useStore({
    name: "",
    email: "",
  });

  const submit = $(() => {
    console.log(info.name);
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
        <FormMessage message={message} />
        <Button class={styles["signup-btn"]}>Sign Up</Button>
      </form>
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
