import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

const FRONT_LIGHTS = [
  "2008p24_headlightglass_L",
  "2008p24_headlightglass_R",
];

const REAR_LIGHTS = [
  "2008p24_taillightglass_L",
  "2008p24_taillightglass_R",
];

function prepareLightMaterial(object, color) {
  if (!object?.material) return [];

  const materials = Array.isArray(object.material)
    ? object.material
    : [object.material];

  return materials.map((material) => {
    const cloned = material.clone();

    cloned.emissive = new THREE.Color(color);
    cloned.emissiveIntensity = 0;
    cloned.toneMapped = false;
    cloned.needsUpdate = true;

    object.material = Array.isArray(object.material) ? materials.map(() => cloned) : cloned;

    return cloned;
  });
}

export default function HeadlightWelcome({ active, scene }) {
  const frontMaterialsRef = useRef([]);
  const rearMaterialsRef = useRef([]);
  const frontLeftRef = useRef(null);
  const frontRightRef = useRef(null);
  const sweepRef = useRef(null);

  const targets = useMemo(() => {
    if (!scene) return null;

    const frontObjects = FRONT_LIGHTS.map((name) =>
      scene.getObjectByName(name)
    ).filter(Boolean);

    const rearObjects = REAR_LIGHTS.map((name) =>
      scene.getObjectByName(name)
    ).filter(Boolean);

    return { frontObjects, rearObjects };
  }, [scene]);

  useEffect(() => {
    if (!targets) return;

    frontMaterialsRef.current = targets.frontObjects.flatMap((object) =>
      prepareLightMaterial(object, "#7ddcff")
    );

    rearMaterialsRef.current = targets.rearObjects.flatMap((object) =>
      prepareLightMaterial(object, "#ff3344")
    );
  }, [targets]);

  useEffect(() => {
    const frontMaterials = frontMaterialsRef.current;
    const rearMaterials = rearMaterialsRef.current;

    gsap.killTweensOf([
      ...frontMaterials,
      ...rearMaterials,
      frontLeftRef.current,
      frontRightRef.current,
      sweepRef.current,
    ]);

    if (active) {
      gsap.to(frontMaterials, {
        emissiveIntensity: 2.8,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
      });

      gsap.to(rearMaterials, {
        emissiveIntensity: 2.2,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
      });

      gsap.fromTo(
        frontMaterials,
        { emissiveIntensity: 0 },
        {
          emissiveIntensity: 3.5,
          duration: 0.28,
          repeat: 2,
          yoyo: true,
          ease: "power2.inOut",
          delay: 0.35,
        }
      );

      gsap.to([frontLeftRef.current, frontRightRef.current], {
        intensity: 3.8,
        duration: 0.65,
        ease: "power2.out",
      });

      gsap.fromTo(
        sweepRef.current,
        { intensity: 0 },
        {
          intensity: 2.5,
          duration: 0.32,
          repeat: 3,
          yoyo: true,
          ease: "power2.inOut",
        }
      );
    } else {
      gsap.to([...frontMaterials, ...rearMaterials], {
        emissiveIntensity: 0,
        duration: 0.45,
        ease: "power2.out",
      });

      gsap.to([frontLeftRef.current, frontRightRef.current, sweepRef.current], {
        intensity: 0,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  }, [active]);

  return (
    <>
      <pointLight
        ref={frontLeftRef}
        position={[-0.65, 0.72, 1.85]}
        color="#7ddcff"
        intensity={0}
        distance={3}
      />

      <pointLight
        ref={frontRightRef}
        position={[0.65, 0.72, 1.85]}
        color="#7ddcff"
        intensity={0}
        distance={3}
      />

      <spotLight
        ref={sweepRef}
        position={[0, 0.85, 2.1]}
        angle={0.45}
        penumbra={0.8}
        color="#7ddcff"
        intensity={0}
        distance={4.5}
      />
    </>
  );
}