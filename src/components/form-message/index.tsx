import { component$ } from "@builder.io/qwik";
import { MessageType } from "~/utils/types";
import styles from "./form-message.module.css";

interface FormMessageProps {
  message: MessageType;
}

const FormMessage = component$(({ message }: FormMessageProps) => {
  return (
    <div class={styles["container"]} id={styles[`${message.status}`]}>
      {message.message}
    </div>
  );
});

export default FormMessage;
