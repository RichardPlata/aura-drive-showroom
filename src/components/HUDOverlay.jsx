import { FiNavigation } from "react-icons/fi";

export default function HUDOverlay({ activeScreen }) {
  if (activeScreen !== "navigation") return null;

  return (
    <div className="hud-overlay">
      <div className="hud-speed">
        <strong>65</strong>
        <span>km/h</span>
      </div>

      <div className="hud-nav">
        <FiNavigation />
        <div>
          <strong>400 m</strong>
          <span>Turn right</span>
        </div>
      </div>

      <div className="hud-limit">
        <span>80</span>
      </div>
    </div>
  );
}