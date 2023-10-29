import { component$ } from "@builder.io/qwik";
import { type MessageType } from "~/utils/helpers";
import styles from "./form-message.module.css";

interface MessageProps {
  message: MessageType;
}

const FormMessage = component$(({ message }: MessageProps) => {
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

export default FormMessage;
