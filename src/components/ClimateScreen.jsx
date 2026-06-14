import { useState } from "react";
import {
  FiThermometer,
  FiWind,
  FiZap,
  FiMinus,
  FiPlus,
  FiDroplet,
} from "react-icons/fi";

const modeLabels = {
  comfort: "Comfort",
  sport: "Sport",
  eco: "Eco",
};

export default function ClimateScreen({ activeMode = "comfort" }) {
  const [driverTemp, setDriverTemp] = useState(21);
  const [passengerTemp, setPassengerTemp] = useState(22);
  const [fanSpeed, setFanSpeed] = useState(3);
  const [autoMode, setAutoMode] = useState(true);
  const [acMode, setAcMode] = useState(true);
  const [syncMode, setSyncMode] = useState(false);

  const increaseDriver = () => setDriverTemp((temp) => Math.min(temp + 1, 28));
  const decreaseDriver = () => setDriverTemp((temp) => Math.max(temp - 1, 16));

  const increasePassenger = () =>
    setPassengerTemp((temp) => Math.min(temp + 1, 28));

  const decreasePassenger = () =>
    setPassengerTemp((temp) => Math.max(temp - 1, 16));

  const changeFanSpeed = (speed) => {
    setFanSpeed(speed);
    setAutoMode(false);
  };

  const toggleSync = () => {
    setSyncMode((prev) => {
      const next = !prev;

      if (!prev) {
        setPassengerTemp(driverTemp);
      }

      return next;
    });
  };

  return (
    <section className="climate-premium-screen">
      <div className="climate-premium-left">
        <div className="climate-premium-header">
          <span>Climate Control</span>
          <h2>{driverTemp}°C</h2>
          <p>Cabin temperature optimized for {modeLabels[activeMode]} mode.</p>
        </div>

        <div className="climate-temp-zone">
          <div className="climate-zone-card">
            <small>Driver</small>

            <div className="climate-stepper">
              <button onClick={decreaseDriver}>
                <FiMinus />
              </button>

              <strong>{driverTemp}°</strong>

              <button onClick={increaseDriver}>
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="climate-zone-card">
            <small>Passenger</small>

            <div className="climate-stepper">
              <button onClick={decreasePassenger} disabled={syncMode}>
                <FiMinus />
              </button>

              <strong>{passengerTemp}°</strong>

              <button onClick={increasePassenger} disabled={syncMode}>
                <FiPlus />
              </button>
            </div>
          </div>
        </div>

        <div className="climate-fan-panel">
          <div>
            <span>
              <FiWind />
              Fan Speed
            </span>
            <strong>{autoMode ? "Auto" : `Level ${fanSpeed}`}</strong>
          </div>

          <div className="climate-fan-bars">
            {[1, 2, 3, 4, 5].map((speed) => (
              <button
                key={speed}
                className={speed <= fanSpeed ? "active" : ""}
                onClick={() => changeFanSpeed(speed)}
                aria-label={`Fan speed ${speed}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="climate-premium-visual">
        <div className="climate-airflow airflow-one" />
        <div className="climate-airflow airflow-two" />
        <div className="climate-airflow airflow-three" />

        <div className="climate-orb-premium">
          <FiThermometer />
        </div>

        <div className="climate-cabin-shape">
          <div className="climate-seat left" />
          <div className="climate-seat right" />
          <div className="climate-dashboard-line" />
        </div>

        <div className="climate-status-card">
          <FiDroplet />
          <div>
            <strong>Air Quality</strong>
            <span>Clean cabin flow active</span>
          </div>
        </div>
      </div>

      <div className="climate-premium-actions">
        <button
          className={autoMode ? "active" : ""}
          onClick={() => setAutoMode((prev) => !prev)}
        >
          <FiZap />
          AUTO
        </button>

        <button
          className={acMode ? "active" : ""}
          onClick={() => setAcMode((prev) => !prev)}
        >
          A/C
        </button>

        <button className={syncMode ? "active" : ""} onClick={toggleSync}>
          SYNC
        </button>
      </div>
    </section>
  );
}