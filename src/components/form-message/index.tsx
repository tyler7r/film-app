import { component$ } from "@builder.io/qwik";
import { type MessageType } from "~/utils/types";
import styles from "./form-message.module.css";

interface FormMessageProps {
  message: MessageType;
}

const FormMessage = component$(({ message }: FormMessageProps) => {
  return (
    <>
      {message.message && (
        <div class={styles["container"]} id={styles[`${message.status}`]}>
          {message.message}
        </div>
      )}
    </>
  );
});

export default FormMessage;
