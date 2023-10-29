import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import PageTitle from "~/components/page-title";
import { validatePwdMatch } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import styles from "../signup.module.css";

const CreatePassword = component$(() => {
  const nav = useNavigate();
  const info = useStore({
    password: "",
    confirmPwd: "",
  });
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const showPassword = useSignal(false);
  const isValidForm = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => {
      info.password;
      info.confirmPwd;
    });
    // Validate password match and that password is over 8 characters
    const validatePwd = validatePwdMatch(info.password, info.confirmPwd);
    if (info.password.length < 8) {
      message.message = "Password must be at least 8 characters!";
      isValidForm.value = false;
    } else if (!validatePwd) {
      message.message = "Passwords must match!";
      isValidForm.value = false;
    } else {
      message.message = undefined;
      isValidForm.value = true;
    }
  });

  const submit = $(async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: `${info.password}`,
    });

    if (data.user) {
      message.message = "Success creating password!";
      message.status = "success";

      // Sign in user with new password
      await supabase.auth.signInWithPassword({
        email: `${data.user.email}`,
        password: info.password,
      });

      // Navigate to account details page
      setTimeout(async () => {
        await nav("/signup/details");
      }, 1000);
    } else {
      message.message =
        "There was an error updating your password. " + error?.message;
    }
  });

  return (
    <div class={styles["container"]}>
      <PageTitle>Create Password</PageTitle>
      <form
        preventdefault:submit
        onSubmit$={submit}
        class={styles["form-container"]}
      >
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>Password</div>
          <input
            type={showPassword.value ? "text" : "password"}
            value={info.password}
            onInput$={(e) =>
              (info.password = (e.target as HTMLInputElement).value)
            }
          />
        </label>
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>Confirm Password</div>
          <input
            type={showPassword.value ? "text" : "password"}
            value={info.confirmPwd}
            onInput$={(e) =>
              (info.confirmPwd = (e.target as HTMLInputElement).value)
            }
          />
        </label>
        <label class={styles["checkbox-container"]}>
          <div class={styles["input-title"]}>Show Password?</div>
          <input
            type="checkbox"
            bind:checked={showPassword}
            class={styles["checkbox"]}
          />
        </label>
        <Button disabled={!isValidForm.value}>Continue</Button>
      </form>
      <FormMessage message={message} />
    </div>
  );
});

export default CreatePassword;
