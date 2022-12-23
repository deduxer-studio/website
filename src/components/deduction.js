/* eslint-disable */
import { gsap } from 'gsap'
import * as THREE from 'three';


// Three JS Template

export function initDeduction() { }
function init() {
  createWorld();
  createLights();
  //createGrid();
  createPrimitive();
  //---
  animation();
}

export { options as deductionOptions }
export { camera as deductionCamera }
export { _width as deductionWidth }
export { _height as deductionHeight }
export { mesh as deductionMesh }


//--------------------------------------------------------------------
var scene, camera, renderer, container;
var _width, _height;
var mat;

function createWorld() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  //---
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 5, 15);
  // scene.background = new THREE.Color(0xF2EBFE);
  //---
  camera = new THREE.PerspectiveCamera(35, _width / _height, 1, 1000);
  camera.position.set(3, 1, 10);

  //---
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // the default

  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  //---
  document.querySelector('.deduction_embed').appendChild(renderer.domElement);
  //---
  if (window.innerWidth > 768) {
    window.addEventListener('resize', onWindowResize, false);
  }
}
function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
}
//--------------------------------------------------------------------
var _ambientLights, _lights;
function createLights() {
  //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
  _ambientLights = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1.4);
  _lights = new THREE.PointLight(0xFFFFFF, .5);
  _lights.position.set(50, 20, 20);
  //scene.add(_lights);
  scene.add(_ambientLights);
}
//--------------------------------------------------------------------
var uniforms = {
  time: {
    type: "f",
    value: 1.0
  },
  pointscale: {
    type: "f",
    value: 1.0
  },
  decay: {
    type: "f",
    value: 2.0
  },
  complex: {
    type: "f",
    value: 2.0
  },
  waves: {
    type: "f",
    value: 3.0
  },
  eqcolor: {
    type: "f",
    value: 3.0
  },
  fragment: {
    type: 'i',
    value: false
  },
  dnoise: {
    type: 'f',
    value: 0.0
  },
  qnoise: {
    type: 'f',
    value: 4.0
  },
  r_color: {
    type: 'f',
    value: 0.0
  },
  g_color: {
    type: 'f',
    value: 0.0
  },
  b_color: {
    type: 'f',
    value: 0.0
  }
}

var speedRandom = Math.random(10) / 10000;

var options = {
  perlin: {
    vel: 0.002,
    speed: 0.0004,
    perlins: 1.0,
    decay: 0.15,
    complex: 0.0,
    waves: 4.0,
    eqcolor: 2.0,
    fragment: false,
    redhell: true
  },
  rgb: {
    r_color: 0.6,
    g_color: 0.8,
    b_color: 0.10
  },
  cam: {
    zoom: 2
  }
}
if (window.innerWidth < 768) {
  options = {
    perlin: {
      vel: 0.002,
      speed: 0.0004,
      perlins: 1.0,
      decay: 0.15,
      complex: 0.0,
      waves: 4.0,
      eqcolor: 2.0,
      fragment: false,
      redhell: true
    },
    rgb: {
      r_color: 0.6,
      g_color: 0.8,
      b_color: 0.10
    },
    cam: {
      zoom: 20
    }
  }

}

let mesh
var primitiveElement = function () {
  this.mesh = new THREE.Object3D();
  var geo = new THREE.IcosahedronGeometry(1, 6);
  //var mat = new THREE.MeshPhongMaterial({color:0xFF0000, flatShading:true});
  mat = new THREE.ShaderMaterial({
    wireframe: false,
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  mesh = new THREE.Mesh(geo, mat);
  //---
  this.mesh.add(mesh);
}
var _primitive;
function createPrimitive() {
  _primitive = new primitiveElement();
  _primitive.mesh.scale.set(1, 1, 1);
  scene.add(_primitive.mesh);
}
function createGrid() {
  var gridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = -1;
  scene.add(gridHelper);
}
//--------------------------------------------------------------------
var start = Date.now();
function animation() {
  requestAnimationFrame(animation);

  var time = Date.now() * 0.003;

  gsap.to(camera.position, 1, { z: options.cam.zoom + 5 });

  _primitive.mesh.rotation.y += 0.001;
  mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
  mat.uniforms['pointscale'].value = options.perlin.perlins;
  mat.uniforms['decay'].value = options.perlin.decay;
  mat.uniforms['complex'].value = options.perlin.complex;
  mat.uniforms['waves'].value = options.perlin.waves;
  mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
  mat.uniforms['r_color'].value = options.rgb.r_color;
  mat.uniforms['g_color'].value = options.rgb.g_color;
  mat.uniforms['b_color'].value = options.rgb.b_color;
  mat.uniforms['fragment'].value = options.perlin.fragment;
  //---
  renderer.render(scene, camera);
}
init()
