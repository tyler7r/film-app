import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import styles from "./settings.module.css";
import { Button } from "../button";

interface SettingTypes {
  showClips: boolean;
  myMentionsOnly: boolean;
  selectAuthor: string;
  selectKeyword: string;
}

interface VideoSettingsProps {
  settings: SettingTypes;
  applySettings: PropFunction;
  close: PropFunction<() => void>;
}

const VideoSettings = component$((props: VideoSettingsProps) => {
  const { settings, applySettings, close } = props;

  return (
    <form class="form-container" preventdefault:submit onSubmit$={close}>
      <label class="checkbox-container">
        <div class="input-title">Show Clips?</div>
        <input
          type="checkbox"
          onInput$={() => applySettings("showClips")}
          checked={settings.showClips}
        />
      </label>
      {settings.showClips && (
        <>
          <label class="checkbox-container">
            <div class="input-title">Only My Mentions?</div>
            <input
              type="checkbox"
              onInput$={() => applySettings("myMentionsOnly")}
              checked={settings.myMentionsOnly}
            />
          </label>
          <label class="input-container">
            <div class="input-title">Notes from Select Author</div>
            <input
              type="text"
              onInput$={() => applySettings("selectAuthor")}
              value={settings.selectAuthor}
            />
          </label>
          <label class="input-container">
            <div class="input-title">Notes with Select Keyword</div>
            <input
              type="text"
              onInput$={() => applySettings("selectKeyword")}
              value={settings.selectKeyword}
            />
          </label>
        </>
      )}
      <Button>Save</Button>
    </form>
  );
});

export default VideoSettings;
