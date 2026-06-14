import { useState } from "react";
import {
  FiMic,
  FiNavigation,
  FiActivity,
  FiZap,
  FiThermometer,
  FiMessageCircle,
  FiCheckCircle,
} from "react-icons/fi";

const commands = [
  {
    label: "Navigate home",
    icon: <FiNavigation />,
    state: "Navigation started",
    response: "Route to Home is ready. ETA 18 minutes.",
    action: "navigation",
  },
  {
    label: "Run diagnostics",
    icon: <FiActivity />,
    state: "Diagnostics complete",
    response: "All vehicle systems are operating normally.",
    action: "health",
  },
  {
    label: "Activate Sport Mode",
    icon: <FiZap />,
    state: "Sport mode active",
    response: "Sport Mode activated. Steering and throttle response adjusted.",
    action: "sport",
  },
  {
    label: "Set climate to 21°",
    icon: <FiThermometer />,
    state: "Climate optimized",
    response: "Cabin climate set to 21 degrees.",
    action: "climate",
  },
];

export default function AuraAssistantScreen({
  setActiveScreen,
  setActiveMode,
  setAmbientColor,
}) {
  const [assistantState, setAssistantState] = useState("idle");
  const [activeCommand, setActiveCommand] = useState(null);

  const runCommand = (command) => {
    setActiveCommand(command);
    setAssistantState("listening");

    setTimeout(() => {
      setAssistantState("thinking");
    }, 900);

    setTimeout(() => {
      setAssistantState("speaking");

      if (command.action === "navigation") setActiveScreen("navigation");
      if (command.action === "health") setActiveScreen("health");
      if (command.action === "sport") {
        setActiveMode("sport");
        setAmbientColor(null);
      }
      if (command.action === "climate") setActiveScreen("climate");
    }, 1900);

    setTimeout(() => {
      setAssistantState("idle");
    }, 4200);
  };

  return (
    <section className="aura-assistant-premium-screen">
      <div className="aura-assistant-left">
        <div className="aura-assistant-header">
          <span>AURA Assistant</span>
          <h2>Hello Ricardo</h2>
          <p>
            Voice-guided cockpit control for navigation, climate, diagnostics
            and drive modes.
          </p>
        </div>

        <div className="aura-assistant-response-card">
          <div className={`aura-assistant-orb-premium ${assistantState}`}>
            <FiMic />
          </div>

          <div>
            <small>
              {assistantState === "idle" && "Ready"}
              {assistantState === "listening" && "Listening..."}
              {assistantState === "thinking" && "Processing..."}
              {assistantState === "speaking" && "Action complete"}
            </small>

            <strong>
              {activeCommand ? activeCommand.state : "How can I help?"}
            </strong>

            <p>
              {activeCommand
                ? activeCommand.response
                : "Select a command or tap the assistant orb to simulate a voice interaction."}
            </p>
          </div>
        </div>
      </div>

      <div className="aura-assistant-command-grid">
        {commands.map((command) => (
          <button key={command.label} onClick={() => runCommand(command)}>
            {command.icon}
            <div>
              <strong>{command.label}</strong>
              <span>Tap to simulate</span>
            </div>
          </button>
        ))}
      </div>

      <div className="aura-assistant-status-row">
        <div>
          <FiCheckCircle />
          <span>Voice ready</span>
        </div>

        <div>
          <FiMessageCircle />
          <span>Context aware</span>
        </div>

        <div>
          <FiZap />
          <span>Vehicle linked</span>
        </div>
      </div>
    </section>
  );
}