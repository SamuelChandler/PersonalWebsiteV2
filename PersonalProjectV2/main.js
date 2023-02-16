import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'), 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(20,2,10,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const Outer1 = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.TorusGeometry(15,2,10,100);
const Outer2 = new THREE.Mesh(geometry2, material);

const geometry4 = new THREE.TorusGeometry(10,2,10,100);
const Outer3 = new THREE.Mesh(geometry4, material);

const geometry3 = new THREE.SphereGeometry(3,10,10);
const inner = new THREE.Mesh(geometry3, material);
scene.add(inner);
scene.add(Outer1);
scene.add(Outer2);
scene.add(Outer3);

const pointLight = new THREE.PointLight(0xFFFFFF);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(20,20,20);

scene.add(pointLight,ambientLight);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x,y,z);
  scene.add(star);
  
  
}

const n = 200
for(let i =0; i<n; i++){
  addStar()
}

/*
const spaceTexture = new THREE.TextureLoader().load('tree-736885__340.jpg');
scene.background = spaceTexture;
*/
const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);
  Outer1.rotation.y += 0.03;
  Outer2.rotation.y += -0.03;
  Outer3.rotation.y += 0.02;
  controls.update();
  renderer.render(scene,camera);
}

animate();