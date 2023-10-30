import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { Database } from "~/utils/generated_types";
import { emailListToArray } from "~/utils/helpers";
import { MessageType } from "~/utils/types";
import { CreateTeamIdContext } from "../layout";

export const useSendInvites = routeAction$(async (data, requestEvent) => {
  const sbAdmin = createClient<Database>(
    requestEvent.env.get("PUBLIC_SUPABASE_URL")!,
    requestEvent.env.get("SERVICE_ROLE_KEY")!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
  const teamId = data.createTeamId === "" ? null : Number(data.createTeamId);
  const validEmails = emailListToArray(data.emails.toString());
  validEmails.forEach(async (email) => {
    await sbAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: "http://localhost:5173/signup/details",
      data: {
        team_id: teamId,
      },
    });
  });
  return {
    success: true,
  };
});

const CreateTeamMembers = component$(() => {
  const action = useSendInvites();
  const isEmpty = useSignal(true);
  const createTeamId = useContext(CreateTeamIdContext).value;
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const emails = useSignal("");

  useVisibleTask$(({ track }) => {
    track(() => emails.value);
    const validEmails = emailListToArray(emails.value);
    if (validEmails.length > 0) {
      isEmpty.value = false;
      message.message = undefined;
    } else {
      if (emails.value !== "") {
        message.message = "Please enter a valid email address!";
      } else {
        message.message = undefined;
      }
      isEmpty.value = true;
    }
  });

  const submit = $(async () => {});

  return (
    <Form
      preventdefault:submit
      onSubmitCompleted$={submit}
      action={action}
      class="form-container"
    >
      <label class="input-container">
        <div class="input-title">Invite Members via Email</div>
        <textarea bind:value={emails} name="emails" />
      </label>
      <input
        name="createTeamId"
        value={createTeamId !== 0 ? createTeamId : null}
        type="hidden"
      />
      {isEmpty.value ? (
        <Button>Finish Team with No Invites</Button>
      ) : (
        <Button>Finish and Send Invites</Button>
      )}
      <FormMessage message={message} />
    </Form>
  );
});

export default CreateTeamMembers;
