import { component$, type QRL, type Signal } from "@builder.io/qwik";
import styles from "./multi-input.module.css";

type MultiInputType = {
  inputType: string;
  currentValue: Signal<string>;
  values: string[];
  handleDelete: QRL<(index: number) => void>;
  handleNewItem: QRL<() => void>;
  isValidInput: boolean;
};

const MultiInput = component$(
  ({
    currentValue,
    values,
    handleDelete,
    handleNewItem,
    inputType,
    isValidInput,
  }: MultiInputType) => {
    return (
      <div class={styles["container"]}>
        <div class={styles["items-container"]}>
          {values.length > 0 &&
            values.map((item, index) => (
              <div key={index} class={styles["item"]}>
                <div>{item}</div>
                <button
                  type="button"
                  class={styles["delete-item"]}
                  onClick$={() => handleDelete(index)}
                >
                  X
                </button>
              </div>
            ))}
          {values.length === 0 && (
            <div class={styles["empty-items-msg"]}>{`No ${inputType}s...`}</div>
          )}
        </div>
        <div class={styles["item-input"]}>
          <input
            class={styles["input-box"]}
            placeholder={`Enter ${inputType}...`}
            bind:value={currentValue}
          />
          <button
            type="button"
            onClick$={() => handleNewItem()}
            class={styles["add-item"]}
            disabled={!isValidInput}
          >
            Add
          </button>
        </div>
      </div>
    );
  },
);

export default MultiInput;
