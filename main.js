import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.162.0/three.module.js";
import { OrbitControls } from "./js/OrbitControls.js";
import getStarfield from "./js/getStars.js"
import sunTexture from "/images/sun_texture.jpg"
import mercuryTexture from "/images/mercury_texture.jpg"
import venusTexture from "/images/venus_texture.jpg"
import marsTexture from "/images/mars_texture.jpg"
import earthTextture1 from "/images/00_earthmap1k.jpg"
import earthLightTexture from "/images/03_earthlights1k.jpg"
import earthCloudsTexture from "/images/04_earthcloudmap.jpg"
import earthCloudsTransTexture from "/images/05_earthcloudmaptrans.jpg"
import moonTexture from "/images/moon_texture.jpg"
import jupiterTexture from "/images/jupiter_texture.jpg"
import jupiterRingTexture from "/images/planetary_ring_texture.jpg"
import saturnTexture from "/images/saturn_texture.jpg"
import uranusTexture from "/images/uranus_texture.jpg"
import neptuneTexture from "/images/neptune_texture.jpg"

const info = {
  sun: {
    info: `The Sun is the star at the center of our solar system, and it provides the light and heat necessary for life on Earth.
    It is composed mainly of hydrogen (about 74%) and helium (about 24%) by mass, with other elements making up less than 2% of its mass.
    The Sun's diameter is about 1.39 million kilometers (864,000 miles), which is about 109 times the diameter of Earth.
    It has a surface temperature of approximately 5,500 degrees Celsius (9,932 degrees Fahrenheit) and a core temperature of about 15 million degrees Celsius (27 million degrees Fahrenheit).
    The Sun's energy is generated through nuclear fusion reactions in its core, where hydrogen nuclei fuse to form helium, releasing vast amounts of energy in the process.
    The Sun is classified as a G-type main-sequence star, commonly referred to as a yellow dwarf.`
  },
  mercury: {
    info: `Mercury is the smallest and innermost planet in the solar system.
    It has no moons and is one of the least explored planets due to its proximity to the Sun.
    Mercury's surface temperature ranges from about -173 degrees Celsius (-280 degrees Fahrenheit) at night to about 427 degrees Celsius (800 degrees Fahrenheit) during the day.
    It has a thin atmosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium, but it is too thin to retain heat effectively.`
  },
  venus: {
    info: `Venus is often called Earth's "sister planet" because of its similar size and composition.
    It is the hottest planet in the solar system, with surface temperatures reaching up to 462 degrees Celsius (864 degrees Fahrenheit) due to its thick atmosphere of carbon dioxide and clouds of sulfuric acid.
    Venus has no moons, and its surface is covered in volcanic plains, mountains, and large impact craters.
    It rotates on its axis very slowly, taking about 243 Earth days to complete one rotation, but its day (from sunrise to sunrise) is shorter, about 117 Earth days.`
  },
  earth: {
    info: `Earth is the third planet from the Sun and the only known planet to support life.
    It has one moon, which plays a significant role in Earth's tides and stabilizing its axial tilt.
    Earth's atmosphere is composed primarily of nitrogen (about 78%) and oxygen (about 21%), along with small amounts of other gases.
    It has a diverse range of ecosystems, including oceans, forests, deserts, and polar regions, which support a wide variety of life forms.`
  },
  mars: {
    info: `Mars is often called the "Red Planet" because of its reddish appearance due to iron oxide (rust) on its surface.
    It has two moons, Phobos and Deimos, which are irregularly shaped and likely captured asteroids.
    Mars has the largest volcano in the solar system, Olympus Mons, and the longest canyon, Valles Marineris.
    The planet's thin atmosphere is mostly carbon dioxide, and its surface temperatures can range from about -143 degrees Celsius (-225 degrees Fahrenheit) to 35 degrees Celsius (95 degrees Fahrenheit).`
  },
  jupiter: {
    info: `Jupiter is the largest planet in the solar system, with a diameter of about 139,822 kilometers (86,881 miles).
    It has a strong magnetic field and numerous moons, including the four largest known as the Galilean moons: Io, Europa, Ganymede, and Callisto.
    Jupiter's atmosphere is mostly hydrogen and helium, with colorful bands of clouds and a giant storm known as the Great Red Spot.
    It has a short day, rotating on its axis once every 9.9 hours, but its year (orbiting the Sun) lasts about 11.9 Earth years.
    `
  },
  saturn: {
    info: `Saturn is known for its distinctive rings, which are made up of ice particles, rock, and dust.
    It has the second-largest moon system in the solar system, including the largest moon, Titan, which has a thick atmosphere and lakes of liquid methane and ethane.
    Saturn's atmosphere is similar to Jupiter's, primarily composed of hydrogen and helium, with bands of clouds and a hexagonal-shaped jet stream at its north pole.
    It takes about 29.5 Earth years to orbit the Sun, and its day lasts about 10.7 hours.`
  },
  uranus: {
    info: `Uranus is an ice giant planet, with a bluish-green color due to methane in its atmosphere.
    It has a tilted rotational axis, causing it to appear to roll on its side as it orbits the Sun, giving it unique seasons.
    Uranus has a system of rings and moons, including Miranda, which has varied and unusual surface features.
    Its atmosphere is composed mainly of hydrogen and helium, along with methane, which gives it its distinctive color.`
  },
  neptune: {
    info: `Neptune is the farthest planet from the Sun and is known for its deep blue color due to methane in its atmosphere.
    It has strong winds, with the fastest recorded winds in the solar system, reaching speeds of up to 2,100 kilometers per hour (1,300 miles per hour).
    Neptune has a system of rings and moons, including Triton, which is the largest moon and orbits in a retrograde direction (opposite to Neptune's rotation).
    Its atmosphere is primarily composed of hydrogen, helium, and methane, with clouds of methane ice crystals.`
  },
}

