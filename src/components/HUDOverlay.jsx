import {
  FiNavigation,
  FiMusic,
  FiMic,
} from "react-icons/fi";

export default function HUDOverlay({ activeScreen }) {
  return (
    <div className="hud-overlay-premium">
      <div className="hud-speed-card">
        <strong>65</strong>
        <span>km/h</span>
      </div>

      {activeScreen === "navigation" && (
        <>
          <div className="hud-navigation-card">
            <FiNavigation />

            <div>
              <strong>400 m</strong>
              <span>Turn right</span>
            </div>
          </div>

          <div className="hud-speed-limit">
            <span>80</span>
          </div>
        </>
      )}

      {activeScreen === "media" && (
        <div className="hud-media-card">
          <FiMusic />

          <div>
            <strong>Midnight City</strong>
            <span>M83</span>
          </div>
        </div>
      )}

      {activeScreen === "assistant" && (
        <div className="hud-assistant-card">
          <div className="hud-assistant-pulse" />

          <FiMic />

          <div>
            <strong>AURA Listening</strong>
            <span>Awaiting command</span>
          </div>
        </div>
      )}
    </div>
  );
}