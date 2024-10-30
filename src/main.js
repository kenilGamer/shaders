import './styles.css'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 4;

const canvas = document.querySelector('#draw')
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true , canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.IcosahedronGeometry(2.3, 50,50)
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  // flatShading: true,  
  // wireframe: true,
  uniforms: {
    time: { value: 0 },
    uColorChange: { value: 0 }
  },
  side: THREE.DoubleSide
})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = -2.5;
scene.add(mesh)

const lt = gsap.timeline({scrollTrigger: {
  trigger: '.landing',
  start: 'top top',
  end: 'bottom center',
  scrub: 5,
  markers: true
}})
lt.to(scene.position, {
  y: 2.5,
  z:-2,
  duration: 1,
  ease: 'none'
},'a')
lt.to(material.uniforms.uColorChange, {
  value: 1,
  duration: 1,
  ease: 'linear'
},"a")
lt.to(".landing h1", {
  opacity: 0,
  duration: 1,
  ease: 'linear'
},'a').to(".landing p", {
  opacity: 1,
  duration: 1,
  ease: 'linear'
})

const fit = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', fit)

const clock = new THREE.Clock()
const animate = () => {
  requestAnimationFrame(animate)
  material.uniforms.time.value = clock.getElapsedTime();
  renderer.render(scene, camera)
}

fit()
animate()