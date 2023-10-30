import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import FormMessage from "~/components/form-message";
import { supabase } from "~/utils/supabase";
import { type MessageType } from "~/utils/types";
import styles from "../create-team.module.css";
import { CreateTeamIdContext } from "../layout";

const CreateTeamLogo = component$(() => {
  const createTeamId = useContext(CreateTeamIdContext).value;
  const nav = useNavigate();
  const hiddenFileInput = useSignal<HTMLInputElement>();
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const imagePreview = useSignal("");
  const logoURL = useSignal("");
  const isValidForm = useSignal(false);

  const handleFileInputClick = $(() => {
    hiddenFileInput.value?.click();
  });

  // Get public URL for uploaded image
  const getImageURL = $(() => {
    const { data } = supabase.storage
      .from("team_logos")
      .getPublicUrl(`logos/team${createTeamId}.png`);
    const publicURL = data.publicUrl;
    if (publicURL) {
      logoURL.value = publicURL;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => imagePreview.value);
    if (imagePreview.value !== "") {
      getImageURL();
      message.message = undefined;
      isValidForm.value = true;
    } else {
      message.message = "You must enter a logo!";
      isValidForm.value = false;
    }
  });

  // Upload image to team logos file-bucket
  const addLogoToBucket = $(async (files: FileList | null) => {
    if (files === null) return;
    else {
      const file = files[0];
      imagePreview.value = URL.createObjectURL(file);
      const { error } = await supabase.storage
        .from("team_logos")
        .upload(`logos/team${createTeamId}.png`, file, {
          upsert: true,
        });
      if (error) {
        message.message =
          "There was an issue uploading the image to the database: " +
          error.message;
      }
    }
  });

  const submit = $(async () => {
    isValidForm.value = false;
    if (createTeamId !== 0) {
      const { error } = await supabase
        .from("teams")
        .update({ logo: logoURL.value })
        .eq("id", createTeamId);
      if (error) {
        message.message =
          "There was an issue uploading the team logo: " + error.message;
        isValidForm.value = true;
      } else {
        message.message = "Successfully uploaded team logo!";
        message.status = "success";
        isValidForm.value = false;
        setTimeout(async () => {
          await nav("/create-team/members");
        }, 1000);
      }
    }
  });
  return (
    <div class={styles["container"]}>
      <label class="input-container">
        <div class="input-title">Add Team Logo</div>
        <Button onClick$={handleFileInputClick}>
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
            const files: FileList | null = (e.target as HTMLInputElement).files;
            addLogoToBucket(files);
          }}
        />
      </label>
      {imagePreview.value !== "" && (
        <div class={styles["image-preview-container"]}>
          <img
            class={styles["logo-preview"]}
            src={imagePreview.value}
            height={250}
            width={250}
          />
        </div>
      )}
      <form preventdefault:submit onSubmit$={submit} class="form-container">
        <Button disabled={!isValidForm.value}>Next</Button>
        <FormMessage message={message} />
      </form>
    </div>
  );
});

export default CreateTeamLogo;
