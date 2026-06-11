import { Html } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useEffect, useState } from "react";
import InstrumentCluster from "./InstrumentCluster";

export default function ClusterAnchorUI({
  scene,
  targetName,
  activeMode,
  activeScreen,
  bootStage,
  isOffline,
}) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!scene) return;

    const target = scene.getObjectByName(targetName);

    if (!target) {
      console.warn(`No se encontró el objeto del cluster: ${targetName}`);
      return;
    }

    const box = new Box3().setFromObject(target);
    const center = new Vector3();

    box.getCenter(center);

    center.x += 0.0;
    center.y += 0.005;
    center.z += 0.04;

    setPosition(center);
  }, [scene, targetName]);

  if (!position) return null;

  return (
    <Html position={position} center>
      <div className="anchored-cluster-ui">
        {isOffline ? (
          <div className="cluster-off-placeholder embedded">
            <span>Cluster offline</span>
          </div>
        ) : (
          <InstrumentCluster
            activeMode={activeMode}
            activeScreen={activeScreen}
            bootStage={bootStage}
            isFocused={false}
          />
        )}
      </div>
    </Html>
  );
}