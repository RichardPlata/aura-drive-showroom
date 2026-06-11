const clusterModes = {
  comfort: {
    modeLabel: "COMFORT",
    gear: "P",
    accent: "#4FC3F7",
    speed: "0",
  },
  sport: {
    modeLabel: "SPORT",
    gear: "D",
    accent: "#FF4D4D",
    speed: "0",
  },
  eco: {
    modeLabel: "ECO",
    gear: "D",
    accent: "#66BB6A",
    speed: "0",
  },
};

const clusterScreens = {
  welcome: {
    status: "READY",
    title: "AURA DRIVE",
    subtitle: "Vehicle Ready",
    visual: "welcome",
    speed: "0",
    gear: "P",
  },
  home: {
    status: "READY",
    title: "82%",
    subtitle: "Battery",
    visual: "car",
    speed: "0",
    gear: "P",
  },
  navigation: {
    status: "NAVIGATION",
    title: "400 m",
    subtitle: "Turn Right",
    visual: "navigation",
    speed: "65",
    gear: "D",
  },
  media: {
    status: "MEDIA",
    title: "Night Drive",
    subtitle: "AURA Sound",
    visual: "media",
    speed: "0",
    gear: "P",
  },
  phone: {
    status: "PHONE",
    title: "Connected",
    subtitle: "Ricardo Phone",
    visual: "phone",
    speed: "0",
    gear: "P",
  },
  climate: {
    status: "CLIMATE",
    title: "21°C",
    subtitle: "Cabin Auto",
    visual: "climate",
    speed: "0",
    gear: "P",
  },
  drive: {
    status: "DRIVE MODE",
    title: "Dynamic",
    subtitle: "Cabin Behavior",
    visual: "drive",
    speed: "0",
    gear: "D",
  },
  health: {
    status: "SYSTEMS OK",
    title: "Optimal",
    subtitle: "Vehicle Health",
    visual: "health",
    speed: "0",
    gear: "P",
  },
  assistant: {
    status: "AURA ACTIVE",
    title: "Listening",
    subtitle: "Voice Assistant",
    visual: "assistant",
    speed: "0",
    gear: "P",
  },
  more: {
    status: "CONTROLS",
    title: "More",
    subtitle: "Vehicle Options",
    visual: "car",
    speed: "0",
    gear: "P",
  },
  controls: {
    status: "CONTROLS",
    title: "Vehicle",
    subtitle: "Cabin Controls",
    visual: "car",
    speed: "0",
    gear: "P",
  },
  cabin: {
    status: "CABIN",
    title: "Interior",
    subtitle: "Mood Active",
    visual: "welcome",
    speed: "0",
    gear: "P",
  },
};

export default function InstrumentCluster({
  activeMode,
  activeScreen,
  isFocused,
}) {
  const mode = clusterModes[activeMode] || clusterModes.comfort;
  const screen = clusterScreens[activeScreen] || clusterScreens.home;

  const accent =
    activeScreen === "health" || activeScreen === "phone"
      ? "#66BB6A"
      : activeScreen === "media"
      ? "#8B5CF6"
      : mode.accent;

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
              <div className="cluster-health-car" />
              <span className="health-dot h1" />
              <span className="health-dot h2" />
              <span className="health-dot h3" />
            </div>
          )}

          {screen.visual === "assistant" && (
            <div className="cluster-assistant-visual">
              <div className="cluster-aura-orb" />
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