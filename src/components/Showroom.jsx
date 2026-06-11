import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { MOUSE, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Hotspot from "./Hotspot";
import InteriorLight from "./InteriorLight";
import ScreenAnchorUI from "./ScreenAnchorUI";
import ClusterAnchorUI from "./ClusterAnchorUI";
import HeadlightWelcome from "./HeadlightWelcome";
import HUDOverlay from "./HUDOverlay";
import CenterScreenOverlay from "./CenterScreenOverlay";
import InstrumentCluster from "./InstrumentCluster";

const INTERIOR_POSITION = new Vector3(0.26, 1.34, -0.32);
const DASHBOARD_TARGET = new Vector3(0.2, 1.08, 0.2);

function CarModel({ doorOpen, onSceneReady }) {
  const { scene } = useGLTF("/models/AURA_Drive_2008.glb");
  const doorRef = useRef(null);

  useEffect(() => {
    doorRef.current = scene.getObjectByName("2008p24_door_FL");
    onSceneReady?.(scene);
  }, [scene, onSceneReady]);

  useEffect(() => {
    if (!doorRef.current) return;

    gsap.to(doorRef.current.rotation, {
      y: doorOpen ? -0.8 : 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, [doorOpen]);

  return <primitive object={scene} />;
}

function CameraRig({ view }) {
  const { camera } = useThree();
  const controlsRef = useRef(null);

  useEffect(() => {
    gsap.killTweensOf(camera.position);

    if (view === "interior") {
      gsap.to(camera.position, {
        x: INTERIOR_POSITION.x,
        y: INTERIOR_POSITION.y,
        z: INTERIOR_POSITION.z,
        duration: 1.25,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(DASHBOARD_TARGET),
        onComplete: () => camera.lookAt(DASHBOARD_TARGET),
      });

      return;
    }

    if (view === "exterior" && controlsRef.current) {
      gsap.to(camera.position, {
        x: 4,
        y: 2,
        z: 6,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => controlsRef.current.update(),
      });

      gsap.to(controlsRef.current.target, {
        x: 0,
        y: 0.7,
        z: 0,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => controlsRef.current.update(),
      });
    }
  }, [view, camera]);

  if (view === "interior") return null;

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      enablePan
      enableZoom
      enableRotate
      panSpeed={2.5}
      zoomSpeed={1.5}
      rotateSpeed={0.8}
      minDistance={0.1}
      maxDistance={20}
      mouseButtons={{
        LEFT: MOUSE.ROTATE,
        MIDDLE: MOUSE.PAN,
        RIGHT: MOUSE.PAN,
      }}
    />
  );
}

export default function Showroom() {
  const [carScene, setCarScene] = useState(null);
  const [doorOpen, setDoorOpen] = useState(false);
  const [view, setView] = useState("exterior");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hmiVisible, setHmiVisible] = useState(false);

  const [driveMode, setDriveMode] = useState("comfort");
  const [ambientColor, setAmbientColor] = useState(null);
  const [activeScreen, setActiveScreen] = useState("welcome");

  const [systemReady, setSystemReady] = useState(false);
  const [headlightWelcome, setHeadlightWelcome] = useState(false);
  const [bootStage, setBootStage] = useState("off");
  const [uiFocusMode, setUiFocusMode] = useState(false);
  const [uiViewVisible, setUiViewVisible] = useState(false);

  const bootTimersRef = useRef([]);

  const clearBootTimers = () => {
    bootTimersRef.current.forEach((timer) => clearTimeout(timer));
    bootTimersRef.current = [];
  };

  useEffect(() => {
    return () => clearBootTimers();
  }, []);

  const handleDriveModeChange = (mode) => {
    setDriveMode(mode);
    setAmbientColor(null);
  };

  const startVehicleSystem = () => {
    clearBootTimers();

    setHeadlightWelcome(true);
    setActiveScreen("welcome");
    setBootStage("boot");

    bootTimersRef.current.push(
  setTimeout(() => setBootStage("initializing"), 1200)
);

bootTimersRef.current.push(
  setTimeout(() => setBootStage("battery"), 2800)
);

bootTimersRef.current.push(
  setTimeout(() => setBootStage("ready"), 4500)
);

bootTimersRef.current.push(
  setTimeout(() => setBootStage("welcome"), 6200)
);

bootTimersRef.current.push(
  setTimeout(() => {
    setActiveScreen("home");
    setBootStage("home");
  }, 8000)
);
  };

  const enterVehicle = () => {
    clearBootTimers();

    setIsTransitioning(true);
    setHmiVisible(false);
    setDoorOpen(true);
    setView("interior");
    setSystemReady(true);
    setUiFocusMode(false);
    setActiveScreen("welcome");
    setBootStage("off");
    setHeadlightWelcome(false);

    bootTimersRef.current.push(setTimeout(() => setIsTransitioning(false), 950));
    bootTimersRef.current.push(setTimeout(() => setHmiVisible(true), 1200));
  };

  const exitVehicle = () => {
    clearBootTimers();

    setHeadlightWelcome(false);
    setIsTransitioning(true);
    setUiFocusMode(false);
    setHmiVisible(false);

    setTimeout(() => {
      setSystemReady(false);
      setBootStage("off");
    }, 250);

    setTimeout(() => setView("exterior"), 500);
    setTimeout(() => setDoorOpen(false), 1200);

    setTimeout(() => {
      setActiveScreen("welcome");
      setIsTransitioning(false);
    }, 1700);
  };

  const toggleDoor = () => {
    if (!doorOpen) {
      setHeadlightWelcome(true);
      setDoorOpen(true);
      return;
    }

    setHeadlightWelcome(false);
    setDoorOpen(false);
  };

  const playWelcomeSequence = () => {
    setHeadlightWelcome(false);
    setTimeout(() => setHeadlightWelcome(true), 80);
  };

  const isVehicleOn = bootStage !== "off";

  return (
    <div className={`showroom mode-${driveMode}`}>
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <HeadlightWelcome active={headlightWelcome} scene={carScene} />

        {view === "interior" && isVehicleOn && (
          <InteriorLight driveMode={driveMode} ambientColor={ambientColor} />
        )}

        <CarModel doorOpen={doorOpen} onSceneReady={setCarScene} />

        {view === "interior" && systemReady && hmiVisible && carScene && !uiFocusMode && (
          <>
            <ScreenAnchorUI
              scene={carScene}
              targetName="2008p24_dashboard"
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              activeMode={driveMode}
              setActiveMode={handleDriveModeChange}
              ambientColor={ambientColor}
              setAmbientColor={setAmbientColor}
              bootStage={bootStage}
              headlightsActive={headlightWelcome}
              setHeadlightsActive={setHeadlightWelcome}
              playWelcomeSequence={playWelcomeSequence}
              onStartVehicle={startVehicleSystem}
            />

            <ClusterAnchorUI
              scene={carScene}
              targetName="2008p24_gauges"
              activeMode={driveMode}
              activeScreen={activeScreen}
              bootStage={bootStage}
              isOffline={!isVehicleOn}
            />
          </>
        )}

        {view === "exterior" && (
          <>
            <Hotspot
              position={[0, 2.2, 0]}
              label={doorOpen ? "Close Door" : "Open Door"}
              onClick={toggleDoor}
            />

            {doorOpen && (
              <Hotspot
                position={[0.3, 1.35, -0.25]}
                label="Enter Vehicle"
                onClick={enterVehicle}
              />
            )}
          </>
        )}

        <Environment preset="city" />
        <CameraRig view={view} />
      </Canvas>

      {view === "interior" && (
        <button className="exit-button" onClick={exitVehicle}>
          Exit Vehicle
        </button>
      )}

      {view === "interior" && systemReady && hmiVisible && isVehicleOn && !uiFocusMode && (
        <button className="enter-ui-view-button" onClick={() => {
          setUiFocusMode(true);

          setTimeout(() => {
          setUiViewVisible(true);
          }, 50);
         }}>
          Enter UI View
        </button>
      )}

      {view === "interior" && systemReady && hmiVisible && uiFocusMode && (
        <div className={`cockpit-focus-layer ${isVehicleOn ? "system-on" : "system-off" } ${uiViewVisible ? "visible" : ""}`}
       >
          <div className="cockpit-focus-header">
            <div>
              <span>AURA DRIVE</span>
              <strong>{isVehicleOn ? "Cockpit Experience" : "Vehicle Offline"}</strong>
            </div>

            <button
       onClick={() => {
        setUiViewVisible(false);

        setTimeout(() => {
         setUiFocusMode(false);
        }, 350);
         }}
        >Exit UI View</button>
          </div>

          <div className="cockpit-focus-screens">
            <div className="cockpit-focus-cluster">
              {isVehicleOn ? (
                <InstrumentCluster
                  activeMode={driveMode}
                  activeScreen={activeScreen}
                  isFocused
                />
              ) : (
                <div className="cluster-off-placeholder">
                  <span>Cluster offline</span>
                </div>
              )}
            </div>

            <div className="cockpit-focus-center">
              <CenterScreenOverlay
                activeScreen={activeScreen}
                setActiveScreen={setActiveScreen}
                activeMode={driveMode}
                setActiveMode={handleDriveModeChange}
                ambientColor={ambientColor}
                setAmbientColor={setAmbientColor}
                bootStage={bootStage}
                headlightsActive={headlightWelcome}
                setHeadlightsActive={setHeadlightWelcome}
                playWelcomeSequence={playWelcomeSequence}
                onStartVehicle={startVehicleSystem}
              />
            </div>
          </div>
        </div>
      )}

      {view === "interior" &&
        systemReady &&
        hmiVisible &&
        isVehicleOn &&
        activeScreen !== "navigation" && (
          <HUDOverlay activeScreen={activeScreen} />
        )}

      <div className={`screen-fade ${isTransitioning ? "active" : ""}`} />
    </div>
  );
}