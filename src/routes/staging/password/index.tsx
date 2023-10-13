import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { validatePwdMatch } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import styles from "./password.module.css";

const Password = component$(() => {
  const nav = useNavigate();
  const isLoading = useSignal(false);
  const info = useStore({
    password: "",
    confirmPwd: "",
  });
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });

  const submit = $(async () => {
    // Validate passwords match
    const validatePwd = validatePwdMatch(info.password, info.confirmPwd);
    if (!validatePwd) {
      message.message = "Passwords do not match!";
      return;
    }
    // Update auth user password if matches
    const { data, error } = await supabase.auth.updateUser({
      password: `${info.password}`,
    });

    // Confirm form submit
    if (data && !error) {
      isLoading.value = true;
      message.message = "Successfully updated password";
      message.status = "success";

      // Sign in user with new password and email
      await supabase.auth.signInWithPassword({
        email: `${data.user.email}`,
        password: info.password,
      });

      // Navigate to team-select window
      setTimeout(async () => {
        await nav(`/staging/team-select`);
      }, 1000);
    } else {
      message.message =
        "There was an error updating the user account. " + error?.message;
      return;
    }
  });

  return (
    <>
      <h1 class={styles["page-title"]}>Finish Your Account!</h1>
      <form
        preventdefault:submit
        onSubmit$={submit}
        class={styles["form-container"]}
      >
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>Password</div>
          <input
            type="password"
            onInput$={(e) =>
              (info.password = (e.target as HTMLInputElement).value)
            }
            value={info.password}
          />
        </label>
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>Confirm Password</div>
          <input
            type="password"
            onInput$={(e) =>
              (info.confirmPwd = (e.target as HTMLInputElement).value)
            }
            value={info.confirmPwd}
          />
        </label>
        <FormMessage message={message} />
        <Button disabled={isLoading.value}>Submit</Button>
      </form>
    </>
  );
});

export default Password;
