import { useState } from "react";
import {
  FiNavigation,
  FiMusic,
  FiPhone,
  FiActivity,
  FiSettings,
  FiArrowLeft,
  FiZap,
  FiBatteryCharging,
  FiWifi,
  FiHome,
  FiWind,
  FiTarget,
  FiVolume2,
  FiSliders,
  FiTruck,
  FiCheckCircle,
  FiMapPin,
  FiMic,
  FiSun,
  FiMoreHorizontal,
  FiMessageCircle,
} from "react-icons/fi";

import MediaScreen from "./MediaScreen";
import PhoneScreen from "./PhoneScreen";

const navItems = [
  { icon: <FiHome />, screen: "home" },
  { icon: <FiNavigation />, screen: "navigation" },
  { icon: <FiMusic />, screen: "media" },
  { icon: <FiWind />, screen: "climate" },
  { icon: <FiMoreHorizontal />, screen: "more" },
];

const homeActions = [
  { icon: <FiNavigation />, title: "Navigation", screen: "navigation" },
  { icon: <FiMusic />, title: "Media", screen: "media" },
  { icon: <FiPhone />, title: "Phone", screen: "phone" },
  { icon: <FiZap />, title: "Drive\nModes", screen: "drive" },
  { icon: <FiActivity />, title: "Vehicle\nHealth", screen: "health" },
  { icon: <FiMessageCircle />, title: "AURA\nAssistant", screen: "assistant" },
];

const moreActions = [
  { icon: <FiPhone />, title: "Phone", screen: "phone" },
  { icon: <FiZap />, title: "Drive Modes", screen: "drive" },
  { icon: <FiActivity />, title: "Vehicle Health", screen: "health" },
  { icon: <FiMessageCircle />, title: "AURA Assistant", screen: "assistant" },
  { icon: <FiSun />, title: "Cabin Experience", screen: "cabin" },
  { icon: <FiSettings />, title: "Vehicle Controls", screen: "controls" },
];

const driveModes = {
  comfort: { label: "Comfort", accent: "#4FC3F7" },
  sport: { label: "Sport", accent: "#FF4D4D" },
  eco: { label: "Eco", accent: "#66BB6A" },
};