window.info = info;
const scene = new THREE.Scene();
// scene.vi
// Parent object
const parent = new THREE.Object3D();
scene.add(parent);
// 

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
// camera.position.x = 25;
// camera.position.y = 25;
// camera.position.z = 100;
// camera.lookAt(new THREE.Vector3(0, 0, 0));
const canvas = document.getElementById("canvas");
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas
});
const orbit = new OrbitControls(camera, canvas)
orbit.update();

// renderer.toneMappingExposure = 10;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const initialPosition = new THREE.Vector3(100, 100, 550);
const targetPosition = new THREE.Vector3(20, 15, 25); // Zoomed-in position
let zoomFactor = 0;

// Smooth camera zoom function
function smoothZoom() {
  zoomFactor += 0.007; // Increment zoom factor (adjust speed as needed)
  zoomFactor = Math.min(zoomFactor, 1); // Clamp zoom factor to [0, 1]
  camera.position.lerpVectors(initialPosition, targetPosition, zoomFactor);
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
  if (zoomFactor < 1) {
    requestAnimationFrame(smoothZoom);
  }
}

// window.addEventListener("resize", () => {
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
//   scene.add(camera);
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });
// Helper
const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);
//  


// Light 
const hemiSphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff)
hemiSphereLight.position.set(0, 5, 0)
// hemiSphereLight.castShadow = true
hemiSphereLight.rotateX(180)
scene.add(hemiSphereLight);
const hemiSphereLightHelper = new THREE.HemisphereLightHelper(hemiSphereLight)
hemiSphereLightHelper.position.set(0, 0, 0)
scene.add(hemiSphereLightHelper)

// const sunLight = new THREE.DirectionalLight(0xffffff,1);
// sunLight.position.set(0, 0, 0)
// scene.add(sunLight);
// const sunLightHelper = new THREE.DirectionalLightHelper(sunLight);
// sunLightHelper.position.set(0, 0, 0)
// scene.add(sunLightHelper);
// 

// Texture
const loader = new THREE.TextureLoader();
// 

