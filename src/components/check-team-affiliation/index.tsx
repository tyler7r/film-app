import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { supabase } from "~/utils/supabase";

type TeamIdType = {
  teamId: number | null;
};
export const TeamContext = createContextId<TeamIdType>("teamId");

export const CheckTeamAffiliation = component$(() => {
  const teamId: TeamIdType = useStore({
    teamId: null,
  });
  useVisibleTask$(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data && !error) {
      teamId.teamId = data.user.user_metadata.team_id;
    }
  });

  useContextProvider(TeamContext, teamId);
  return <Slot />;
});
