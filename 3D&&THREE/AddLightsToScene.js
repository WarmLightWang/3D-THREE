/* jshint -W069, esversion:6 */

/**
 * This program does add lights to scene so that sides of the cubes appear in different colors 
 */
import * as T from "../libs/THREE/src/Three.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";
import { onWindowOnload } from "../libs/helpers.js";

function lightex() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(400, 400);
  document.getElementById("div1").appendChild(renderer.domElement);

  let scene = new T.Scene();
  let camera = new T.PerspectiveCamera();
  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 3, 0);

  // since we're animating, add OrbitControls
  let controls = new OrbitControls(camera, renderer.domElement);

  // Ambient light doesn't work since we're using physical materials
  // scene.add(new T.AmbientLight("white",0.2));

  /**Add some lights here */
  // the directional light comes from the side
  let dir1 = new T.DirectionalLight("brown", 1);
  dir1.position.set(5, 0, 0);
  scene.add(dir1);
  let dir2 = new T.DirectionalLight("red", 1);
  dir2.position.set(0, 5, 0);
  scene.add(dir2);
  let dir3 = new T.DirectionalLight("blue", 1);
  dir3.position.set(0, 0, 5);
  scene.add(dir3);

  // the directional light comes from the side
  let dir4 = new T.DirectionalLight("purple", 1);
  dir4.position.set(-5, 0, 0);
  scene.add(dir4);
  let dir5 = new T.DirectionalLight("green", 1);
  dir5.position.set(0, -5, 0);
  scene.add(dir5);
  let dir6 = new T.DirectionalLight("orange", 1);
  dir6.position.set(0, 0, -5);
  scene.add(dir6);

  // make a ground plane
  let groundBox = new T.BoxGeometry(6, 0.1, 6);
  let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshStandardMaterial({ color: 0x888888 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  scene.add(groundMesh);

  /**
   * Make some cubes in various places and orientations
   */

  let box = new T.BoxGeometry(1, 1, 1);
  let cube1 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
  cube1.position.set(2, 0.8, 2);
  scene.add(cube1);

  let cube2 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
  cube2.position.set(-2, 0.8, 2);
  cube2.rotateY(45);
  scene.add(cube2);

  let cube3 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
  cube3.position.y = 0.8;
  scene.add(cube3);

  let cube4 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
  cube4.position.set(2, Math.sqrt(2) / 2, -2);
  cube4.rotateX(45);
  scene.add(cube4);

  let cube5 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
  cube5.position.set(-2, 0.8, -2);
  scene.add(cube5);

  function draw() {
    cube5.rotateX(0.01);
    cube5.rotateY(0.01);
    cube4.rotateY(0.01);
    cube4.rotateX(0.01);
    cube3.rotateY(-0.05);
    cube3.rotateX(0);
    cube2.rotateY(0.01);
    cube2.rotateX(0.01);
    cube1.rotateY(0.01);
    cube1.rotateX(0.01);

    renderer.render(scene, camera);
    window.requestAnimationFrame(draw);
  }
  draw();
}
onWindowOnload(lightex);
