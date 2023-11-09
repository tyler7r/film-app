import type { Signal } from "@builder.io/qwik";
import {
  $,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

const MOBILE_BREAKPOINT = 480 as const;

const IsMobileContext = createContextId<Signal<boolean>>("app.film.is-mobile");

export const useIsMobile = () => useContext(IsMobileContext);

export const IsMobileProvider = component$(() => {
  // const { value: initialValue } = useMobileBrowserUserAgentSniffing();
  const isMobile = useSignal(false);

  const adjustScreenSize = $(() => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      return false;
    } else {
      return true;
    }
  });

  useOnWindow(
    "resize",
    $(async () => {
      // const width = (event as UIEvent).view?.innerWidth ?? 0;
      // isMobile.value = width <= MOBILE_BREAKPOINT;
      isMobile.value = await adjustScreenSize();
    }),
  );

  useVisibleTask$(
    async () => {
      isMobile.value = await adjustScreenSize();
    },
    { strategy: "document-ready" },
  );

  useContextProvider(IsMobileContext, isMobile);
  return <Slot />;
});
