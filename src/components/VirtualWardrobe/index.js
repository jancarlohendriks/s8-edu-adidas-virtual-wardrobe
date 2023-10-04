"use client";
import React, { useRef, useEffect } from "react";
import { Vologram } from "volograms-js";
import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { GLTFLoader } from "three-gltf-loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import stadium from "@/assets/stadium.glb?url";
import "./styles.scss";

const VirtualWardobe = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // Create a GLTF loader
    const loader = new GLTFLoader();

    // Load the GLB model
    loader.load("assets/stadium.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      console.log(model);

      // Optional: You can perform additional operations on the loaded model here.

      // Create an instance of OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // Add damping for smoother camera movement
      controls.dampingFactor = 0.05; // Adjust damping factor as needed
      controls.rotateSpeed = 0.5; // Adjust rotation speed as needed

      // Create an animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Perform any animations or updates here.

        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);

  return <div ref={containerRef} />;
};

export default VirtualWardobe;

// "use client";
// import React, { useRef } from "react";
// import { Canvas, extend, useLoader } from "@react-three/fiber";
// import { Html, Sky, OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
// import { Vologram } from "volograms-js";
// import { Suspense } from "react";
// import "./styles.scss";
// // extend({ OrbitControls });

// function Scene() {
//   // const controls = useRef();
//   // const { nodes } = useLoader(GLTFLoader, "./assets/stadium.glb");
//   const Stadium = useLoader(GLTFLoader, "./assets/stadium.glb");
//   // console.log(Stadium);

//   const updateLoading = (p, play) => {
//     // Update loading UI here if needed
//   };

//   // let vologram = new Vologram("assets/left_1690983019490_ld", updateLoading);

//   return (
//     <>
//       {/* <ambientLight intensity={1} /> */}
//       <Sky />
//       <orbitControls />
//       <group position={[7, 10.05, -8]} rotation-y={-Math.PI / 2}>
//         <primitive
//           dispose={null}
//           // key={nodes.uuid}
//           object={Stadium}
//           scale={[1, 1, 1]}
//         />
//       </group>
//       {/* <VologramComponent vologram={vologram} /> */}
//     </>
//   );
// }

// function VologramComponent({ vologram }) {
//   const playPause = () => {
//     vologram.elVideo.paused
//       ? vologram.elVideo.play()
//       : vologram.elVideo.pause();
//   };

//   const changeVologram = (vologramName) => {
//     vologram.clear();
//     vologram = new Vologram(`assets/${vologramName}_ld`, updateLoading);
//   };

//   return (
//     // <Html>
//     <div>
//       <button id="playpause" onClick={playPause}>
//         Play/Pause
//       </button>
//       <button id="left" onClick={() => changeVologram("left_1690983019490")}>
//         Left
//       </button>
//       <button id="head" onClick={() => changeVologram("head_1690983148857")}>
//         Head
//       </button>
//       <button id="right" onClick={() => changeVologram("right_1690983080648")}>
//         Right
//       </button>
//     </div>
//     // </Html>
//   );
// }

// function VirtualWardobe() {
//   return (
//     <div id="tryout">
//       <Canvas>
//         <Html>
//           <Suspense fallback={null}>
//             <Scene />
//           </Suspense>
//         </Html>
//       </Canvas>
//     </div>
//   );
// }

// export default VirtualWardobe;
