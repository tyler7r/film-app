import {
  Slot,
  component$,
  useContext,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { supabase } from "~/utils/supabase";
import { UserSessionContext } from "../layout";

const Staging = component$(() => {
  const user = useContext(UserSessionContext);
  const nav = useNavigate();
  useVisibleTask$(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data.user?.id && !error) {
      user.email = data.user.email;
      user.isLoggedIn = true;
      user.teamId = data.user.user_metadata.team_id;
      user.userId = data.user.id;
    } else {
      user.email = "";
      user.isLoggedIn = false;
      user.teamId = null;
      user.userId = "";
      await nav("/signup");
    }
  });
  return <Slot />;
});

export const head: DocumentHead = {
  title: "Film Room Finish Signup",
  meta: [
    {
      name: "description",
      content: "Sign up for a film room account",
    },
  ],
};

export default Staging;
