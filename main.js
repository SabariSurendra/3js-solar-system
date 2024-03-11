import * as THREE from "three";
import { OrbitControls } from "./js/OrbitControls.js";
import getStarfield from "./js/getStars.js"

const info = {
  "sun": {
    info: `The Sun is the star at the center of our solar system, and it provides the light and heat necessary for life on Earth.
    It is composed mainly of hydrogen (about 74%) and helium (about 24%) by mass, with other elements making up less than 2% of its mass.
    The Sun's diameter is about 1.39 million kilometers (864,000 miles), which is about 109 times the diameter of Earth.
    It has a surface temperature of approximately 5,500 degrees Celsius (9,932 degrees Fahrenheit) and a core temperature of about 15 million degrees Celsius (27 million degrees Fahrenheit).
    The Sun's energy is generated through nuclear fusion reactions in its core, where hydrogen nuclei fuse to form helium, releasing vast amounts of energy in the process.
    The Sun is classified as a G-type main-sequence star, commonly referred to as a yellow dwarf.`
  },
  "mercury": {
    info: `Mercury is the smallest and innermost planet in the solar system.
    It has no moons and is one of the least explored planets due to its proximity to the Sun.
    Mercury's surface temperature ranges from about -173 degrees Celsius (-280 degrees Fahrenheit) at night to about 427 degrees Celsius (800 degrees Fahrenheit) during the day.
    It has a thin atmosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium, but it is too thin to retain heat effectively.`
  },
  "venus": {
    info: `Venus is often called Earth's "sister planet" because of its similar size and composition.
    It is the hottest planet in the solar system, with surface temperatures reaching up to 462 degrees Celsius (864 degrees Fahrenheit) due to its thick atmosphere of carbon dioxide and clouds of sulfuric acid.
    Venus has no moons, and its surface is covered in volcanic plains, mountains, and large impact craters.
    It rotates on its axis very slowly, taking about 243 Earth days to complete one rotation, but its day (from sunrise to sunrise) is shorter, about 117 Earth days.`
  },
  "earth": {
    info: `Earth is the third planet from the Sun and the only known planet to support life.
    It has one moon, which plays a significant role in Earth's tides and stabilizing its axial tilt.
    Earth's atmosphere is composed primarily of nitrogen (about 78%) and oxygen (about 21%), along with small amounts of other gases.
    It has a diverse range of ecosystems, including oceans, forests, deserts, and polar regions, which support a wide variety of life forms.`
  },
  "mars": {
    info: `Mars is often called the "Red Planet" because of its reddish appearance due to iron oxide (rust) on its surface.
    It has two moons, Phobos and Deimos, which are irregularly shaped and likely captured asteroids.
    Mars has the largest volcano in the solar system, Olympus Mons, and the longest canyon, Valles Marineris.
    The planet's thin atmosphere is mostly carbon dioxide, and its surface temperatures can range from about -143 degrees Celsius (-225 degrees Fahrenheit) to 35 degrees Celsius (95 degrees Fahrenheit).`
  },
  "jupiter": {
    info: `Jupiter is the largest planet in the solar system, with a diameter of about 139,822 kilometers (86,881 miles).
    It has a strong magnetic field and numerous moons, including the four largest known as the Galilean moons: Io, Europa, Ganymede, and Callisto.
    Jupiter's atmosphere is mostly hydrogen and helium, with colorful bands of clouds and a giant storm known as the Great Red Spot.
    It has a short day, rotating on its axis once every 9.9 hours, but its year (orbiting the Sun) lasts about 11.9 Earth years.
    `
  },
  "Jupiter's_planetary_ring": {
    info: `Jupiter's planetary ring system is composed of fine particles of dust and rock, much smaller than the rings of Saturn.
    The main ring around Jupiter is called the "Halo Ring" or "Main Ring," consisting of small, dark particles.
    The particles in Jupiter's rings are thought to originate from micrometeoroid impacts on the planet's moons, releasing material into space.
    Jupiter's ring system was first discovered by the Voyager 1 spacecraft in 1979 and later observed in more detail by the Galileo spacecraft in the 1990s.
    The rings of Jupiter are relatively faint and difficult to observe from Earth, requiring advanced telescopes and imaging techniques.
    Jupiter's rings are continuously influenced by the planet's strong magnetic field, radiation belts, and gravitational interactions with its moons.
    Unlike Saturn's rings, which are bright and prominent, Jupiter's rings are thin and tenuous, making them less conspicuous.
    The exact origin and evolution of Jupiter's ring system are still areas of active research, with scientists studying their dynamics and composition to understand more about the planet's history and environment.
    Jupiter's rings add to the complexity and diversity of the planet's system of moons, rings, and magnetic field, providing valuable insights into the dynamics of planetary systems.`
  },
  "saturn": {
    info: `Saturn is known for its distinctive rings, which are made up of ice particles, rock, and dust.
    It has the second-largest moon system in the solar system, including the largest moon, Titan, which has a thick atmosphere and lakes of liquid methane and ethane.
    Saturn's atmosphere is similar to Jupiter's, primarily composed of hydrogen and helium, with bands of clouds and a hexagonal-shaped jet stream at its north pole.
    It takes about 29.5 Earth years to orbit the Sun, and its day lasts about 10.7 hours.`
  },
  "Saturn's_planetary_ring": {
    info: `Saturn's planetary ring system is one of the most iconic features of the planet, consisting of numerous thin bands of ice, rock, and dust particles.
    The rings of Saturn are divided into several main rings named alphabetically in the order of their discovery (e.g., A, B, C rings), with additional divisions and gaps between them.
    The main rings of Saturn are primarily composed of water ice particles ranging in size from micrometers to meters, although they can also contain rocky material.
    The largest and brightest ring of Saturn is the B ring, followed by the A ring, while the C ring is thinner and fainter. Other rings, such as the D ring and the F ring, are narrower and located closer to the planet.
    The rings of Saturn are believed to be the remnants of moons, comets, or other celestial objects that were shattered by tidal forces or collisions, forming a debris disk around the planet.
    Saturn's rings are constantly evolving due to gravitational interactions with its moons, impacts from micrometeoroids, and the planet's own rotation and magnetic field.
    The rings of Saturn were first observed by Galileo Galilei in 1610, but their true nature and structure were not fully understood until the Voyager spacecraft missions in the 1980s and the Cassini mission in the 2000s.
    The Cassini spacecraft provided detailed observations and measurements of Saturn's rings, revealing complex structures, waves, and dynamic processes within the ring system.
    The study of Saturn's rings has important implications for understanding the formation and evolution of planetary systems, as well as the dynamics of disks and rings around other celestial bodies in the universe.`
  },
  "uranus": {
    info: `Uranus is an ice giant planet, with a bluish-green color due to methane in its atmosphere.
    It has a tilted rotational axis, causing it to appear to roll on its side as it orbits the Sun, giving it unique seasons.
    Uranus has a system of rings and moons, including Miranda, which has varied and unusual surface features.
    Its atmosphere is composed mainly of hydrogen and helium, along with methane, which gives it its distinctive color.`
  },
  "neptune": {
    info: `Neptune is the farthest planet from the Sun and is known for its deep blue color due to methane in its atmosphere.
    It has strong winds, with the fastest recorded winds in the solar system, reaching speeds of up to 2,100 kilometers per hour (1,300 miles per hour).
    Neptune has a system of rings and moons, including Triton, which is the largest moon and orbits in a retrograde direction (opposite to Neptune's rotation).
    Its atmosphere is primarily composed of hydrogen, helium, and methane, with clouds of methane ice crystals.`
  },
  "moon": {
    info: `The Moon is Earth's only natural satellite, orbiting our planet at an average distance of about 384,400 kilometers (238,900 miles).
    It is the fifth largest moon in the solar system.
    The Moon has a diameter of about 3,474 kilometers (2,159 miles), making it much smaller than Earth.
    It takes about 27.3 days for the Moon to orbit Earth and about the same amount of time to rotate on its axis, which is why we always see the same side of the Moon from Earth (the near side).
    The Moon's surface is covered in craters, mountains, valleys, and plains, formed by impacts from asteroids and comets.
    The temperature on the Moon can vary dramatically, ranging from extremely hot during the day to extremely cold at night due to its lack of atmosphere to retain heat.
    The Moon has no atmosphere, which means there is no weather, wind, or erosion on its surface.
    The Moon plays a significant role in Earth's tides, with its gravitational pull causing the ocean tides to rise and fall.
    Humans first landed on the Moon on July 20, 1969, during NASA's Apollo 11 mission, with astronauts Neil Armstrong and Edwin "Buzz" Aldrin becoming the first humans to set foot on its surface.
    The Moon is the only celestial body beyond Earth that humans have visited.`
  },
  "elliptical_path": {
    info: `An elliptical path, also known as an elliptical orbit, is a type of orbital motion where an object follows an elliptical trajectory around another object due to gravitational attraction.
    In the solar system, many celestial bodies, including planets, moons, asteroids, and comets, have elliptical orbits around the Sun.
    An ellipse is a geometric shape that resembles a flattened circle, with two focal points instead of a single center.
    In an elliptical orbit, the object moves faster when it is closer to the central body (the Sun in the case of the solar system) and slower when it is farther away, according to Kepler's laws of planetary motion.
    The eccentricity of an elliptical orbit determines how elongated or flattened the ellipse is. A perfectly circular orbit has an eccentricity of 0, while increasingly elongated orbits have eccentricities closer to 1.
    Planets in the solar system, such as Mercury, Mars, and Pluto, have elliptical orbits, although some are nearly circular.
    Comets are known for their highly elliptical orbits, with some traveling far beyond the orbit of Neptune before swinging back toward the Sun.
    The concept of elliptical orbits was first described by Johannes Kepler in the early 17th century, based on observations made by Tycho Brahe. These laws laid the foundation for modern celestial mechanics and our understanding of planetary motion.`
  },
  "stars": {
    info: `Stars are massive, luminous spheres of plasma held together by gravity, primarily composed of hydrogen and helium, with traces of other elements.
    Stars emit energy through nuclear fusion reactions that occur in their cores, converting hydrogen into helium and releasing vast amounts of energy in the form of light and heat.
    The Sun, the closest star to Earth, is a typical main-sequence star, classified as a G-type yellow dwarf. It provides the energy that sustains life on Earth.
    Stars come in a wide range of sizes, temperatures, and colors, which are determined by their mass, age, and stage of evolution.
    The color of a star is related to its surface temperature: hotter stars appear blue or white, while cooler stars appear red.
    Stars are classified into different spectral types based on their spectral characteristics, which include O, B, A, F, G, K, and M classes, with O-type stars being the hottest and M-type stars being the coolest.
    Stars evolve through various stages of their lifecycle, from formation in molecular clouds to main-sequence stars, red giants or supergiants, and eventually to white dwarfs, neutron stars, or black holes, depending on their mass.
    Some stars exist in binary or multiple star systems, where two or more stars orbit around a common center of mass, bound together by gravity.
    The study of stars, known as astrophysics or stellar astronomy, provides insights into the fundamental processes of the universe, including stellar evolution, nucleosynthesis, and the formation of galaxies.
    Stars play a crucial role in the universe's structure and dynamics, influencing the formation of planetary systems, enriching interstellar space with heavy elements, and serving as cosmic beacons for navigation and exploration.`
  }
}

