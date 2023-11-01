import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import PageTitle from "~/components/page-title";
import { validateEmail } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { type MessageType } from "~/utils/types";
import styles from "./login.module.css";

const Login = component$(() => {
  const nav = useNavigate();
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const isValidForm = useSignal(false);
  const info = useStore({
    email: "",
    password: "",
  });

  useVisibleTask$(({ track }) => {
    track(() => {
      info.email;
      info.password;
    });
    const isValidEmail = validateEmail(info.email);
    if (!isValidEmail) {
      message.message = "Please enter email!";
      isValidForm.value = false;
    } else if (info.password === "") {
      message.message = "Please enter your password!";
      isValidForm.value = false;
    } else {
      message.message = undefined;
      isValidForm.value = true;
    }
  });

  const submit = $(async () => {
    isValidForm.value = false;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: info.email,
      password: info.password,
    });
    if (data.user) {
      message.message = "Signed In!";
      message.status = "success";
      setTimeout(async () => await nav("/"), 1000);
    } else if (error) {
      message.message = "There was a problem logging in: " + error.message;
      isValidForm.value = true;
    } else {
      message.message = "No account found with that username and password.";
      isValidForm.value = true;
    }
  });

  return (
    <div class={styles["login-container"]}>
      <PageTitle>Login!</PageTitle>
      <form
        class={styles["login-form"]}
        preventdefault:submit
        onSubmit$={submit}
      >
        <label class={styles["login-input"]}>
          <div class={styles["login-title"]}>Email</div>
          <input
            type="email"
            onInput$={(e) =>
              (info.email = (e.target as HTMLInputElement).value)
            }
            value={info.email}
          />
        </label>
        <label class={styles["login-input"]}>
          <div class={styles["login-title"]}>Password</div>
          <input
            type="password"
            onInput$={(e) =>
              (info.password = (e.target as HTMLInputElement).value)
            }
            value={info.password}
          />
        </label>
        <Button disabled={!isValidForm.value} class={styles["login-btn"]}>
          Login
        </Button>
        <FormMessage message={message} />
      </form>
      <div class={styles["no-account-container"]}>
        <div class={styles["no-account-message"]}>Don't Have an Account?</div>
        <a href="/signup" class={styles["no-account-link"]}>
          Sign Up!
        </a>
      </div>
    </div>
  );
});

export default Login;

export const head: DocumentHead = {
  title: "Film Room Login",
  meta: [
    {
      name: "description",
      content: "Login in to your account!",
    },
  ],
};
