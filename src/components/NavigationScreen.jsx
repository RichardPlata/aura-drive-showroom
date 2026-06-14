import {
  FiNavigation,
  FiMapPin,
  FiClock,
  FiBatteryCharging,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";

export default function NavigationScreen() {
  return (
    <section className="navigation-premium-screen">
      <div className="navigation-trip-card">
        <div className="navigation-title">
          <span>Navigation</span>
          <h2>Turn right</h2>
          <p>In 400 m onto Av. Libertador</p>
        </div>

        <div className="navigation-destination-card">
          <FiMapPin />
          <div>
            <small>Destination</small>
            <strong>Home</strong>
            <span>ETA 10:58 · 16 km</span>
          </div>
        </div>

        <div className="navigation-next-card">
          <div className="navigation-arrow-orb">
            <FiArrowRight />
          </div>

          <div>
            <small>Next maneuver</small>
            <strong>Right turn</strong>
            <span>Stay in the right lane</span>
          </div>
        </div>
      </div>

      <div className="navigation-map-card">
        <div className="navigation-map-grid" />
        <div className="navigation-route-glow" />
        <div className="navigation-route-main" />
        <div className="navigation-route-point start" />
        <div className="navigation-route-point end" />
        <div className="navigation-car-marker">
          <FiNavigation />
        </div>
      </div>

      <div className="navigation-bottom-stats">
        <div>
          <FiClock />
          <strong>18 min</strong>
          <span>ETA</span>
        </div>

        <div>
          <FiNavigation />
          <strong>16 km</strong>
          <span>Distance</span>
        </div>

        <div>
          <FiBatteryCharging />
          <strong>82%</strong>
          <span>Arrival</span>
        </div>

        <button>
          <FiZap />
          End trip
        </button>
      </div>
    </section>
  );
}