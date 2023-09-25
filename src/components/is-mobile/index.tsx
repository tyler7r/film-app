import type { Signal } from "@builder.io/qwik";
import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  Slot,
  useContext,
  useOnWindow,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useMobileBrowserUserAgentSniffing } from "~/routes/layout";

const MOBILE_BREAKPOINT = 480 as const;

const IsMobileContext = createContextId<Signal<boolean>>("app.film.is-mobile");

export const useIsMobile = () => useContext(IsMobileContext);

export const IsMobileProvider = component$(() => {
  const { value: initialValue } = useMobileBrowserUserAgentSniffing();
  const isMobile = useSignal(initialValue);

  useOnWindow(
    "resize",
    $((event) => {
      const width = (event as UIEvent).view?.innerWidth ?? 0;
      isMobile.value = width <= MOBILE_BREAKPOINT;
    })
  );

  useVisibleTask$(
    () => {
      isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
    },
    { strategy: "document-ready" }
  );

  useContextProvider(IsMobileContext, isMobile);

  return <Slot />;
});
