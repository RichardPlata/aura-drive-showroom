import { useState} from "react";
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
  FiMic,
  FiSun,
  FiMoreHorizontal,
  FiMessageCircle,
} from "react-icons/fi";

import MediaScreen from "./MediaScreen";
import PhoneScreen from "./PhoneScreen";
import VehicleHealthScreen from "./VehicleHealthScreen";
import NavigationScreen from "./NavigationScreen";
import ClimateScreen from "./ClimateScreen";
import AuraAssistantScreen from "./AuraAssistantScreen";

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
  
  const [modeTransition, setModeTransition] = useState(null);
  const [screenTransition, setScreenTransition] = useState(false);

  const currentMode = driveModes[activeMode] || driveModes.comfort;
  const showBack = !["welcome", "home", "more"].includes(activeScreen);

  const openScreen = (screen) => {
    if (screen === activeScreen) return;

        setScreenTransition(true);

        setTimeout(() => {
          setActiveScreen(screen);

       setTimeout(() => {
         setScreenTransition(false);
       }, 160);
    }, 260);
  };
  const goHome = () => {
  if (activeScreen === "home") return;

  setScreenTransition(true);

  setTimeout(() => {
    setActiveScreen("home");

    setTimeout(() => {
      setScreenTransition(false);
    }, 160);
  }, 260);
};


  const handleModeChange = (modeKey) => {
    setActiveMode(modeKey);
    setAmbientColor(null);
    setModeTransition(modeKey);

    setTimeout(() => {
      setModeTransition(null);
    }, 900);
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
          {screenTransition && (
            <div className="screen-transition-overlay">
            <div className="screen-transition-orb" />
        </div>
        )}

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

              <div className="drive-mode-description">
  {activeMode === "comfort" && (
    <>
      <strong>Comfort Mode</strong>
      <span>
        Balanced steering, smooth acceleration and everyday driving comfort.
      </span>
    </>
  )}

  {activeMode === "sport" && (
    <>
      <strong>Sport Mode</strong>
      <span>
        Sharper throttle response and more dynamic vehicle behavior.
      </span>
    </>
  )}

  {activeMode === "eco" && (
    <>
      <strong>Eco Mode</strong>
      <span>
        Optimized efficiency and reduced energy consumption.
      </span>
    </>
  )}
</div>
            </section>
          )}

          {activeScreen === "navigation" && <NavigationScreen />}

          {activeScreen === "health" && <VehicleHealthScreen />}

          {activeScreen === "assistant" && (
             <AuraAssistantScreen
                setActiveScreen={setActiveScreen}
                setActiveMode={setActiveMode}
                setAmbientColor={setAmbientColor}
             />
          )}

          {activeScreen === "climate" && <ClimateScreen activeMode={activeMode} />}

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