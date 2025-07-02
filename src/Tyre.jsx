import { React } from "react";
import { useRef, useState } from "react";
import { Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath"; // Make sure you have this
import * as THREE from "three";

function Tyre({ hoverSound }) {

  let [hover, setHover] = useState(false);
  let textRef = useRef();
  let targetScale = hover ? 1.1 : 1;

  useFrame((state, delta) => {
    easing.damp3(
      textRef.current.scale,
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.3, // smoothing factor
      delta
    );
  });

  const mouseIn = () => {
    if (!hover) {
      hoverSound.current?.play();
      setHover(true);
    }
  };

  const mouseOut = () => {
    if (hover) {
      hoverSound.current?.play();
      setHover(false);
    }
  };

  let meshRef = useRef(null);
  useFrame((state, delta) => {

    const ior = hover ? 1.2 : 1;
    const chroma = hover ? .2 : 0.1;
    const rough = hover ? .15 : 0.1;
    const speed = hover ? .002 : 0.005;

    meshRef.current.rotation.y -= speed;
    meshRef.current.rotation.x -= speed;

    meshRef.current.material.ior = ior;
    meshRef.current.material.chroma = chroma;
    meshRef.current.material.roughness = rough;
  });

  return (
    <>
      <Text
        letterSpacing={-0.05}
        ref={textRef}
        onPointerOver={mouseIn}
        onPointerOut={mouseOut}
        fontSize={5.5}
        fontWeight={900}
        position={[0, 0, -5]}
      >
        {" "}
        F*ck?  
      </Text>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.6, 32, 100]} />
        <MeshTransmissionMaterial  thickness={1} transmission={1} backSide={true} />
      </mesh>
    </>
  );
}

export default Tyre;
