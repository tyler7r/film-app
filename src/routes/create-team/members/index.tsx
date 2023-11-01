import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Form, routeAction$, useNavigate } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
import { type Database } from "firebase/database";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import {
  checkForDuplicates,
  emailListToArray,
  validateEmail,
} from "~/utils/helpers";
import { type MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { CreateTeamIdContext } from "../layout";

export const useSendInvites = routeAction$(async (data, requestEvent) => {
  // Create admin supabase client which allows you to invite users

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

  // Get teamId from context to include as metadata for newly invited user
  const teamId = data.createTeamId === "" ? null : Number(data.createTeamId);

  // Validate emails again and send invite to each valid email listed
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
  const nav = useNavigate();
  const isEmpty = useSignal(true);
  const isCurrentInputValid = useSignal(false);
  const createTeamId = useContext(CreateTeamIdContext).value;
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const currentEmail = useSignal("");
  const emailStore: { emails: string[] } = useStore({
    emails: [],
  });

  // Track if emails have been input in order to update button content
  useVisibleTask$(({ track }) => {
    track(() => emailStore.emails);
    if (emailStore.emails.length > 0) {
      isEmpty.value = false;
    } else {
      isEmpty.value = true;
    }
  });

  // Track whether or not current email input is valid as it changes and adjust error message accordingly
  useVisibleTask$(({ track }) => {
    track(() => currentEmail.value);
    const isValidEmail = validateEmail(currentEmail.value);
    if (!isValidEmail && currentEmail.value !== "") {
      message.message = "Please enter a valid email!";
      message.status = "error";
      isCurrentInputValid.value = false;
    } else if (!isValidEmail) {
      message.message = undefined;
      isCurrentInputValid.value = false;
    } else {
      isCurrentInputValid.value = true;
      message.message = undefined;
    }
  });

  // Add new email input to email store
  const handleNewEmail = $(() => {
    // Confirm that email is unique, no duplicates should be put in the store
    const isUniqueEmail = checkForDuplicates(
      currentEmail.value,
      emailStore.emails,
    );
    if (isUniqueEmail) {
      emailStore.emails = [...emailStore.emails, currentEmail.value];
      currentEmail.value = "";
    } else {
      message.message = "Email already added!";
      message.status = "error";
    }
  });

  // Handle email deletion from store
  const handleDelete = $((index: number) => {
    const arr = [...emailStore.emails];
    arr.splice(index, 1);
    emailStore.emails = arr;
  });

  // Handle form submission success
  const submit = $(async () => {
    message.message = "Successfully finished team account!";
    message.status = "success";
    setTimeout(async () => {
      await nav(`/profile/${createTeamId}`);
    }, 1000);
  });

  return (
    <Form
      preventdefault:submit
      onSubmitCompleted$={submit}
      action={action}
      class="form-container"
    >
      <div class={styles["invite-container"]}>
        <div class={styles["emails-container"]}>
          {emailStore.emails.length > 0 &&
            emailStore.emails.map((email, index) => (
              <div key={index} class={styles["email"]}>
                <div>{email}</div>
                <button
                  class={styles["delete-email"]}
                  type="button"
                  onClick$={() => handleDelete(index)}
                >
                  X
                </button>
              </div>
            ))}
          {emailStore.emails.length === 0 && (
            <div class={styles["empty-email-msg"]}>Add email invites!</div>
          )}
        </div>
        <div class={styles["email-input"]}>
          <input
            class={styles["input-box"]}
            placeholder="Enter email..."
            bind:value={currentEmail}
          />
          <button
            type="button"
            onClick$={handleNewEmail}
            disabled={!isCurrentInputValid.value}
            class={styles["add-email"]}
          >
            Add
          </button>
        </div>
      </div>
      <input
        name="createTeamId"
        value={createTeamId !== 0 ? createTeamId : null}
        type="hidden"
      />
      <input name="emails" value={emailStore.emails} type="hidden" />
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
