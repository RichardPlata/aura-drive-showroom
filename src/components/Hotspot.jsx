import { Html } from "@react-three/drei";

export default function Hotspot({ position, label, onClick }) {
  return (
    <Html position={position} center>
      <button className="hotspot" onClick={onClick}>
        <span />
        {label}
      </button>
    </Html>
  );
}