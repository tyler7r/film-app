import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { supabase } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { TeamIdContext } from "../layout";

const CreateTeamLogo = component$(() => {
  const teamId = useContext(TeamIdContext);
  const nav = useNavigate();
  const hiddenFileInput = useSignal<HTMLInputElement>();

  const handleClick = $(() => {
    hiddenFileInput.value?.click();
  });

  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const imagePreview = useSignal("");
  const logoURL = useSignal("");
  const validForm = useSignal(false);

  // Get public URL for uploaded image
  const getImageURL = $(() => {
    const { data } = supabase.storage
      .from("team_logos")
      .getPublicUrl(`logos/team${teamId.value}.png`);
    const publicURL = data.publicUrl;
    if (publicURL) {
      logoURL.value = publicURL;
    }
  });

  useTask$(({ track }) => {
    track(() => imagePreview.value);
    if (imagePreview.value !== "") {
      getImageURL();
      message.message = undefined;
      validForm.value = true;
    } else {
      message.message = "You must enter a logo!";
      validForm.value = false;
    }
  });

  // Upload image to team logos file-bucket
  const addLogoToBucket = $(async (files: FileList | null) => {
    if (files === null) return;
    else {
      imagePreview.value = URL.createObjectURL(files[0]);
      const file = files[0];
      const { error } = await supabase.storage
        .from("team_logos")
        .upload(`logos/team${teamId.value}.png`, file, {
          upsert: true,
        });
      if (error) {
        message.message =
          "There was an issue uploading the image to the database! " +
          error.message;
      }
    }
  });

  const submit = $(async () => {
    const { error } = await supabase
      .from("teams")
      .update({ logo: logoURL.value })
      .eq("id", teamId.value);
    if (error) {
      message.message =
        "There was an issue uploading the team logo! " + error.message;
    } else {
      await nav("/create-team/members");
    }
  });

  return (
    <div class={styles["logo-container"]}>
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>Add Team Logo</div>
        <Button onClick$={handleClick}>
          {imagePreview.value !== "" ? (
            <div>Change Logo</div>
          ) : (
            <div>Upload Logo</div>
          )}
        </Button>
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          accept="image/"
          id="file-input"
          onInput$={(e) => {
            let files: FileList | null = (e.target as HTMLInputElement).files;
            addLogoToBucket(files);
          }}
        />
      </label>
      {imagePreview.value !== "" && (
        <div class={styles["image-preview-container"]}>
          <img class={styles["logo-preview"]} src={imagePreview.value} />
        </div>
      )}
      <form
        preventdefault:submit
        onSubmit$={submit}
        class={styles["form-container"]}
      >
        <Button disabled={!validForm.value}>Next</Button>
        <FormMessage message={message} />
      </form>
    </div>
  );
});

export default CreateTeamLogo;
