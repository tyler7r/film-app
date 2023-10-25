import { Slot, component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { CheckTeamAffiliation } from "~/components/check-team-affiliation";

const Staging = component$(() => {
  return (
    <CheckTeamAffiliation>
      <Slot />
    </CheckTeamAffiliation>
  );
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
