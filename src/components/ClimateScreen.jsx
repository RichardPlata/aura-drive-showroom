import { FiThermometer, FiWind, FiZap } from "react-icons/fi";

export default function ClimateScreen() {
  return (
    <div className="climate-embedded-v2">
      <div className="climate-main">
        <div>
          <span>Climate Control</span>
          <h2>21°C</h2>
          <p>Cabin temperature optimized</p>
        </div>

        <div className="climate-orb">
          <FiThermometer />
        </div>
      </div>

      <div className="climate-cards-row">
        <div className="climate-mini-card">
          <small>Driver</small>
          <strong>21°C</strong>
        </div>

        <div className="climate-mini-card">
          <small>Passenger</small>
          <strong>22°C</strong>
        </div>

        <div className="climate-mini-card climate-fan">
          <small>
            <FiWind /> Fan
          </small>

          <div className="fan-dots">
            {[1, 2, 3, 4, 5].map((bar) => (
              <span key={bar} className={bar <= 3 ? "active" : ""} />
            ))}
          </div>
        </div>

        <div className="climate-mini-card">
          <small>
            <FiZap /> Seat
          </small>
          <strong>Auto</strong>
        </div>
      </div>

      <div className="climate-controls-row">
        <div className="climate-toggle-group">
          <button className="active">AUTO</button>
          <button>A/C</button>
          <button>SYNC</button>
        </div>

        <div className="climate-status-pill">
          Cabin comfort active
        </div>
      </div>
    </div>
  );
}