window.info = info;
const scene = new THREE.Scene();
// scene.vi
// Parent object
const parent = new THREE.Object3D();
scene.add(parent);
// 

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
camera.position.x = 100;
camera.position.y = 500;
camera.position.z = 650;
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

const initialPosition = new THREE.Vector3(-300, 150, 550);
const targetPosition = new THREE.Vector3(20, 15, 25); // Zoomed-in position
let zoomFactor = 0;

// Smooth camera zoom function
function smoothZoom() {
  zoomFactor += 0.006; // Increment zoom factor (adjust speed as needed)
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
  map: loader.load("./images/sun_texture.jpg"),
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
  map: loader.load("./images/00_earthmap1k.jpg"),
  // blending: THREE.AdditiveBlending
});
const earth = new THREE.Mesh(earthGeo, earthMesh);
// earth.position.set(5, 0, 10);
earthGroup.add(earth);
const lightMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("./images/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
})
const lightMesh = new THREE.Mesh(earthGeo, lightMaterial);
earthGroup.add(lightMesh);
const cloudsMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("./images/04_earthcloudmap.jpg"),
  roughness: 1,
  metalness: 0,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("./images/05_earthcloudmaptrans.jpg"),
})
const cloudsMesh = new THREE.Mesh(earthGeo, cloudsMaterial);
cloudsMesh.scale.setScalar(1.005);
cloudsMesh.name = "earth";
earthGroup.add(cloudsMesh);
// 
// const cloudsMaterial = new THREE.mes

