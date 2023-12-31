import type { PropFunction } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { Button } from "../button";

interface SearchFilterType {
  keywords: boolean;
  teams: boolean;
  players: boolean;
  games: boolean;
  season: string;
  tournament: string;
}

interface FilterProps {
  close: PropFunction<() => void>;
  applyFilters: PropFunction<
    (
      filter:
        | "teams"
        | "season"
        | "keywords"
        | "players"
        | "tournament"
        | "games",
      value?: string,
    ) => void
  >;
  searchFilters: SearchFilterType;
}

const SearchFilters = component$((props: FilterProps) => {
  const { close, applyFilters, searchFilters } = props;

  const submit = $(() => {
    close();
  });

  return (
    <form preventdefault: submit onSubmit$={submit} class="form-container">
      <label class="checkbox-container">
        <div class="input-title">Keywords</div>
        <input
          type="checkbox"
          onInput$={() => applyFilters("keywords")}
          checked={searchFilters.keywords}
        />
      </label>
      <label class="checkbox-container">
        <div class="input-title">Players</div>
        <input
          type="checkbox"
          onInput$={() => applyFilters("players")}
          checked={searchFilters.players}
        />
      </label>
      <label class="checkbox-container">
        <div class="input-title">Teams</div>
        <input
          type="checkbox"
          onInput$={() => applyFilters("teams")}
          checked={searchFilters.teams}
        />
      </label>
      <label class="checkbox-container">
        <div class="input-title">Games</div>
        <input
          type="checkbox"
          onInput$={() => applyFilters("games")}
          checked={searchFilters.games}
        />
      </label>
      <label class="input-container">
        <div class="input-title">Season</div>
        <input
          type="text"
          onInput$={(e) =>
            applyFilters("season", (e.target as HTMLInputElement).value)
          }
          value={searchFilters.season}
        />
      </label>
      <label class="input-container">
        <div class="input-title">Tournament</div>
        <input
          type="text"
          onInput$={(e) =>
            applyFilters("tournament", (e.target as HTMLInputElement).value)
          }
          value={searchFilters.tournament}
        />
      </label>
      <Button>Save</Button>
    </form>
  );
});

export default SearchFilters;
