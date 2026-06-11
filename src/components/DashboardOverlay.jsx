import { useEffect, useState } from "react";

const modes = {
  comfort: {
    label: "Comfort",
    accent: "#4FC3F7",
    status: "Vehicle Ready",
    description: "Balanced cabin experience",
  },
  sport: {
    label: "Sport",
    accent: "#FF4D4D",
    status: "Sport Mode Active",
    description: "Sharper response and dynamic feel",
  },
  eco: {
    label: "Eco",
    accent: "#66BB6A",
    status: "Eco Mode Active",
    description: "Optimized range and efficiency",
  },
};

export default function DashboardOverlay({ activeMode, setActiveMode }) {
  const [booting, setBooting] = useState(true);
  const currentMode = modes[activeMode] || modes.comfort;

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-overlay">
      <div className="aura-panel" style={{ "--accent": currentMode.accent }}>
        {booting ? (
          <div className="aura-boot">
            <div className="aura-orb" />
            <h2>AURA Drive</h2>
            <p>Initializing cabin experience...</p>
          </div>
        ) : (
          <>
            <span className="aura-status">{currentMode.status}</span>
            <p className="aura-description">{currentMode.description}</p>

            <div className="aura-data">
              <div>
                <strong>82%</strong>
                <small>Battery</small>
              </div>

              <div>
                <strong>540 km</strong>
                <small>Range</small>
              </div>

              <div>
                <strong>21°C</strong>
                <small>Climate</small>
              </div>
            </div>

            <div className="mode-selector">
              {Object.entries(modes).map(([key, mode]) => (
                <button
                  key={key}
                  className={activeMode === key ? "mode-btn active" : "mode-btn"}
                  onClick={() => setActiveMode(key)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}