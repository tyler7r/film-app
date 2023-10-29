import { component$ } from "@builder.io/qwik";
import { MessageType } from "~/utils/helpers";
import styles from "./form-message.module.css";

interface MessageProps {
  message: MessageType;
}

export const FormMessage = component$(({ message }: MessageProps) => {
  return (
    <>
      {message.message && (
        <div
          class={styles[`message-container`]}
          id={styles[`${message.status}`]}
        >
          {message.message}
        </div>
      )}
    </>
  );
});
