import { Html } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useEffect, useState } from "react";
import CenterScreenOverlay from "./CenterScreenOverlay";

export default function ScreenAnchorUI({
  scene,
  targetName,
  activeScreen,
  setActiveScreen,
  activeMode,
  setActiveMode,
  ambientColor,
  setAmbientColor,
  bootStage,
  headlightsActive,
  setHeadlightsActive,
  playWelcomeSequence,
  onStartVehicle,
}) {
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

    center.x += 0.02;
    center.y -= 0.015;
    center.z += 0.045;

    setPosition(center);
  }, [scene, targetName]);

  if (!position) return null;

  return (
    <Html position={position} center>
      <div className="anchored-center-ui">
        <CenterScreenOverlay
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          ambientColor={ambientColor}
          setAmbientColor={setAmbientColor}
          bootStage={bootStage}
          headlightsActive={headlightsActive}
          setHeadlightsActive={setHeadlightsActive}
          playWelcomeSequence={playWelcomeSequence}
          onStartVehicle={onStartVehicle}
        />
      </div>
    </Html>
  );
}