// Moon 
const moon = createPlanet("./images/moon_texture.jpg", 0.1, 1, 1, 0);
moon.name = "moon";
earthGroup.add(moon);
// 

// Mercury 
const mercury = createPlanet("./images/mercury_texture.jpg", 0.2, -2, -0.2, -10);
mercury.name = "mercury";
parent.add(mercury);
// 

// Venus 
const venus = createPlanet("./images/venus_texture.jpg", 0.4, -5, 0.5, 20);
venus.name = "venus";
parent.add(venus);
// 

// Mars
const mars = createPlanet("./images/mars_texture.jpg", 0.3, 2, 0.8, 40);
mars.name = "mars";
parent.add(mars);
// 

// Jupiter
const jupiter = createPlanet("./images/jupiter_texture.jpg", 2, 3, -1, -50);
jupiter.name = "jupiter";
const jupiterRingGeo = new THREE.RingGeometry(5, 4.5, 30, 1, 0, 6.28);
const jupiterRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // blending: THREE.AdditiveBlending,
  map: loader.load("./images/planetary_ring_texture.jpg"),
  // opacity: 0.3,
  // transparent: true,
  side: THREE.DoubleSide
});
const jupiterRing = new THREE.Mesh(jupiterRingGeo, jupiterRingMaterial);
// jupiterRing.scale.setScalar(3)
jupiterRing.rotateX(200);
jupiterRing.name = "Jupiter's_planetary_ring";
jupiter.add(jupiterRing);
parent.add(jupiter);
// 

