import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { UserSessionContext } from "~/root";
import { emailListToArray } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { MessageType } from "~/utils/types";
import { Button } from "../../../components/button";
import FormMessage from "../../../components/form-message";
import styles from "./create-team.module.css";

type NewTeamType = {
  city: string;
  name: string;
  division: string;
  member_emails: string;
  logo: string;
};

const CreateTeam = component$(() => {
  const user = useContext(UserSessionContext);
  console.log(user);
  const nav = useNavigate();

  const divisions = [
    "Open",
    "Women's",
    "Mixed",
    "AUDL",
    "PUL",
    "WUL",
    "D1 College Men's",
    "D1 College Women's",
    "D3 College Men's",
    "D3 College Women's",
  ];
  const team: NewTeamType = useStore({
    city: "",
    name: "",
    division: "",
    member_emails: "",
    logo: "",
  });
  const message: MessageType = useStore({
    message: undefined,
    status: "error",
  });
  const imagePreview = useSignal("");
  const isLoading = useSignal(false);

  const clearImage = $(() => {
    imagePreview.value = "";
  });

  const checkFormValidity = $((team: NewTeamType) => {
    if (
      team.city === "" ||
      team.name === "" ||
      team.division === "" ||
      imagePreview.value === ""
    ) {
      return false;
    } else {
      return true;
    }
  });

  const addLogoToBucket = $(async (files: FileList | null) => {
    if (files === null) return;
    else {
      imagePreview.value = URL.createObjectURL(files[0]);
      const file = files[0];
      const { data, error } = await supabase.storage
        .from("team_logos")
        .upload(`logos/${team.name}.png`, file, {
          upsert: true,
        });
      if (data) {
      } else {
        message.message =
          "There was an issue uploading the image to the database" +
          error.message;
      }
    }
  });

  const getImageURL = $(() => {
    const { data } = supabase.storage
      .from("team_logos")
      .getPublicUrl(`${team.name}_logo`);
    const publicURL = data.publicUrl;
    if (publicURL) {
      team.logo = publicURL;
    }
  });

  const submit = $(async () => {
    const isFormValid = await checkFormValidity(team);
    if (!isFormValid) {
      message.message = "Please fill out all required fields!";
      return;
    }

    getImageURL();

    // Create new team on supabase
    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: `${team.name}`,
        city: `${team.city}`,
        logo: `${team.logo}`,
        division: `${team.division}`,
        member_emails: emailListToArray(`${team.member_emails}, ${user.email}`),
        owner: user.userId,
      })
      .select()
      .single();
    if (data && !error) {
      await supabase.from("profiles").update({ team_id: data?.id });
      message.message = `Success. ${team.city} ${team.name}'s account has been created!`;
      message.status = "success";
      isLoading.value = true;

      setTimeout(async () => {
        await nav("/");
      }, 1000);
    } else {
      message.message =
        "There was a problem creating your team. " + error.message;
      isLoading.value = false;
    }
    console.log(data);
  });

  return (
    <>
      <div
        class={styles["go-back"]}
        onClick$={async () => await nav("/staging/team-select")}
      >
        Go Back
      </div>
      <h2 class={styles["page-title"]}>Create a Team</h2>
      <form
        preventdefault:submit
        onSubmit$={submit}
        class={styles["form-container"]}
      >
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>City*</div>
          <input
            type="text"
            onInput$={(e) => (team.city = (e.target as HTMLInputElement).value)}
            value={team.city}
          />
        </label>
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>Name*</div>
          <input
            type="text"
            onInput$={(e) => (team.name = (e.target as HTMLInputElement).value)}
            value={team.name}
          />
        </label>
        <select
          onInput$={(e) =>
            (team.division = (e.target as HTMLInputElement).value)
          }
        >
          <option value="" disabled selected>
            Team's division
          </option>
          {divisions.map((division: string) => (
            <option value={division} key={division}>
              {division}
            </option>
          ))}
        </select>
        {team.name !== "" && team.city !== "" && (
          <label class={styles["input-container"]}>
            <div class={styles["input-title"]}>Logo*</div>
            <input
              type="file"
              accept="image/"
              onInput$={(e) => {
                let files: FileList | null = (e.target as HTMLInputElement)
                  .files;
                addLogoToBucket(files);
              }}
            />
          </label>
        )}
        {imagePreview.value && (
          <div
            class={styles["image-preview-container"]}
            onClick$={() => clearImage()}
          >
            <img
              class={styles["logo-preview"]}
              src={imagePreview.value}
              height={80}
              width={80}
            />
          </div>
        )}
        <label class={styles["input-container"]}>
          <div class={styles["input-title"]}>
            Member Emails (separated by commas)
          </div>
          <input
            type="text"
            onInput$={(e) => {
              team.member_emails = (e.target as HTMLInputElement).value;
            }}
            value={team.member_emails}
          />
        </label>
        <FormMessage message={message} />
        <Button>Submit</Button>
      </form>
    </>
  );
});

export default CreateTeam;
