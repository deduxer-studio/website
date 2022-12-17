/* eslint-disable */
import barba from '@barba/core'
import { gsap } from 'gsap'
import $ from 'jquery'

export function initPageTransition() {
  // barba page loader homepage transition
  function resetWebflow(data) {
    let parser = new DOMParser()
    let dom = parser.parseFromString(data.next.html, 'text/html')
    let webflowPageId = $(dom).find('html').attr('data-wf-page')
    $('html').attr('data-wf-page', webflowPageId)
    window.Webflow && window.Webflow.destroy()
    window.Webflow && window.Webflow.ready()
    window.Webflow && window.Webflow.require('ix2').init()
  }
  //document ready
  $(document).ready(function () {
    //page loader
    barba.init({
      preventRunning: true,
      transitions: [
        {
          name: 'default-transition',
          once() {
            // pageLoader()
          },
          leave() {
            // create your stunning leave animation here
          },
          enter() {
            // create your amazing enter animation here
          },
        },
      ],
      views: [
        {
          namespace: 'home',
          beforeLeave(data) {
            return pageLeave(data.current.container)
          },
          once() {
            console.log('once')
            pageLoader()
          },
          beforeEnter(data) {
            let transitionData = data
            homeLoader()
            console.log('beforeEnter')
            return gsap.to(data.next.container, {
              opacity: 100,
              onComplete: () => {
                $(data.next.container).removeClass('fixed')
                resetWebflow(transitionData)
                $(window).scrollTop(0)
              },
            })
          },
        },
        {
          namespace: 'comming',
          beforeEnter(data) {
            let transitionData = data
            return gsap.to(data.next.container, {
              opacity: 100,
              onComplete: () => {
                $(data.next.container).removeClass('fixed')
                resetWebflow(transitionData)
                $(window).scrollTop(0)
              },
            })
          },
          beforeLeave(data) {
            return pageLeave(data.current.container)
          },
        },
      ],
    })
  })


  function pageLeave(container) {
    console.log('pageLeave')
    let tl = gsap.timeline()

    return tl
  }
  // function pageEnter() {
  //   let tl = gsap.timeline()
  //   tl.to('.rectangle', {
  //     duration: 1.5,
  //     stagger: 0.6,
  //     height: '100%',
  //     ease: 'power2.inOut',
  //     borderRadius: '0rem',
  //   })
  //   return tl
  // }
  // page transition loader
  function homeLoader() {
    let tl = gsap.timeline()
    tl.to('#logo-loader', {
      clipPath: 'inset(0 0 0% 0)',
      // loading time duration
      duration: 3,
      ease: 'expo.inOut',
    })
    tl.to('.close-mask', {
      height: '100%',
      delay: 0.4,
      duration: .65,
      ease: 'quad.out',
    }, 'same')
    tl.to('.loader-logo', {
      scale: 1.12,
      delay: 0.2,
      duration: .45,
      ease: 'sine.inOut',
    }, 'same')
    tl.to('.loader-logo', {
      display: 'none',
      duration: 0,
    })
    tl.to('.loader-col', {
      y: '-100%',
      stagger: 0.4,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 'same')


  }

  function pageLoader() {
    gsap.to('#logo-loader', {
      clipPath: 'inset(0 0 0% 0)',
      // loading time duration
      duration: 1.5,
      ease: 'power2.inOut',
    })


  }
}
