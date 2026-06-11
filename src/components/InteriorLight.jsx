const modeColors = {
  comfort: "#4FC3F7",
  sport: "#FF4D4D",
  eco: "#66BB6A",
};

const ambientColors = {
  blue: "#3B82F6",
  purple: "#8B5CF6",
  cyan: "#06B6D4",
  green: "#22C55E",
  orange: "#F97316",
  red: "#EF4444",
};

export default function InteriorLight({ driveMode, ambientColor }) {
  const color = ambientColor
    ? ambientColors[ambientColor]
    : modeColors[driveMode] || modeColors.comfort;

  return (
    <>
      <pointLight position={[0.2, 1.25, 0.1]} intensity={1.3} color={color} />
      <pointLight position={[0.7, 1.1, -0.2]} intensity={0.9} color={color} />
      <pointLight
        position={[-0.35, 1.15, -0.15]}
        intensity={0.55}
        color={color}
      />
    </>
  );
}