/* jshint -W069, esversion:6 */

/**
 * This program does create the space-age museum with objects, rotations, spotlights, cameras.
 */

import * as THREE from "../libs/THREE/src/Three.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "../libs/THREE/examples/jsm/loaders/OBJLoader.js";

window.onload = function () {
  /** @type{THREE.Scene} */
  let scene = new THREE.Scene();
  /** @type{number} */
  let wid = 670; // window.innerWidth;
  /** @type{number} */
  let ht = 500; // window.innerHeight;
  /** @type{THREE.PerspectiveCamera} */
  let main_camera = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
  main_camera.position.set(0, 4, 6);
  main_camera.rotation.set(-0.5, 0, 0);
  let active_camera = main_camera;
  /** @type{THREE.WebGLRenderer} */
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(wid, ht);
  renderer.shadowMap.enabled = true;

  document.getElementById("museum_area").appendChild(renderer.domElement);
  setupButtons();
  setupBasicScene();

  // add a basic, simple first object to the museum.
  /**@type{THREE.Material} */
  let material = new THREE.MeshPhongMaterial({
    color: "#00aa00",
    shininess: 15,
    specular: "#00ff00"
  });

  let material1 = new THREE.MeshPhongMaterial({
    color: "red",
    shininess: 15,
    //specular: "#00ff00"
  });

  let material2 = new THREE.MeshPhongMaterial({
    color: "brown",
    shininess: 15,
    //specular: "#00ff00"
  });

  let material3 = new THREE.MeshPhongMaterial({
    color: "pink",
    shininess: 15,
    //specular: "#00ff00"
  });
  /**@type{THREE.Geometry} */
  let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  /**@type{THREE.Mesh} */
  let cube = new THREE.Mesh(geometry, material);
  cube.position.set(2, 1.35, 2);
  cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
  cube.castShadow = true;

  // create three more objects, and place them on pedestals.
  let obj1;
  let loader = new OBJLoader();
  loader.load("./objects/astronaut.obj", function (astronaut) {
    obj1 = astronaut;
    astronaut.children.forEach(c => c.material = material1);
    astronaut.position.set(-2, 1.7, 2);
    astronaut.scale.set(0.15, 0.15, 0.15);
    scene.add(astronaut);

    // note that we have to render
    //renderer.render(scene, main_camera);
  });

  let obj2;
  let loaderT = new OBJLoader();
  loaderT.load("./objects/teapot.obj", function (teapot) {
    obj2 = teapot;
    teapot.children.forEach(c => c.material = material2);
    teapot.position.set(-2, 1.45, -2);
    teapot.scale.set(0.02, 0.02, 0.02);
    scene.add(teapot);
    // note that we have to render
    //renderer.render(scene, main_camera);
  });

  let obj3;
  let loaderS = new OBJLoader();
  loaderS.load("./objects/suzanne.obj", function (suzanne) {
    obj3 = suzanne;
    suzanne.children.forEach(c => c.material = material3);
    suzanne.position.set(2, 1.65, -2);
    suzanne.scale.set(0.05, 0.05, 0.05);
    scene.add(suzanne);
    // note that we have to render
    //renderer.render(scene, main_camera);
  });

  /**@type{THREE.SpotLight} */
  let spotlight_1 = new THREE.SpotLight(0xaaaaff, 0.5);
  spotlight_1.angle = Math.PI / 16;
  spotlight_1.position.set(2, 5, 2);
  spotlight_1.target = cube;
  spotlight_1.castShadow = true;
  scene.add(spotlight_1);

  // need to place the lights.
  let a1 = new THREE.Group();
  let spotlight_2 = new THREE.SpotLight(0xaaaaff, 0.5);
  a1.position.set(-2, 1.35, 2);
  scene.add(a1);
  spotlight_2.angle = Math.PI / 16;
  spotlight_2.position.set(-2, 5, 2);
  spotlight_2.target = a1;
  spotlight_2.castShadow = true;
  scene.add(spotlight_2);

  let a2 = new THREE.Group();
  let spotlight_3 = new THREE.SpotLight(0xaaaaff, 0.5);
  a2.position.set(-2, 1.35, -2);
  scene.add(a2);
  spotlight_3.angle = Math.PI / 16;
  spotlight_3.position.set(-2, 5, -2);
  spotlight_3.target = a2;
  spotlight_3.castShadow = true;
  scene.add(spotlight_3);

  let a3 = new THREE.Group();
  let spotlight_4 = new THREE.SpotLight(0xaaaaff, 0.5);
  a3.position.set(2, 1.35, -2);
  scene.add(a3);
  spotlight_4.angle = Math.PI / 16;
  spotlight_4.position.set(2, 5, -2);
  spotlight_4.target = a3;
  spotlight_4.castShadow = true;
  scene.add(spotlight_4);

  // place these cameras.
  let camera_1 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_1.position.set(0, 2.35, 0);
  camera_1.lookAt(2, 0.75, 2);
  let camera_2 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_2.position.set(0, 2.35, 0);
  camera_2.lookAt(-2, 0.85, 2);
  let camera_3 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_3.position.set(0, 2.35, 0);
  camera_3.lookAt(-2, 0.85, -2);
  let camera_4 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
  scene.add(cube);
  camera_4.position.set(0, 2.35, 0);
  camera_4.lookAt(2, 0.85, -2);

  // finally, draw the scene. Also, add animation.
  renderer.render(scene, main_camera);
  function animate() {
    cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.03);
    if (obj1) obj1.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 0.03);
    if (obj2) obj2.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.04);
    if (obj3) obj3.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), 0.05);
    renderer.render(scene, active_camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Simple wrapper function for code to set up the basic scene
  // Specifically, sets up the stuff.
  function setupBasicScene() {
    // make a ground plane.
    let geometry1 = new THREE.BoxGeometry(10, 0.1, 10);
    let material1 = new THREE.MeshStandardMaterial({
      color: "#dddddd",
      metalness: 0.2,
      roughness: 0.8
    });
    /**@type{THREE.Mesh} */
    let ground = new THREE.Mesh(geometry1, material1);
    ground.position.set(0, -1, 0);
    scene.add(ground);

    let locs = [-2, 2];
    /**@type{THREE.Geometry} */
    let geometry2 = new THREE.CylinderGeometry(0.5, 0.75, 2, 16, 8);
    /**@type{THREE.Material} */
    let material2 = new THREE.MeshPhongMaterial({
      color: "#888888",
      shininess: 50
    });
    locs.forEach(function (x_loc) {
      locs.forEach(function (z_loc) {
        /**@type{THREE.Mesh} */
        let object = new THREE.Mesh(geometry2, material2);
        object.position.x = x_loc;
        object.position.z = z_loc;
        object.position.y = 0;
        object.receiveShadow = true;

        scene.add(object);
      });
    });

    /**@type{THREE.AmbientLight} */
    let amb_light = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(amb_light);
  }

  function setupButtons() {
    document.getElementById("main_cam").onclick = function () {
      active_camera = main_camera;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_1").onclick = function () {
      active_camera = camera_1;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_2").onclick = function () {
      active_camera = camera_2;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_3").onclick = function () {
      active_camera = camera_3;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_4").onclick = function () {
      active_camera = camera_4;
      renderer.render(scene, active_camera);
    };
  }
};
