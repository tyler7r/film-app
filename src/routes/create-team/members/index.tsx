import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { Form, routeAction$, useNavigate } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { type Database } from "~/utils/generated_types";
import { emailListToArray } from "~/utils/helpers";
import { type MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { TeamIdContext } from "../layout";

export const useInviteUsers = routeAction$(async (data, requestEvent) => {
  const admin = createClient<Database>(
    requestEvent.env.get("PUBLIC_SUPABASE_URL!")!,
    requestEvent.env.get("SERVICE_ROLE_KEY")!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
  const validEmails = emailListToArray(data.emails.toString());
  validEmails.forEach(async (email) => {
    await admin.auth.admin.inviteUserByEmail(email, {
      // Send invited user to profile details page on link click
      redirectTo: "http://localhost:5173/staging/details",
      // Add team id to invited user's profile
      data: {
        team_id: Number(data.teamId),
      },
    });
  });
  return {
    success: true,
  };
});

const InviteTeamMembers = component$(() => {
  const nav = useNavigate();
  const action = useInviteUsers();
  const teamId = useContext(TeamIdContext).value;
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const emails = useSignal("");

  // Add user emails to the team's verified member list
  const submit = $(async () => {
    // Check for input
    if (emails.value !== "") {
      message.message = "Invites sent successfully!";
      message.status = "success";
      setTimeout(async () => {
        await nav("/");
      }, 2000);
    } else {
      message.message = "Team successfully created!";
      message.status = "success";
      await nav("/");
    }
  });

  return (
    <Form
      class={styles["form-container"]}
      preventdefault:submit
      action={action}
      onSubmitCompleted$={submit}
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
          name="emails"
        />
      </label>
      <input name="teamId" type="hidden" value={teamId} />
      {emails.value === "" ? (
        <Button>Continue without Invites</Button>
      ) : (
        <Button>Finish</Button>
      )}
      <FormMessage message={message} />
    </Form>
  );
});

export default InviteTeamMembers;
