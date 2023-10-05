"use client";
import React, { useRef, useEffect } from "react";
import { Vologram } from "volograms-js";
import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./styles.scss";

const VirtualWardrobe = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Create a scene, camera, and renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 4;

    // Initialize the scene, sky, and model
    initScene();
    initSky();
    loadModel();
    initVologram();

    window.addEventListener("resize", onWindowResize, false);

    animate();

    // Function to initialize the Three.js scene
    function initScene() {
      const WIDTH = window.innerWidth;
      const HEIGHT = WIDTH / (16 / 9);

      camera.aspect = WIDTH / HEIGHT;
      camera.position.set(0, 1, 2);
      camera.updateProjectionMatrix();

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.7;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      scene.add(new THREE.AmbientLight(0xffffff, 1));
      controls.target.set(0, 0.9, 0);
      controls.update();
    }

    // Function to initialize the sky
    function initSky() {
      const sky = new Sky();
      sky.scale.setScalar(450000);
      scene.add(sky);

      const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 2,
        azimuth: 180,
        exposure: renderer.toneMappingExposure,
      };

      const uniforms = sky.material.uniforms;
      uniforms["turbidity"].value = effectController.turbidity;
      uniforms["rayleigh"].value = effectController.rayleigh;
      uniforms["mieCoefficient"].value = effectController.mieCoefficient;
      uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

      const sun = new THREE.Vector3();
      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
      const theta = THREE.MathUtils.degToRad(effectController.azimuth);
      sun.setFromSphericalCoords(1, phi, theta);
      uniforms["sunPosition"].value.copy(sun);
      renderer.toneMappingExposure = effectController.exposure;
    }

    // Function to load the GLTF model
    function loadModel() {
      // Load the GLB model
      window.createImageBitmap = undefined;
      const loader = new GLTFLoader();
      loader.load("assets/stadium.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(7, 10.05, -8);
        model.rotateY(-91);
        scene.add(model);
      });
    }

    // Function to handle window resize
    function onWindowResize() {
      const WIDTH = window.innerWidth;
      const HEIGHT = WIDTH / (16 / 9);

      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
      renderer.setSize(WIDTH, HEIGHT);
    }

    // Function for the animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    // Function to initialize the Vologram
    function initVologram() {
      const updateLoading = (p, play) => {
        vologram.elVideo.play();
      };

      let vologram = new Vologram(
        "assets/left_1690983019490_ld",
        updateLoading
      );
      scene.add(vologram);

      // Play/Pause button and Sound/Mute button
      document.getElementById("playpause").onclick = (e) =>
        vologram.elVideo.paused
          ? vologram.elVideo.play()
          : vologram.elVideo.pause();

      document.getElementById("left").onclick = (e) => {
        vologram.clear();
        vologram = new Vologram("assets/left_1690983019490_ld", updateLoading);
        scene.add(vologram);
      };

      document.getElementById("head").onclick = (e) => {
        vologram.clear();
        vologram = new Vologram("assets/head_1690983148857_ld", updateLoading);
        scene.add(vologram);
      };

      document.getElementById("right").onclick = (e) => {
        vologram.clear();
        vologram = new Vologram("assets/right_1690983080648_ld", updateLoading);
        scene.add(vologram);
      };
    }
  }, []);

  return (
    <div id="interactive">
      <div ref={containerRef}>
        <div id="icon-click"></div>
        <div id="gui">
          <div id="gui-controls">
            <div className="gui-controls__left">
              <button className="gui-button" id="playpause">
                <span></span>
              </button>
            </div>
            <div className="gui-controls__right">
              <span>Actions:</span>
              &nbsp;
              <button className="gui-button" id="left">
                <span>Left</span>
              </button>
              <button className="gui-button" id="head">
                <span>Head</span>
              </button>
              <button className="gui-button" id="right">
                <span>Right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualWardrobe;