// Sun 
const sphereGeo = new THREE.SphereGeometry(3, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: loader.load(sunTexture),
  // blending: THREE.AdditiveBlending,
});
sphereGeo.center();
const sun = new THREE.Mesh(sphereGeo, sunMaterial);
sun.scale.setScalar(2.5);
sun.name = "sun";
// sun.position.set(-5, 0, 2)
parent.add(sun);

//

// Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.set(5, -0.8, -30);
parent.add(earthGroup);
// 

// Earth 
const earthGeo = new THREE.IcosahedronGeometry(1, 12);
const earthMesh = new THREE.MeshStandardMaterial({
  map: loader.load(earthTextture1),
  // blending: THREE.AdditiveBlending
});
const earth = new THREE.Mesh(earthGeo, earthMesh);
// earth.position.set(5, 0, 10);
earthGroup.add(earth);
const lightMaterial = new THREE.MeshBasicMaterial({
  map: loader.load(earthLightTexture),
  blending: THREE.AdditiveBlending,
})
const lightMesh = new THREE.Mesh(earthGeo, lightMaterial);
earthGroup.add(lightMesh);
const cloudsMaterial = new THREE.MeshBasicMaterial({
  map: loader.load(earthCloudsTexture),
  roughness: 1,
  metalness: 0,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load(earthCloudsTransTexture),
})
const cloudsMesh = new THREE.Mesh(earthGeo, cloudsMaterial);
cloudsMesh.scale.setScalar(1.005);
cloudsMesh.name = "earth";
earthGroup.add(cloudsMesh);
// 
// const cloudsMaterial = new THREE.mes

// Moon 
const moon = createPlanet(moonTexture, 0.1, 1, 1, 0);
moon.name = "moon";
earthGroup.add(moon);
// 

// Mercury 
const mercury = createPlanet(mercuryTexture, 0.2, -2, -0.2, -10);
mercury.name = "mercury";
parent.add(mercury);
// 

// Venus 
const venus = createPlanet(venusTexture, 0.4, -5, 0.5, 20);
venus.name = "venus";
parent.add(venus);
// 

// Mars
const mars = createPlanet(marsTexture, 0.3, 2, 0.8, 40);
mars.name = "mars";
parent.add(mars);
// 

// Jupiter
const jupiter = createPlanet(jupiterTexture, 2, 3, -1, -50);
jupiter.name = "jupiter";
const jupiterRingGeo = new THREE.RingGeometry(5, 4.5, 30, 1, 0, 6.28);
const jupiterRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // blending: THREE.AdditiveBlending,
  map: loader.load(jupiterRingTexture),
  // opacity: 0.3,
  // transparent: true,
  side: THREE.DoubleSide
});
const jupiterRing = new THREE.Mesh(jupiterRingGeo, jupiterRingMaterial);
// jupiterRing.scale.setScalar(3)
jupiterRing.rotateX(200);
jupiterRing.name = "jupiter";
jupiter.add(jupiterRing);
parent.add(jupiter);
// 

// Saturn
const saturn = createPlanet(saturnTexture, 1.7, 3, 0.9, 60);
saturn.name = "saturn";
function createSaturnRing(innerRad, opacity, scale) {
  const saturnRingGeo = new THREE.RingGeometry(innerRad, 4.5, 30, 1, 0, 6.28);
  const saturnRingMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    // blending: THREE.AdditiveBlending,
    opacity: opacity,
    transparent: true,
    side: THREE.DoubleSide
  });
  const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMaterial);
  saturnRing.rotateX(180);
  saturnRing.scale.setScalar(scale);
  saturnRing.name = "saturn";
  return saturnRing;
}
const saturnRing = createSaturnRing(5, 0.3, 0.8);
const saturnRing2 = createSaturnRing(5.5, 0.6, 0.89);
const saturnRing3 = createSaturnRing(5.1, 0.4, 1.1);
saturn.add(saturnRing);
saturn.add(saturnRing2);
saturn.add(saturnRing3);
parent.add(saturn);
// 

