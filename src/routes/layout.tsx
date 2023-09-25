import { $, component$, Slot, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const screenWidth = useSignal(0)
  const mobileView = useSignal(false);

  const updateScreenSize = $(() => {
    screenWidth.value = window.innerWidth;
  })

  useVisibleTask$(() => { 
    screenWidth.value = window.innerWidth;
    window.addEventListener('resize', updateScreenSize)
  })

  useVisibleTask$(({ track }) => {
    track(() => screenWidth.value)
    if (screenWidth.value >= 400) {
      mobileView.value = false
    } else {
      mobileView.value = true;
    }
  })

  return (
    <>
      <Navbar isMobile={mobileView.value} />
      <Slot />
    </>
  )
});
