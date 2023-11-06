import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { UserSessionContext } from "~/root";
import { supabase } from "~/utils/supabase";
import styles from "./team-logo.module.css";

export const TeamLogo = component$(() => {
  const user = useContext(UserSessionContext);
  const teamLogo = useSignal("");

  const getTeamLogo = $(async () => {
    if (user.teamId) {
      const { data, error } = await supabase
        .from("teams")
        .select()
        .eq("id", user.teamId)
        .single();
      if (data?.logo) teamLogo.value = data.logo;
      else throw new Error(error?.message);
    } else return "";
  });

  useVisibleTask$(async ({ track }) => {
    track(() => user.teamId);
    await getTeamLogo();
  });

  return (
    <img
      height="50"
      width="50"
      src={teamLogo.value}
      alt={"Team Logo"}
      class={styles["logo"]}
    />
  );
});
