import { $, QRL, component$, useSignal, useStore } from "@builder.io/qwik";
import { supabase } from "~/utils/supabase";
import { Button } from "../button";
import styles from "./create-team.module.css";

type NewTeamType = {
  city: string;
  name: string;
  division: string;
  logo: string;
  member_emails: string[] | null;
};

interface CreateTeamType {
  close: QRL<() => void>;
}

const CreateTeam = component$((props: CreateTeamType) => {
  const { close } = props;
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
    logo: "",
    member_emails: null,
  });
  const imagePreview = useSignal(false);

  // Handle team logo input
  const handleFile = $((files: FileList | null) => {
    if (files === null) return;
    else {
      team.logo = URL.createObjectURL(files[0]);
      imagePreview.value = true;
    }
  });

  const clearImage = $(() => {
    team.logo = "";
    imagePreview.value = false;
  });

  const submit = $(async () => {
    // Create new team on supabase
    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: `${team.name}`,
        city: `${team.city}`,
        division: `${team.division}`,
        logo: `${team.logo}`,
        member_emails: team.member_emails,
      })
      .select();
    console.log(data);
    close();
  });

  return (
    <form preventdefault:submit onSubmit$={submit}>
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>City</div>
        <input
          type="text"
          onInput$={(e) => (team.city = (e.target as HTMLInputElement).value)}
          value={team.city}
        />
      </label>
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>Name</div>
        <input
          type="text"
          onInput$={(e) => (team.name = (e.target as HTMLInputElement).value)}
          value={team.name}
        />
      </label>
      <select
        onInput$={(e) => (team.division = (e.target as HTMLInputElement).value)}
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
      <label class={styles["input-container"]}>
        <div class={styles["input-title"]}>Logo</div>
        <input
          type="file"
          accept="image/"
          onInput$={(e) => {
            let files: FileList | null = (e.target as HTMLInputElement).files;
            handleFile(files);
          }}
        />
      </label>
      {imagePreview.value && (
        <div
          class={styles["image-preview-container"]}
          onClick$={() => clearImage()}
        >
          <img
            class={styles["logo-preview"]}
            src={team.logo}
            height={80}
            width={80}
          />
        </div>
      )}
      <Button>Submit</Button>
    </form>
  );
});

export default CreateTeam;
