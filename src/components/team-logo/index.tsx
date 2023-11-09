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
      const { data } = await supabase
        .from("teams")
        .select()
        .eq("id", user.teamId)
        .single();
      if (data?.logo) teamLogo.value = data.logo;
    } else teamLogo.value = "";
  });

  useVisibleTask$(async ({ track }) => {
    track(() => user.teamId);
    await getTeamLogo();
  });

  return teamLogo.value !== "" ? (
    <img
      height="50"
      width="50"
      src={teamLogo.value}
      alt={"Team Logo"}
      class={styles["logo"]}
    />
  ) : null;
});
