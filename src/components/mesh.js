import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { deductionCamera, deductionMesh, deductionOptions } from './deduction'

export function initMesh() {
  gsap.registerPlugin(ScrollTrigger)
  let currentZoom = deductionOptions.cam.zoom
  let currentDecay = deductionOptions.perlin.decay
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.page-wrapper',
      start: 'top top',
      end: '+=' + document.querySelector('.main-wrapper').offsetHeight,
      scrub: true,
      onUpdate: (self) => {
        currentZoom = deductionOptions.cam.zoom
        deductionOptions.perlin.waves = Math.min(self.progress + 3 * 2, 15)
      },
    },
  })

  tl.to(
    deductionCamera.position,
    {
      x: 3,
    },
    'first'
  )
  tl.to(deductionCamera.position, {
    x: -3,
  })
  tl.fromTo(
    deductionOptions.cam,
    {
      zoom: currentZoom,
    },
    {
      zoom: 45,
      delay: 3.2,
    },
    'client'
  )
  tl.to(
    deductionCamera.position,
    {
      x: 0,
      delay: 1.4,
    },
    'client'
  )
  tl.fromTo(
    deductionOptions.perlin,
    {
      decay: currentDecay,
    },
    {
      delay: 3.4,
      decay: 0.22,
    },
    'client'
  ).fromTo(
    deductionOptions.cam,
    {
      zoom: currentZoom,
    },
    {
      zoom: 2,
    },
    'footer'
  )

  // window on mouse move vanilla js
  window.addEventListener('mousemove', function (e) {
    gsap.to('.tooltip', {
      duration: 0,
      overwrite: 'auto',
      x: e.clientX,
      y: e.clientY,
      ease: 'none',
    })
    deductionMesh.position.x = e.clientX / 1500
    deductionMesh.position.y = e.clientY / -5000
  })

  return tl
}