// Saturn
const saturn = createPlanet("./images/saturn_texture.jpg", 1.7, 3, 0.9, 60);
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
  saturnRing.name = "Saturn's_planetary_ring";
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
const uranus = createPlanet("./images/uranus_texture.jpg", 1.3, 3, -1, -70);
uranus.name = "uranus";
parent.add(uranus);
// 

// Neptune 
const neptune = createPlanet("./images/neptune_texture.jpg", 1.3, 3, 1.2, 80);
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
  ring.name = "elliptical_path";
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
const stars = getStarfield({ numStars: 3000 });
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
  moon.rotation.y += 0.0005;
  moon.position.x = 2 * Math.cos(earth.rotation.y + Math.PI / 6);
  moon.position.z = 2 * Math.sin(earth.rotation.y + Math.PI / 6);

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
  const intersects = raycaster.intersectObjects(scene.children, true);

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
document.addEventListener("keydown", (e) => {
  if (e.key.toLocaleLowerCase() == "escape" && !document.getElementsByClassName("info")[0].classList.contains("closed")) {
    document.getElementsByClassName("info")[0].classList.add("closed");
    console.log(`${e.key} Pressed!`);
  }
})
// Add event listener for mouse click
canvas.addEventListener('click', onClick, false);

function infoContainer(name) {
  var planetName = document.querySelector(".info div h2");
  var pointsContainer = document.getElementsByClassName("points")[0];
  planetName.innerHTML = name.replaceAll("_", " ");
  pointsContainer.innerHTML = "";
  document.getElementsByClassName("info")[0].classList.remove("closed");
  // info[name].info.split(/(?<!\d)\.(?!\d)/g).map((point) => {
  info[name].info.split(/\n/g).map((point) => {
    if (point.trim() != "") {
      var li = document.createElement("li");
      li.textContent = point;
      pointsContainer.insertAdjacentElement("beforeend", li);
    }
  })
}