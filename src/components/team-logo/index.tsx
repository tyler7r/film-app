import type { QwikIntrinsicElements } from "@builder.io/qwik";
import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { UserSessionContext } from "~/root";
import { supabase } from "~/utils/supabase";

const TEAM_CITY_MAP = {
  "Atlanta Hustle": "ATL",
};

export type TeamLogoProps = Omit<
  QwikIntrinsicElements["img"],
  "src" | "alt"
> & { team: keyof typeof TEAM_CITY_MAP };

export const TeamLogo = component$(({ team, ...props }: TeamLogoProps) => {
  const city = TEAM_CITY_MAP[team];
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
    await getTeamLogo();
  });

  return (
    <img
      width="40"
      height="50"
      src={`https://theaudl.com/themes/AUDL_theme/css/images/logos/logo-team-${city}.png`}
      alt={`${team} logo`}
      {...props}
    />
  );
});
