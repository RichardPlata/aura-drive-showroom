const clusterModes = {
  comfort: { modeLabel: "COMFORT", gear: "P", accent: "#4FC3F7", speed: "0" },
  sport: { modeLabel: "SPORT", gear: "D", accent: "#FF4D4D", speed: "0" },
  eco: { modeLabel: "ECO", gear: "D", accent: "#66BB6A", speed: "0" },
};

const clusterScreens = {
  welcome: { status: "READY", title: "AURA DRIVE", subtitle: "Vehicle Ready", visual: "welcome", speed: "0", gear: "P" },
  home: { status: "READY", title: "82%", subtitle: "Battery", visual: "car", speed: "0", gear: "P" },
  navigation: { status: "NAVIGATION", title: "400 m", subtitle: "Av. Libertador", visual: "navigation", speed: "65", gear: "D" },
  media: { status: "NOW PLAYING", title: "Midnight City", subtitle: "M83", visual: "media", speed: "65", gear: "D" },
  phone: { status: "INCOMING CALL", title: "Sarah Johnson", subtitle: "Mobile", visual: "phone", speed: "65", gear: "D" },
  climate: { status: "CLIMATE", title: "21°C", subtitle: "Driver / Passenger Sync", visual: "climate", speed: "0", gear: "P" },
  drive: { status: "DRIVE MODE", title: "Dynamic", subtitle: "Cabin Behavior", visual: "drive", speed: "0", gear: "D" },
  health: { status: "SYSTEMS OK", title: "96/100", subtitle: "Vehicle Health Score", visual: "health", speed: "0", gear: "P" },
  assistant: { status: "AURA ASSISTANT", title: "Listening...", subtitle: "Awaiting command", visual: "assistant", speed: "65", gear: "D" },
  more: { status: "CONTROLS", title: "More", subtitle: "Vehicle Options", visual: "car", speed: "0", gear: "P" },
  controls: { status: "CONTROLS", title: "Vehicle", subtitle: "Cabin Controls", visual: "car", speed: "0", gear: "P" },
  cabin: { status: "CABIN", title: "Interior", subtitle: "Mood Active", visual: "welcome", speed: "0", gear: "P" },
};

export default function InstrumentCluster({
  activeMode,
  activeScreen,
  isFocused,
  bootStage = "home",
}) {
  const mode = clusterModes[activeMode] || clusterModes.comfort;
  const screen = clusterScreens[activeScreen] || clusterScreens.home;

  const isOff = bootStage === "off";
  const isBooting = ["boot", "initializing", "ready", "welcome"].includes(bootStage);

  const accent =
    isOff
      ? "#4FC3F7"
      : activeScreen === "health" || activeScreen === "phone"
      ? "#66BB6A"
      : activeScreen === "media"
      ? "#8B5CF6"
      : mode.accent;

  if (isOff) {
    return (
      <div
        className={`cluster-overlay ${isFocused ? "cluster-focused" : ""}`}
        style={{ "--cluster-accent": accent }}
      >
        <div className="cluster-card cluster-system-off">
          <div className="cluster-arc left" />
          <div className="cluster-arc right" />

          <div className="cluster-top">
            <span>P</span>
            <small>AURA DRIVE</small>
          </div>

          <div className="cluster-off-state">
            <span>SYSTEM OFF</span>
            <strong>Press START</strong>
            <small>Cockpit systems offline</small>
          </div>

          <div className="cluster-footer">
            <span>--:--</span>
            <span>--°C</span>
          </div>
        </div>
      </div>
    );
  }

  if (isBooting) {
    return (
      <div
        className={`cluster-overlay ${isFocused ? "cluster-focused" : ""}`}
        style={{ "--cluster-accent": accent }}
      >
        <div className="cluster-card cluster-booting">
          <div className="cluster-arc left" />
          <div className="cluster-arc right" />

          <div className="cluster-top">
            <span>P</span>
            <small>AURA DRIVE</small>
          </div>

          <div className="cluster-boot-core">
            <div className="cluster-boot-orb" />
            <strong>
              {bootStage === "welcome" ? "WELCOME" : "INITIALIZING"}
            </strong>
            <small>
              {bootStage === "boot" && "Starting cockpit"}
              {bootStage === "initializing" && "Systems online"}
              {bootStage === "ready" && "Vehicle ready"}
              {bootStage === "welcome" && "Hello Ricardo"}
            </small>
          </div>

          <div className="cluster-footer">
            <span>10:40</span>
            <span>21°C</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`cluster-overlay ${isFocused ? "cluster-focused" : ""}`}
      style={{ "--cluster-accent": accent }}
    >
      <div className={`cluster-card cluster-${screen.visual}`}>
        <div className="cluster-arc left" />
        <div className="cluster-arc right" />

        <div className="cluster-top">
          <span>{screen.gear || mode.gear}</span>
          <small>{mode.modeLabel}</small>
        </div>

        <div className="cluster-main">
          <div>
            <strong>82%</strong>
            <small>Battery</small>
          </div>

          <div className="cluster-speed">
            <strong>{screen.speed || mode.speed}</strong>
            <small>km/h</small>
          </div>

          <div>
            <strong>540</strong>
            <small>km Range</small>
          </div>
        </div>

        <div className="cluster-visual-area">
          {screen.visual === "welcome" && <div className="cluster-welcome-orb" />}
          {screen.visual === "car" && <div className="cluster-mini-car" />}

          {screen.visual === "navigation" && (
            <div className="cluster-nav-visual">
              <div className="cluster-turn-arrow" />
              <strong>{screen.title}</strong>
              <small>{screen.subtitle}</small>
            </div>
          )}

          {screen.visual === "media" && (
            <div className="cluster-media-visual">
              <div className="cluster-music-note">♪</div>
              <strong>{screen.title}</strong>
              <small>{screen.subtitle}</small>
            </div>
          )}

          {screen.visual === "phone" && (
            <div className="cluster-phone-visual">
              <div className="cluster-phone-icon">PHONE</div>
              <strong>{screen.title}</strong>
              <small>{screen.subtitle}</small>
            </div>
          )}

          {screen.visual === "climate" && (
            <div className="cluster-climate-visual">
              <strong>{screen.title}</strong>
              <small>{screen.subtitle}</small>
            </div>
          )}

          {screen.visual === "drive" && (
            <div className="cluster-drive-visual">
              <strong>{mode.modeLabel}</strong>
              <small>{screen.subtitle}</small>
            </div>
          )}

          {screen.visual === "health" && (
            <div className="cluster-health-visual">
              <div className="cluster-health-score">
                <strong>96/100</strong>
                <small>Health Score</small>
            </div>

            <div className="cluster-health-car" />

              <span className="health-dot h1" />
              <span className="health-dot h2" />
              <span className="health-dot h3" />
            </div>
          )}

          {screen.visual === "assistant" && (
            <div className="cluster-assistant-visual">
              <div className="cluster-aura-orb" />
              <div className="cluster-aura-pulse" />
              <strong>{screen.title}</strong>
              <small>{screen.subtitle}</small>
            </div>
          )}
        </div>

        {activeScreen === "navigation" && (
          <div className="cluster-speed-limit">80</div>
        )}

        <div className="cluster-status">{screen.status}</div>

        <div className="cluster-footer">
          <span>10:40</span>
          <span>21°C</span>
        </div>
      </div>
    </div>
  );
}