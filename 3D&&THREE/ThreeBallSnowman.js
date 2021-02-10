/* jshint -W069, esversion:6 */

/**
 * This program does make the classic three-ball snowman using THREE!
 */
import * as THREE from "../libs/THREE/src/Three.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";
import { EllipseCurve, Group } from "../libs/THREE/src/Three.js";

window.onload = function () {
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 500);
  document.getElementById("div1").appendChild(renderer.domElement);


  // does the resTHREE.
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera();
  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 3, 0);

  // since we're animating, add OrbitControls
  let controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.AmbientLight("white", 0.2));
  let point = new THREE.PointLight("white", 1, 0, 0);
  point.position.set(20, 10, 15);
  scene.add(point);

  let spot = new THREE.SpotLight("white", 1, 0, Math.PI / 15, 0); // ,0,Math.PI/9);
  spot.position.set(0, 7, 0);
  //scene.add(spot);
  let sh = new THREE.SpotLightHelper(spot);
  //scene.add(sh);

  // the directional light comes from the side
  let dir = new THREE.DirectionalLight("yellow", 1);
  dir.position.set(5, 0, 0);
  scene.add(dir);

  // make a ground plane
  let groundBox = new THREE.BoxGeometry(6, 0.1, 6);
  let groundMesh = new THREE.Mesh(
    groundBox,
    new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -2;
  scene.add(groundMesh);

  // bottom ball
  let geometry = new THREE.SphereBufferGeometry(1.5, 32, 32);
  let material = new THREE.MeshBasicMaterial({ color: "white" });
  let sphere = new THREE.Mesh(geometry, material);
  sphere.translateY(-1.5);
  scene.add(sphere);

  // middle ball
  let geometry1 = new THREE.SphereBufferGeometry(1, 32, 32);
  let material1 = new THREE.MeshBasicMaterial({ color: "white" });
  let sphere1 = new THREE.Mesh(geometry1, material1);
  sphere1.translateY(0.5);
  scene.add(sphere1);

  // arms
  let geometryL = new THREE.CylinderBufferGeometry(0.1, 0.1, 3, 32);
  let materialL = new THREE.MeshBasicMaterial({ color: "brown" });
  let cylinderL = new THREE.Mesh(geometryL, materialL);
  cylinderL.translateY(1);
  cylinderL.rotateZ(0.5);
  sphere1.add(cylinderL);
  sphere1.rotateZ(Math.PI / 2);
  scene.add(sphere1);

  let geometryR = new THREE.CylinderBufferGeometry(0.1, 0.1, 3, 32);
  let materialR = new THREE.MeshBasicMaterial({ color: "brown" });
  let cylinderR = new THREE.Mesh(geometryR, materialR);
  cylinderR.translateY(-1);
  cylinderR.rotateZ(0.5);
  sphere1.add(cylinderR);
  scene.add(sphere1);

  // knot
  let geometryK = new THREE.SphereBufferGeometry(0.1, 32, 32);
  let materialK = new THREE.MeshBasicMaterial({ color: "blue" });
  let knot = new THREE.Mesh(geometryK, materialK);
  knot.translateY(0);
  knot.translateZ(1);
  knot.translateX(0.5);
  sphere1.add(knot);
  scene.add(sphere1);

  let geometryK1 = new THREE.SphereBufferGeometry(0.1, 32, 32);
  let materialK1 = new THREE.MeshBasicMaterial({ color: "blue" });
  let knot1 = new THREE.Mesh(geometryK1, materialK1);
  knot1.translateY(0);
  knot1.translateZ(1);
  knot1.translateX(0.2);
  sphere1.add(knot1);
  scene.add(sphere1);

  let geometryK12 = new THREE.SphereBufferGeometry(0.1, 32, 32);
  let materialK12 = new THREE.MeshBasicMaterial({ color: "blue" });
  let knot12 = new THREE.Mesh(geometryK12, materialK12);
  knot12.translateY(0);
  knot12.translateZ(1);
  knot12.translateX(-0.1);
  sphere1.add(knot12);
  scene.add(sphere1);

  // top ball
  let geometry2 = new THREE.SphereBufferGeometry(0.8, 32, 32);
  let material2 = new THREE.MeshBasicMaterial({ color: "white" });
  let sphere2 = new THREE.Mesh(geometry2, material2);
  sphere2.translateY(1.8);

  // nose
  let geometry3 = new THREE.ConeBufferGeometry(0.15, 0.5, 32);
  let material3 = new THREE.MeshStandardMaterial({ color: "red" });
  let cone = new THREE.Mesh(geometry3, material3);
  cone.translateY(1);
  sphere2.add(cone);
  sphere2.rotateX(Math.PI / 2);
  scene.add(sphere2);

  //eyes
  let eye1 = new THREE.SphereBufferGeometry(0.1, 32, 32);
  let el = new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.5, metalness: 1 });
  let eyeL = new THREE.Mesh(eye1, el);
  eyeL.translateY(0.7);
  eyeL.translateZ(-0.3);
  eyeL.translateX(-0.2);
  sphere2.add(eyeL);
  scene.add(sphere2);


  let eye2 = new THREE.SphereBufferGeometry(0.1, 32, 32);
  let er = new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.5, metalness: 1 });
  let eyeR = new THREE.Mesh(eye2, er);
  eyeR.translateY(0.7);
  eyeR.translateZ(-0.3);
  eyeR.translateX(0.2);
  sphere2.add(eyeR);
  scene.add(sphere2);

  //mouth
  let geometry4 = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let material4 = new THREE.MeshBasicMaterial({ color: "brown" });
  let mouth = new THREE.Mesh(geometry4, material4);
  mouth.translateY(0.75);
  mouth.translateZ(0.25);
  mouth.translateX(0.25);
  sphere2.add(mouth);
  scene.add(sphere2);

  let geometry5 = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let material5 = new THREE.MeshBasicMaterial({ color: "brown" });
  let mouth1 = new THREE.Mesh(geometry5, material5);
  mouth1.translateY(0.8);
  mouth1.translateZ(0.3);
  mouth1.translateX(0.1);
  sphere2.add(mouth1);
  scene.add(sphere2);

  let geometry6 = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let material6 = new THREE.MeshBasicMaterial({ color: "brown" });
  let mouth2 = new THREE.Mesh(geometry6, material6);
  mouth2.translateY(0.8);
  mouth2.translateZ(0.3);
  mouth2.translateX(-0.05);
  sphere2.add(mouth2);
  scene.add(sphere2);

  let geometry7 = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let material7 = new THREE.MeshBasicMaterial({ color: "brown" });
  let mouth3 = new THREE.Mesh(geometry7, material7);
  mouth3.translateY(0.85);
  mouth3.translateZ(0.25);
  mouth3.translateX(-0.2);
  sphere2.add(mouth3);
  scene.add(sphere2);

  //hat
  let geometryH = new THREE.CylinderBufferGeometry(1.5, 1.5, 0.1, 39);
  let materialH = new THREE.MeshBasicMaterial({ color: "purple" });
  let hat = new THREE.Mesh(geometryH, materialH);
  hat.translateY(0);
  hat.translateZ(-0.6);
  hat.translateX(0);
  hat.rotateX(-1.6);
  sphere2.add(hat);
  scene.add(sphere2);

  let geometryH1 = new THREE.CylinderBufferGeometry(0.6, 0.6, 0.2, 32);
  let materialH1 = new THREE.MeshBasicMaterial({ color: "olive" });
  let hat1 = new THREE.Mesh(geometryH1, materialH1);
  hat1.translateY(0);
  hat1.translateZ(-0.7);
  hat1.translateX(0);
  hat1.rotateX(-1.6);
  sphere2.add(hat1);
  scene.add(sphere2);

  let geometryH12 = new THREE.CylinderBufferGeometry(0.6, 0.6, 0.8, 32);
  let materialH12 = new THREE.MeshBasicMaterial({ color: "purple" });
  let hat12 = new THREE.Mesh(geometryH12, materialH12);
  hat12.translateY(0);
  hat12.translateZ(-1.2);
  hat12.translateX(0);
  hat12.rotateX(-1.6);
  sphere2.add(hat12);
  scene.add(sphere2);

  let geometryH123 = new THREE.CylinderBufferGeometry(0.6, 0.6, 0.1, 32);
  let materialH123 = new THREE.MeshBasicMaterial({ color: "olive" });
  let hat123 = new THREE.Mesh(geometryH123, materialH123);
  hat123.translateY(0);
  hat123.translateZ(-1.6);
  hat123.translateX(0);
  hat123.rotateX(-1.6);
  sphere2.add(hat123);
  scene.add(sphere2);

  function snowMan() {
    let snowman = new Group();
    snowman.add(sphere);
    snowman.add(sphere1);
    snowman.add(sphere2);
    snowman.position.set(-1.5, 0.5, -1);
    scene.add(snowman);
  }
  snowMan();

  // bottom ball
  let geometryB = new THREE.SphereBufferGeometry(0.8, 32, 32);
  let materialB = new THREE.MeshBasicMaterial({ color: "white" });
  let sphereB = new THREE.Mesh(geometryB, materialB);
  sphereB.translateY(-1.3);
  sphereB.translateX(2);
  sphereB.translateZ(2);
  scene.add(sphereB);

  // middle ball
  let geometryM = new THREE.SphereBufferGeometry(0.6, 32, 32);
  let materialM = new THREE.MeshBasicMaterial({ color: "white" });
  let sphereM = new THREE.Mesh(geometryM, materialM);
  sphereM.translateY(-0.2);
  sphereM.translateX(2);
  sphereM.translateZ(2);
  scene.add(sphereM);

  // top ball
  let geometryT = new THREE.SphereBufferGeometry(0.4, 32, 32);
  let materialT = new THREE.MeshBasicMaterial({ color: "white" });
  let sphereT = new THREE.Mesh(geometryT, materialT);
  sphereT.translateY(0.6);
  sphereT.translateX(2);
  sphereT.translateZ(2);
  scene.add(sphereT);

  //eyes
  let eyeb3 = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let el3 = new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.5, metalness: 1 });
  let eyeL3 = new THREE.Mesh(eyeb3, el3);
  eyeL3.translateY(0.2);
  eyeL3.translateZ(0.3);
  eyeL3.translateX(-0.1);
  sphereT.add(eyeL3);
  scene.add(sphereT);

  let eyeB3 = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let er3 = new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.5, metalness: 1 });
  let eyeR3 = new THREE.Mesh(eyeB3, er3);
  eyeR3.translateY(0.2);
  eyeR3.translateZ(0.3);
  eyeR3.translateX(0.1);
  sphereT.add(eyeR3);
  scene.add(sphereT);

  // nose
  let geometryN = new THREE.CylinderBufferGeometry(0.02, 0.02, 0.1, 32);
  let materialN = new THREE.MeshBasicMaterial({ color: "brown" });
  let cylinderN = new THREE.Mesh(geometryN, materialN);
  cylinderN.translateY(0.1);
  cylinderN.translateZ(0.4);
  cylinderN.translateX(0);
  sphereT.add(cylinderN);
  // sphereT.rotateZ(Math.PI / 2);
  scene.add(sphereT);

  // set the snow fall
  let geometryS = new THREE.SphereBufferGeometry(0.05, 32, 32);
  let materialS = new THREE.MeshBasicMaterial({ color: "white" });
  let snowball = [];
  for (let i = 0; i < 100; i++) {
    let snow = new THREE.Mesh(geometryS, materialS);
    snow.translateY(10 * Math.random());
    snow.translateX((2 * Math.random() - 1) * 5);
    snow.translateZ((2 * Math.random() - 1) * 5);
    snowball.push(snow);
    scene.add(snow);
  }

  function draw() {
    //let x = 2 * Math.cos((Math.PI * 2 * (performance.now() % 1000)) / 1000);
    for (let i = 0; i < 100; i++) {
      let snow = snowball[i];
      snow.translateY(-0.05);

      if (snow.position.y < -2) {
        snow.translateY(10);
      }
    }
    cylinderL.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.05);
    cylinderR.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.05);
    renderer.render(scene, camera);
    window.requestAnimationFrame(draw);
  }
  draw();

};
