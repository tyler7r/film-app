import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

const TEAM_CITY_MAP = {
  "Atlanta Hustle": "ATL",
};

export type TeamLogoProps = Omit<
  QwikIntrinsicElements["img"],
  "src" | "alt"
> & { team: keyof typeof TEAM_CITY_MAP };

export const TeamLogo = component$(({ team, ...props }: TeamLogoProps) => {
  const city = TEAM_CITY_MAP[team];

  return (
    <img width="40" height="50"
      src={`https://theaudl.com/themes/AUDL_theme/css/images/logos/logo-team-${city}.png`}
      alt={`${team} logo`}
      {...props}
    />
  );
});
