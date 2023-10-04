"use client";
import { Vologram } from "volograms-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";
import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    // renderer.setPixelRatio(window.devicePixelRatio * 0.5);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var stats = new Stats();
    document.body.appendChild(stats.dom);
    // renderer.setSize(
    //   refContainer.current.offsetWidth,
    //   refContainer.current.offsetWidth
    // );

    // window.addEventListener(
    //   "resize",
    //   function () {
    //     renderer.setSize(
    //       refContainer.current.offsetWidth,
    //       refContainer.current.offsetWidth
    //     );
    //   },
    //   true
    // );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    scene.add(new THREE.AmbientLight(0xffffff, 3));

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 2, 2);
    controls.target.set(0, 0.9, 0);
    controls.update();

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    const updateLoading = (p, play) => {
      const el = document.getElementById("loading");
      el.innerText = Math.round(p * 100) + "%";

      if (window.location.hash) {
        vologram.elVideo.play();
      }

      if (p === 1.0) {
        //when loaded/100%
        // Play and unmute when clicking on canvas (because of Chrome policy; cannot be autoplay)
        renderer.domElement.onclick = (e) => {
          vologram.elVideo.muted = true;
          renderer.domElement.onclick = null;
        };
      }
    };

    // Play/Pause button and Sound/Mute button
    document.getElementById("playpause").onclick = (e) =>
      vologram.elVideo.paused
        ? vologram.elVideo.play()
        : vologram.elVideo.pause();

    let vologram = new Vologram("assets/left_1690983019490_ld", updateLoading);
    scene.add(vologram);

    var animate = function () {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);
  return (
    <>
      <div>
        <span id="gui">
          <span id="loading">...</span>
          <button id="playpause">⏯︎</button>
          <button id="sound">🔈</button>
        </span>
      </div>
      <div className="container" ref={refContainer}></div>
    </>
  );
}

export default MyThree;