// Uranus
const uranus = createPlanet(uranusTexture, 1.3, 3, -1, -70);
uranus.name = "uranus";
parent.add(uranus);
// 

// Neptune 
const neptune = createPlanet(neptuneTexture, 1.3, 3, 1.2, 80);
neptune.name = "neptune";
parent.add(neptune);
// 

// Rings
const ringGeo = new THREE.TorusGeometry(16, 0.1, 30, 50, 6.283185307179586);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  opacity: 0.3,
  transparent: true
});
function createPlanetaryRing(scale) {
  const ring = new THREE.Mesh(ringGeo, ringMaterial);
  ring.rotateX(300);
  ring.scale.setScalar(scale);
  return ring;
}
scene.add(createPlanetaryRing(0.645));
scene.add(createPlanetaryRing(1.29));
scene.add(createPlanetaryRing(1.9));
scene.add(createPlanetaryRing(2.5));
scene.add(createPlanetaryRing(3.175));
scene.add(createPlanetaryRing(3.78));
scene.add(createPlanetaryRing(4.4));
scene.add(createPlanetaryRing(5.03));
//

// Stars
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);
//

// camera.position.copy(initialPosition);
// camera.lookAt(scene.position);

// Call smoothZoom function when the window has finished loading
window.onload = function () {
  smoothZoom();
};

function createPlanet(texturePath, scale, posX, posY, posZ) {
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: loader.load(texturePath),
  })
  const planet = new THREE.Mesh(sphereGeo, planetMaterial);
  planet.scale.setScalar(scale);
  planet.position.set(posX, posY, posZ);
  return planet;
}

function animate() {
  requestAnimationFrame(animate);
  // scene.rotation.y += 0.01;
  // Rotate the parent object
  parent.rotation.y += 0.0002;
  sun.rotation.y -= 0.0002;
  earth.rotation.y += 0.001;
  lightMesh.rotation.y += 0.001;
  cloudsMesh.rotation.y += 0.001;
  moon.rotation.y += 0.005;
  moon.position.x = 2 * Math.cos(earth.rotation.y - Math.PI / 3);
  moon.position.z = 2 * Math.sin(earth.rotation.y - Math.PI / 3);

  // Rotate the child objects around the parent
  // mercury.position.x = 2 * Math.cos(parent.rotation.y);
  // mercury.position.z = 2 * Math.sin(parent.rotation.y);
  // mars.position.x = 2 * Math.cos(parent.rotation.y - Math.PI / 3);
  // mars.position.z = 2 * Math.sin(parent.rotation.y - Math.PI / 3);
  renderer.render(scene, camera);
}
animate();

// Raycaster for detecting clicks on objects gpt
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to handle click events
function onClick(event) {
  // Calculate mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set raycaster from camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Find intersecting objects
  const intersects = raycaster.intersectObjects(scene.children);

  // Check if any objects were clicked
  if (intersects.length > 0) {
    // Execute functions for clicked object(s)
    console.log(intersects[0].object.name, '\n Object clicked:', intersects[0].object);
    // Call your custom functions here
    if (intersects[0].object.name) {
      infoContainer(intersects[0].object.name);
    } else {
      document.getElementsByClassName("info")[0].classList.add("closed");
    }
  }
}

document.getElementById("close").addEventListener("click", () => {
  document.getElementsByClassName("info")[0].classList.add("closed");
});
// Add event listener for mouse click
document.addEventListener('click', onClick, false);

function infoContainer(name) {
  var planetName = document.querySelector(".info h2");
  var pointsContainer = document.getElementsByClassName("points")[0];
  planetName.innerHTML = name;
  pointsContainer.innerHTML = "";
  document.getElementsByClassName("info")[0].classList.remove("closed");
  info[name].info.split(/(?<!\d)\.(?!\d)/g).map((point) => {
    if (point.trim() != "") {
      var li = document.createElement("li");
      li.textContent = point;
      pointsContainer.insertAdjacentElement("beforeend", li);
    }
  })
}