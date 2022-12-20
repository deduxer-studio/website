/* eslint-disable */
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
      end: '+=' + document.querySelector('.page-wrapper').offsetHeight,
      scrub: true,
      onUpdate: (self) => {
        currentZoom = deductionOptions.cam.zoom
        deductionOptions.perlin.waves = Math.min(self.progress + 3 * 2, 15)
      },
    },
  })

  if (window.innerWidth > 768) {




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
        zoom: 12,
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
  else {
    deductionCamera.position.x = 0
    deductionCamera.position.y = 0
    ScrollTrigger.create({
      trigger: '.section_clients',
      start: 'top top',
      end: '+=40%',
      scrub: true,
      onUpdate: (self) => {
        deductionOptions.cam.zoom = Math.min(self.progress * 40, 40)
        console.log(deductionOptions.cam.zoom);
      },
    })
    ScrollTrigger.create({
      trigger: '.component_footer',
      start: 'top top',
      end: '+=50%',
      scrub: true,
      onUpdate: (self) => {
        deductionOptions.cam.zoom = Math.min(self.progress * 2, 2)
        console.log(deductionOptions.cam.zoom);
      },
    })
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'top top',
        end: '+=' + document.querySelector('.page-wrapper').offsetHeight,
        scrub: true,
        onUpdate: (self) => {
          currentZoom = deductionOptions.cam.zoom
          deductionOptions.perlin.waves = Math.min(self.progress + 3 * 2, 15)
        },
      },
    })
    tl.fromTo(deductionOptions.cam, {
      zoom: 20,
    }, {
      zoom: 10,
    }, 'first')
    tl.fromTo(deductionCamera.position, {
      y: 0,
      x: 0,
    }, {
      y: 2,
      x: -3,
    }, 'first')
    // tl.fromTo(deductionCamera.position, {
    //   y: 2,
    //   x: 1,
    // }, {
    //   y: -2,
    //   x: 0,
    // })
    // tl.fromTo(deductionOptions.cam, {
    //   zoom: 2,
    // }, {
    //   zoom: 10,
    // }, 'clients')
    // tl.fromTo(deductionOptions.cam, {
    //   zoom: 50,
    // }, {
    //   zoom: 3,
    // }, '+=1')
    tl.fromTo(deductionCamera.position, {
      y: -2,
      x: -3,
    }, {
      y: 1,
      x: 0,
    }, 'last')

    return tl



  }



}