export default function CenterScreenOverlay({
  activeScreen,
  setActiveScreen,
  activeMode,
  setActiveMode,
  ambientColor,
  setAmbientColor,
  bootStage = "home",
  headlightsActive,
  setHeadlightsActive,
  playWelcomeSequence,
  onStartVehicle,
}) {
  const [assistantState, setAssistantState] = useState("idle");
  const [modeTransition, setModeTransition] = useState(null);

  const currentMode = driveModes[activeMode] || driveModes.comfort;
  const showBack = !["welcome", "home", "more"].includes(activeScreen);

  const openScreen = (screen) => setActiveScreen(screen);
  const goHome = () => setActiveScreen("home");

  const startAssistantDemo = () => {
    setAssistantState("listening");
    setTimeout(() => setAssistantState("thinking"), 2000);
    setTimeout(() => setAssistantState("speaking"), 3500);
    setTimeout(() => setAssistantState("idle"), 6500);
  };

  const handleModeChange = (modeKey) => {
    setModeTransition(modeKey);
    setTimeout(() => setActiveMode(modeKey), 350);
    setTimeout(() => setModeTransition(null), 1400);
  };

  const isBooting = ["boot", "initializing", "battery", "ready", "welcome"].includes(
    bootStage
  );

  const colors = [
    { name: "blue", color: "#3B82F6" },
    { name: "purple", color: "#8B5CF6" },
    { name: "cyan", color: "#06B6D4" },
    { name: "green", color: "#22C55E" },
    { name: "orange", color: "#F97316" },
    { name: "red", color: "#EF4444" },
  ];

  if (bootStage === "off") {
    return (
      <div className="center-screen-overlay">
        <div
          className="center-screen-panel figma-hmi start-hmi-panel"
          style={{ "--screen-accent": currentMode.accent }}
        >
          <section className="start-screen start-screen-refined">
            <div className="start-screen-copy">
              <span>AURA DRIVE OS</span>
              <h1>Vehicle Offline</h1>
              <p>Press start to initialize cockpit systems.</p>
            </div>

            <button className="start-button" onClick={onStartVehicle}>
              START
            </button>

            <div className="start-system-row">
              <div>Cluster</div>
              <div>Center Display</div>
              <div>Ambient Light</div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (isBooting) {
    return (
      <div className="center-screen-overlay">
        <div
          className="center-screen-panel figma-hmi boot-hmi-panel refined-boot-panel"
          style={{ "--screen-accent": currentMode.accent }}
        >
          <div className="boot-sequence-screen premium-boot refined-boot">
            <div className="boot-left">
              <div className="boot-orb" />

              <div>
                <span>AURA DRIVE OS</span>
                <h1>
                  {bootStage === "welcome"
                    ? "Welcome Ricardo"
                    : bootStage === "ready"
                    ? "Vehicle Ready"
                    : "Initializing"}
                </h1>
                <p>
                  {bootStage === "boot" && "Starting cockpit systems"}
                  {bootStage === "initializing" && "Loading HMI environment"}
                  {bootStage === "battery" && "Checking battery systems"}
                  {bootStage === "ready" && "Vehicle systems ready"}
                  {bootStage === "welcome" && "Your cockpit is ready"}
                </p>
              </div>
            </div>

            <div className="boot-checklist">
              <div className={bootStage !== "boot" ? "active" : ""}>
                <span />
                Cockpit initializing
              </div>

              <div
                className={
                  ["battery", "ready", "welcome"].includes(bootStage)
                    ? "active"
                    : ""
                }
              >
                <span />
                Battery systems online
              </div>

              <div
                className={
                  ["ready", "welcome"].includes(bootStage) ? "active" : ""
                }
              >
                <span />
                Ambient lighting ready
              </div>

              <div className={bootStage === "welcome" ? "active" : ""}>
                <span />
                HMI experience ready
              </div>
            </div>

            <div className="boot-progress">
              <span
                className={
                  bootStage === "boot"
                    ? "stage-1"
                    : bootStage === "initializing"
                    ? "stage-2"
                    : bootStage === "battery"
                    ? "stage-3"
                    : bootStage === "ready"
                    ? "stage-4"
                    : "stage-5"
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="center-screen-overlay">
      <div
        className="center-screen-panel figma-hmi"
        style={{ "--screen-accent": currentMode.accent }}
      >
        <div className="figma-status">
          <div />
          <div>
            <FiWifi />
            <FiBatteryCharging />
            <small>10:40</small>
          </div>
        </div>

        <div className="figma-content">
          {showBack && (
            <button className="figma-back" onClick={goHome}>
              <FiArrowLeft /> Back
            </button>
          )}

          {modeTransition && (
            <div className="mode-transition-overlay">
              <div className="mode-transition-orb" />
              <span>Switching to</span>
              <strong>{driveModes[modeTransition].label} Mode</strong>
            </div>
          )}

          {activeScreen === "home" && (
            <section className="figma-apps-screen">
              <div className="figma-app-grid">
                {homeActions.map((action) => (
                  <button
                    key={action.title}
                    className="figma-app-card"
                    onClick={() => openScreen(action.screen)}
                  >
                    <span>{action.icon}</span>
                    <strong>{action.title}</strong>
                  </button>
                ))}
              </div>
            </section>
          )}

          {activeScreen === "more" && (
            <section className="figma-more-screen">
              <div className="figma-more-title">
                <h2>More Controls</h2>
                <p>Vehicle functions and system options</p>
              </div>

              <div className="figma-more-grid">
                {moreActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={() => openScreen(action.screen)}
                  >
                    <span>{action.icon}</span>
                    <strong>{action.title}</strong>
                  </button>
                ))}
              </div>
            </section>
          )}

          {activeScreen === "drive" && (
            <section className="figma-drive-screen">
              <div className="figma-drive-copy">
                <h2>Drive Modes</h2>
                <p>Select your experience</p>

                <div className="figma-drive-list">
                  {Object.entries(driveModes).map(([key, mode]) => (
                    <button
                      key={key}
                      className={activeMode === key ? "active" : ""}
                      style={{ "--mode-color": mode.accent }}
                      onClick={() => handleModeChange(key)}
                    >
                      {mode.label.toUpperCase()}
                    </button>
                  ))}

                  <button>INDIVIDUAL</button>
                </div>
              </div>

              <div className="figma-drive-visual">
                <div className="figma-drive-car" />
                <div className="figma-drive-lines" />
              </div>

              <div className="figma-drive-features">
                <div>
                  <FiZap />
                  <span>Sport Acceleration</span>
                </div>
                <div>
                  <FiTarget />
                  <span>Firm Steering</span>
                </div>
                <div>
                  <FiSliders />
                  <span>Fast Response</span>
                </div>
                <div>
                  <FiVolume2 />
                  <span>Dynamic Sound</span>
                </div>
              </div>
            </section>
          )}

          {activeScreen === "navigation" && (
            <section className="figma-navigation-screen">
              <div className="figma-nav-info">
                <FiNavigation />
                <h2>400 m</h2>
                <p>Turn right</p>
                <small>
                  <FiMapPin /> Av. Libertador
                </small>
              </div>

              <div className="figma-nav-map">
                <div className="figma-nav-grid" />
                <div className="figma-nav-route" />
                <div className="figma-nav-car" />
              </div>

              <div className="figma-nav-stats">
                <div>
                  <strong>18 min</strong>
                  <span>ETA 10:58</span>
                </div>
                <div>
                  <strong>16 km</strong>
                  <span>Distance</span>
                </div>
                <div>
                  <strong>82%</strong>
                  <span>Arrival battery</span>
                </div>
                <button>End trip</button>
              </div>
            </section>
          )}

          {activeScreen === "health" && (
            <section className="figma-health-screen">
              <div className="figma-health-copy">
                <h2>Vehicle Health</h2>
                <p>All systems are operating normally.</p>

                <div className="figma-health-list">
                  {["Battery", "Tires", "Brakes", "Climate", "Systems"].map(
                    (item) => (
                      <div key={item}>
                        <span>
                          <FiCheckCircle /> {item}
                        </span>
                        <strong>
                          {item === "Systems" ? "Online" : "Optimal"}
                        </strong>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="figma-health-car">
                <div className="health-car-shape" />
                <div className="health-node n1" />
                <div className="health-node n2" />
                <div className="health-node n3" />
              </div>
            </section>
          )}

          {activeScreen === "assistant" && (
            <section className="figma-assistant-screen">
              <div className="figma-assistant-copy">
                <h2>
                  Hello Ricardo,
                  <br />
                  how can I help?
                </h2>

                <p className="assistant-state-label">
                  {assistantState === "idle" && "Ready"}
                  {assistantState === "listening" && "Listening..."}
                  {assistantState === "thinking" && "Processing request..."}
                  {assistantState === "speaking" && "Navigation started"}
                </p>
              </div>

              <button
                className={`figma-assistant-orb ${assistantState}`}
                onClick={startAssistantDemo}
              >
                <FiMic />
              </button>

              <div className="figma-assistant-actions">
                <button onClick={() => openScreen("navigation")}>
                  <FiNavigation /> Navigate home
                </button>

                <button onClick={() => openScreen("health")}>
                  <FiTruck /> Vehicle status
                </button>

                <button onClick={() => openScreen("drive")}>
                  <FiZap /> Drive modes
                </button>

                <button onClick={() => openScreen("cabin")}>
                  <FiSun /> Cabin ambience
                </button>
              </div>
            </section>
          )}

          {activeScreen === "climate" && (
            <section className="figma-climate-screen">
              <div className="figma-climate-main">
                <div>
                  <h2>Climate</h2>
                  <p>Cabin temperature</p>
                </div>

                <strong>21°C</strong>
              </div>

              <div className="figma-climate-grid">
                <div>
                  <span>Driver</span>
                  <strong>21°C</strong>
                </div>
                <div>
                  <span>Passenger</span>
                  <strong>22°C</strong>
                </div>
                <div>
                  <span>Fan</span>
                  <strong>Auto</strong>
                </div>
                <div>
                  <span>Mode</span>
                  <strong>{currentMode.label}</strong>
                </div>
              </div>

              <div className="figma-climate-actions">
                <button className="active">AUTO</button>
                <button>A/C</button>
                <button>SYNC</button>
              </div>
            </section>
          )}

          {activeScreen === "cabin" && (
            <section className="figma-cabin-screen">
              <div className="figma-cabin-hero">
                <div>
                  <span>Cabin Experience</span>
                  <h2>Interior Mood</h2>
                  <p>Personalize lighting, ambience and dashboard feel.</p>
                </div>

                <div className="figma-cabin-orb" />
              </div>

              <div className="figma-cabin-modes">
                {Object.entries(driveModes).map(([key, mode]) => (
                  <button
                    key={key}
                    className={activeMode === key ? "active" : ""}
                    style={{ "--mode-color": mode.accent }}
                    onClick={() => handleModeChange(key)}
                  >
                    <span />
                    {mode.label}
                  </button>
                ))}
              </div>

              <div className="figma-cabin-colors">
                {colors.map((item) => (
                  <button
                    key={item.name}
                    className={ambientColor === item.name ? "selected" : ""}
                    style={{ backgroundColor: item.color }}
                    onClick={() => setAmbientColor(item.name)}
                    aria-label={item.name}
                  />
                ))}
              </div>
            </section>
          )}

          {activeScreen === "controls" && (
            <section className="figma-controls-screen">
              <div className="figma-controls-hero">
                <div>
                  <span>Vehicle Controls</span>
                  <h2>Exterior & Cabin</h2>
                  <p>Control lighting, access and welcome functions.</p>
                </div>

                <FiTruck />
              </div>

              <div className="figma-controls-grid">
                <button
                  className={headlightsActive ? "active" : ""}
                  onClick={() => setHeadlightsActive((prev) => !prev)}
                >
                  <FiSun />
                  <div>
                    <strong>Headlights</strong>
                    <span>{headlightsActive ? "On" : "Off"}</span>
                  </div>
                </button>

                <button onClick={playWelcomeSequence}>
                  <FiZap />
                  <div>
                    <strong>Welcome Sequence</strong>
                    <span>Replay animation</span>
                  </div>
                </button>

                <button>
                  <FiTruck />
                  <div>
                    <strong>Door Locks</strong>
                    <span>Unlocked</span>
                  </div>
                </button>

                <button>
                  <FiWind />
                  <div>
                    <strong>Windows</strong>
                    <span>Closed</span>
                  </div>
                </button>

                <button>
                  <FiSettings />
                  <div>
                    <strong>Mirrors</strong>
                    <span>Auto fold</span>
                  </div>
                </button>

                <button>
                  <FiBatteryCharging />
                  <div>
                    <strong>Energy Saver</strong>
                    <span>Active</span>
                  </div>
                </button>
              </div>
            </section>
          )}

          {activeScreen === "media" && <MediaScreen />}
          {activeScreen === "phone" && <PhoneScreen />}
        </div>

        <div className="figma-bottom-nav">
          {navItems.map((item) => (
            <button
              key={item.screen}
              className={activeScreen === item.screen ? "active" : ""}
              onClick={() => openScreen(item.screen)}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}