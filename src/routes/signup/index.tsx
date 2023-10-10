import { $, component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import PageTitle from "~/components/page-title";
import styles from "./signup.module.css";

const Signup = component$(() => {
  const info = useStore({
    name: "",
    // username: "",
    email: "",
    // teamAffiliation: "",
    // affiliationPwd: "",
    // role: "",
  });

  const submit = $(() => {
    console.log(info);
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
        {/* <label class={styles["signup-input"]}>
          <div class={styles["signup-title"]}>Username</div>
          <input
            type="text"
            onInput$={(e) =>
              (info.username = (e.target as HTMLInputElement).value)
            }
            value={info.username}
          />
        </label> */}
        {/* <label class={styles["signup-input"]} id={styles["radio-container"]}>
          <div class={styles["radio-title"]}>Role</div>
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
        </label> */}
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
