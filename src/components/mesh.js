/* eslint-disable */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { deductionCamera, deductionMesh, deductionOptions } from './deduction'

export function initMesh() {
  gsap.registerPlugin(ScrollTrigger)


  if (window.innerWidth > 768) {





    deductionCamera.position.x = -3
    //clients
    ScrollTrigger.create({
      trigger: '.section_clients',
      start: 'top top',
      end: '+=40%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionOptions.cam, {
          zoom: 6,
          duration: 1,
        })
        gsap.to(deductionCamera.position, {
          x: 0,
          duration: 2,
        })
      },
      onLeaveBack: () => {

        gsap.to(deductionOptions.cam, {
          zoom: 2,
          duration: 1,
        })
        gsap.to(deductionCamera.position, {
          x: 3,
          duration: .5,
        })
      }
    })
    ScrollTrigger.create({
      trigger: '.section_process',
      start: 'top top',
      end: '+=80%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionOptions.cam, {
          zoom: 1,
          duration: 1,
        })
        gsap.to(deductionCamera.position, {
          x: 3,
          duration: 1,
        })
      },
      onLeaveBack: () => {

        gsap.to(deductionCamera.position, {
          x: -3,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 2,
          duration: 1,
        })
      }
    })
    //introduction
    ScrollTrigger.create({
      trigger: '.section-introduction',
      start: 'top top',
      end: '+=40%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionCamera.position, {
          x: -3,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 2,
          duration: 1,
        })
      },
    })
    //info
    ScrollTrigger.create({
      trigger: '.section_info',
      start: 'top top',
      end: '+=100%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionCamera.position, {
          x: 0,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 15,
          duration: 1,
        })
      },
      onLeaveBack: () => {
        gsap.to(deductionCamera.position, {
          x: -3,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 2,
          duration: 1,
        })
      },
    })


    //footer
    ScrollTrigger.create({
      trigger: '.component_footer',
      start: 'top top',
      end: '+=100%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionCamera.position, {
          x: 0,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 2,
          duration: 1,
        })
      },
      onLeaveBack: () => {
        gsap.to(deductionCamera.position, {
          x: 3,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 6,
          duration: 1,
        })
      },
    })

    //move mesh on mouse move
    document.addEventListener('mousemove', (e) => {
      let x = e.clientX / window.innerWidth - 0.5
      let y = e.clientY / window.innerHeight - 0.5
      gsap.to(deductionMesh.position, {
        x: x * 1.5,
        y: y * 1.5,
        duration: 1,
      })
    })




    // return tl
  }
  else {
    deductionCamera.position.x = -1
    deductionCamera.position.y = 0
    deductionOptions.cam.zoom = 18
    ScrollTrigger.update()
    //info
    ScrollTrigger.create({
      trigger: '.section_info',
      start: 'top top',
      end: '+=100%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionCamera.position, {
          x: 0,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 25,
          duration: 1,
        })
      },
      onLeaveBack: () => {
        gsap.to(deductionCamera.position, {
          x: -1,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 18,
          duration: 1,
        })
      },
    })


    ScrollTrigger.create({
      trigger: '.section_clients',
      start: 'top top',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionOptions.cam, {
          zoom: 12,
          duration: 1,
        })
        gsap.to(deductionCamera.position, {
          x: 1,
          duration: 2,
        })
      },
      onLeaveBack: () => {
        gsap.to(deductionOptions.cam, {
          zoom: 18,
          duration: 1,
        })
        gsap.to(deductionCamera.position, {
          x: 0,
          duration: .5,
        })
      }
    })


    ScrollTrigger.create({
      trigger: '.section-introduction',
      start: 'top top',
      end: '+=40%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionCamera.position, {
          x: -1,
          duration: 1,
        })
        gsap.to(deductionOptions.cam, {
          zoom: 18,
          duration: 1,
        })
      },
    })
    //info headings
    ScrollTrigger.create({
      trigger: '.info-headings_line-last',
      start: 'top center',
      end: '+=100%',
      scrub: true,
      onEnter: () => {
        gsap.to(deductionOptions.cam, {
          zoom: 10,
          duration: 1,
        })
      },
      onLeaveBack: () => {
        gsap.to(deductionOptions.cam, {
          zoom: 18,
          duration: 1,
        })
      },
    })



  }



}
