import { Html } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useEffect, useState } from "react";

export default function ScreenAnchorDebug({ scene, targetName, label }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!scene) return;

    const target = scene.getObjectByName(targetName);

    if (!target) {
      console.warn(`No se encontró el objeto: ${targetName}`);
      return;
    }

    const box = new Box3().setFromObject(target);
    const center = new Vector3();

    box.getCenter(center);

    setPosition(center);
  }, [scene, targetName]);

  if (!position) return null;

  return (
    <Html position={position} center>
      <div className="screen-anchor-debug">{label}</div>
    </Html>
  );
}