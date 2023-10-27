import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { emailListToArray } from "~/utils/helpers";
import { supabaseAdmin } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { TeamIdContext } from "../layout";

const InviteTeamMembers = component$(() => {
  const nav = useNavigate();
  const teamId = useContext(TeamIdContext).value;
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const emails = useSignal("");

  // Invite users to make an account
  const inviteUsers = $(async () => {
    const validEmails = emailListToArray(emails.value);
    validEmails.forEach(async (email) => {
      const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          // Send invited user to profile details page on link click
          redirectTo: "http://localhost:5173/staging/details",
          // Add team id to invited user's profile
          data: {
            team_id: teamId,
          },
        },
      );
      if (error) {
        message.message = `Error sending invite to ${email}. ` + error.message;
      } else {
        message.message = "Successfully invited users to join your team!";
        message.status = "success";
      }
    });
  });

  // Add user emails to the team's verified member list
  const submit = $(async () => {
    // Check for input
    if (emails.value !== "") {
      await inviteUsers();
      setTimeout(async () => {
        await nav("/");
      }, 2000);
    } else {
      await nav("/");
    }
  });

  return (
    <form
      class={styles["form-container"]}
      preventdefault:submit
      onSubmit$={submit}
    >
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>
          Invite Members via Email (separated by commas)
        </div>
        <textarea
          class={styles["members-input"]}
          placeholder="ex@example.com, ex2@example.com"
          onInput$={(e) => {
            emails.value = (e.target as HTMLInputElement).value;
          }}
          value={emails.value}
        />
      </label>
      {emails.value === "" ? (
        <Button>Continue without Invites</Button>
      ) : (
        <Button>Finish</Button>
      )}
      <FormMessage message={message} />
    </form>
  );
});

export default InviteTeamMembers;
