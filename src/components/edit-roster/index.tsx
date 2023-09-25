import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import styles from "./edit-roster.module.css";
import mockData from "../../../data/db.json";
import { Player } from "../player";
import { BsTrash } from "@qwikest/icons/bootstrap";
import { Button } from "../button";

const EditRoster = component$(() => {
  const players = mockData.users.filter((user) => user.role === "player");
  const addPlayerOpen = useSignal(false);
  const newPlayerInfo = useStore({
    name: "",
    number: "",
  });

  const addToRoster = $(() => {
    //post logic here
    addPlayerOpen.value = false;
  });

  const deletePlayer = $(() => {
    //post logic here
  });

  return (
    <div class={styles["container"]}>
      {addPlayerOpen.value === false && (
        <Button onClick$={() => (addPlayerOpen.value = true)}>
          Add Player
        </Button>
      )}
      {addPlayerOpen.value && (
        <form
          preventdefault: submit
          onSubmit$={addToRoster}
          class="form-container"
        >
          <label class="input-container">
            <div class="input-title">Name</div>
            <input
              type="text"
              onInput$={(e) =>
                (newPlayerInfo.name = (e.target as HTMLInputElement).value)
              }
              value={newPlayerInfo.name}
            />
          </label>
          <label class="input-container">
            <div class="input-title">Number</div>
            <input
              type="text"
              onInput$={(e) =>
                (newPlayerInfo.number = (e.target as HTMLInputElement).value)
              }
              value={newPlayerInfo.number}
            />
          </label>
          {newPlayerInfo.name !== "" && newPlayerInfo.number !== "" ? (
            <Button>Add to Roster</Button>
          ) : (
            <Button
              type="button"
              onClick$={() => (addPlayerOpen.value = false)}
            >
              Close
            </Button>
          )}
        </form>
      )}
      {players.map((player) => (
        <div key={player.id} class={styles["player-container"]}>
          <Player number={player.number} id={player.id} name={player.name} />
          <BsTrash
            class={styles["player-btn"]}
          // onClick$={() => deletePlayer(player.id)}
          />
          {/* <BsPencilSquare class={styles['player-btn']} /> */}
        </div>
      ))}
    </div>
  );
});

export default EditRoster;
