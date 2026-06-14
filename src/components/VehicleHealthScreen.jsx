import {
  FiBatteryCharging,
  FiCheckCircle,
  FiCpu,
  FiDisc,
  FiTool,
  FiZap,
} from "react-icons/fi";

const healthItems = [
  {
    icon: <FiBatteryCharging />,
    label: "Battery",
    value: "87%",
    status: "Optimal",
  },
  {
    icon: <FiDisc />,
    label: "Tire Pressure",
    value: "34 PSI",
    status: "Balanced",
  },
  {
    icon: <FiZap />,
    label: "Brake System",
    value: "92%",
    status: "Healthy",
  },
  {
    icon: <FiCpu />,
    label: "Diagnostics",
    value: "0",
    status: "No issues",
  },
];

export default function VehicleHealthScreen() {
  return (
    <section className="vehicle-health-premium-screen">
      <div className="vehicle-health-left">
        <div className="vehicle-health-header">
          <span>Vehicle Health</span>
          <h2>System Status</h2>
          <p>All core systems are operating within optimal range.</p>
        </div>

        <div className="vehicle-health-score-card">
          <div className="health-score-ring">
            <strong>96</strong>
            <span>/100</span>
          </div>

          <div>
            <small>Overall Score</small>
            <h3>Excellent</h3>
            <p>Next maintenance in 3,200 km</p>
          </div>
        </div>

        <div className="vehicle-health-list-premium">
          {healthItems.map((item) => (
            <div key={item.label}>
              <span>
                {item.icon}
                {item.label}
              </span>

              <strong>{item.value}</strong>

              <small>
                <FiCheckCircle />
                {item.status}
              </small>
            </div>
          ))}
        </div>
      </div>

      <div className="vehicle-health-visual">
        <div className="health-scan-line" />

        <div className="health-car-top">
          <div className="health-car-cabin" />
          <div className="health-car-body-premium" />
          <div className="health-wheel w1" />
          <div className="health-wheel w2" />
          <div className="health-wheel w3" />
          <div className="health-wheel w4" />

          <div className="health-node-premium n1" />
          <div className="health-node-premium n2" />
          <div className="health-node-premium n3" />
        </div>

        <div className="health-diagnostics-card">
          <FiTool />
          <div>
            <strong>Diagnostics Complete</strong>
            <span>No critical alerts detected</span>
          </div>
        </div>
      </div>
    </section>
  );
}