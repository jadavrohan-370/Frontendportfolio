import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

export function useHeroScene(canvas: HTMLCanvasElement) {
  const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

  // High quality geometry - Reduced for mobile performance
  const geometry = new THREE.IcosahedronGeometry(2, isMobile ? 32 : 64);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#7F5AF0") },
      uColorB: { value: new THREE.Color("#2CB67D") },
    },
    transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  camera.position.z = 5;

  const timer = new THREE.Timer();

  function animate() {
    timer.update();
    const elapsed = timer.getElapsed();

    // @ts-ignore
    material.uniforms.uTime.value = elapsed;

    mesh.rotation.y = elapsed * 0.4;
    mesh.rotation.x = elapsed * 0.2;

    // Subtle float
    mesh.position.y = Math.sin(elapsed) * 0.1;

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", resize);

  return () => {
    window.removeEventListener("resize", resize);
    renderer.setAnimationLoop(null);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
