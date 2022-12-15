// /* eslint-disable */
// import barba from '@barba/core'
// import { gsap } from 'gsap'
// import $ from 'jquery'

// export function initPageTransition() {
//   // barba page loader homepage transition
//   function resetWebflow(data) {
//     let parser = new DOMParser()
//     let dom = parser.parseFromString(data.next.html, 'text/html')
//     let webflowPageId = $(dom).find('html').attr('data-wf-page')
//     $('html').attr('data-wf-page', webflowPageId)
//     window.Webflow && window.Webflow.destroy()
//     window.Webflow && window.Webflow.ready()
//     window.Webflow && window.Webflow.require('ix2').init()
//   }

//   barba.init({
//     preventRunning: true,
//     transitions: [
//       {
//         name: 'default-transition',
//         once() {
//           // pageLoader()
//         },
//         leave() {
//           // create your stunning leave animation here
//         },
//         enter() {
//           // create your amazing enter animation here
//         },
//       },
//     ],
//     views: [
//       {
//         namespace: 'home',
//         beforeLeave(data) {
//           return pageLeave(data.current.container)
//         },
//         once() {
//           console.log('once')
//           pageLoader()
//         },
//         beforeEnter(data) {
//           let transitionData = data
//           homeLoader()
//           console.log('beforeEnter')
//           return gsap.to(data.next.container, {
//             opacity: 100,
//             onComplete: () => {
//               $(data.next.container).removeClass('fixed')
//               resetWebflow(transitionData)
//               $(window).scrollTop(0)
//             },
//           })
//         },
//       },
//       {
//         namespace: 'comming',
//         beforeEnter(data) {
//           let transitionData = data
//           return gsap.to(data.next.container, {
//             opacity: 100,
//             onComplete: () => {
//               $(data.next.container).removeClass('fixed')
//               resetWebflow(transitionData)
//               $(window).scrollTop(0)
//             },
//           })
//         },
//         beforeLeave(data) {
//           return pageLeave(data.current.container)
//         },
//       },
//     ],
//   })

//   function pageLeave(container) {
//     console.log('pageLeave')
//     let tl = gsap.timeline()
//     tl.to(container, {
//       duration: 1.5,
//       opacity: 0,
//       ease: 'power2.inOut',
//     })
//     return tl
//   }
//   // function pageEnter() {
//   //   let tl = gsap.timeline()
//   //   tl.to('.rectangle', {
//   //     duration: 1.5,
//   //     stagger: 0.6,
//   //     height: '100%',
//   //     ease: 'power2.inOut',
//   //     borderRadius: '0rem',
//   //   })
//   //   return tl
//   // }
//   // page transition
//   function homeLoader() {
//     console.log('pageLoader')
//     let easeRect = 'power2.Out'

//     let tl = gsap.timeline()
//     tl.set('.loader', {
//       display: 'none',
//     })
//     //first iteration
//     tl.to(
//       '.rectangle.first',
//       {
//         duration: 0.9,
//         height: '15%',
//         ease: easeRect,
//       },
//       'first-iteration'
//     )
//     tl.to(
//       '.rectangle.second',
//       {
//         duration: 0.9,
//         height: '35%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.15'
//     )
//     tl.to(
//       '.rectangle.third',
//       {
//         duration: 0.9,
//         height: '12%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.3'
//     )
//     tl.to(
//       '.rectangle.fourth',
//       {
//         duration: 0.9,
//         height: '35%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.45'
//     )
//     tl.to(
//       '.rectangle.last',
//       {
//         duration: 0.9,
//         height: '30%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.6'
//     )

//     tl.to(
//       '.rectangle',
//       {
//         duration: 0.8,
//         onComplete: function () {
//           document.querySelectorAll('.rectangle').forEach((el) => {
//             el.classList.add('rectangle--space')
//           })
//         },
//       },
//       'first-iteration+=0.8'
//     )

//     //fourth iteration
//     tl.to(
//       '.rectangle.first',
//       {
//         duration: 0.9,
//         height: '28%',
//         borderRadius: '0rem',
//         ease: easeRect,
//       },
//       'fourth-iteration'
//     )
//     tl.to(
//       '.rectangle.second',
//       {
//         duration: 1.2,
//         height: '15%',
//         borderRadius: '50rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.3'
//     )
//     tl.to(
//       '.rectangle.third',
//       {
//         duration: 0.9,
//         height: '18%',
//         borderRadius: '0rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.6'
//     )
//     tl.to(
//       '.rectangle.fourth',
//       {
//         duration: 0.9,
//         height: '12%',
//         borderRadius: '0rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.6'
//     )
//     tl.to(
//       '.rectangle.last',
//       {
//         duration: 1.2,
//         height: '15%',
//         borderRadius: '50rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.6'
//     )
//   }

//   function pageLoader() {
//     console.log('pageLoader')
//     let easeRect = 'power2.Out'

//     let tl = gsap.timeline()
//     tl.to('.loader__text', {
//       delay: 0.5,
//       duration: 0.8,
//       opacity: 0,
//       ease: 'power2.inOut',
//       yPercent: -20,
//     })
//     //first iteration
//     tl.to(
//       '.rectangle.first',
//       {
//         duration: 0.9,
//         height: '18%',
//         ease: easeRect,
//       },
//       'first-iteration'
//     )
//     tl.to(
//       '.rectangle.second',
//       {
//         duration: 0.9,
//         height: '35%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.15'
//     )
//     tl.to(
//       '.rectangle.third',
//       {
//         duration: 0.9,
//         height: '12%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.3'
//     )
//     tl.to(
//       '.rectangle.fourth',
//       {
//         duration: 0.9,
//         height: '35%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.45'
//     )
//     tl.to(
//       '.rectangle.last',
//       {
//         duration: 0.9,
//         height: '65%',
//         ease: easeRect,
//       },
//       'first-iteration+=0.6'
//     )

//     tl.to(
//       '.rectangle',
//       {
//         duration: 0.8,
//         onComplete: function () {
//           document.querySelectorAll('.rectangle').forEach((el) => {
//             el.classList.add('rectangle--space')
//           })
//         },
//       },
//       'first-iteration+=0.8'
//     )

//     //fourth iteration
//     tl.to(
//       '.rectangle.first',
//       {
//         duration: 0.9,
//         height: '28%',
//         borderRadius: '0rem',
//         ease: easeRect,
//       },
//       'fourth-iteration'
//     )
//     tl.to(
//       '.rectangle.second',
//       {
//         duration: 1.2,
//         height: '15%',
//         borderRadius: '50rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.3'
//     )
//     tl.to(
//       '.rectangle.third',
//       {
//         duration: 0.9,
//         height: '18%',
//         borderRadius: '0rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.6'
//     )
//     tl.to(
//       '.rectangle.fourth',
//       {
//         duration: 0.9,
//         height: '12%',
//         borderRadius: '0rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.6'
//     )
//     tl.to(
//       '.rectangle.last',
//       {
//         duration: 1.2,
//         height: '55%',
//         borderRadius: '50rem',
//         ease: easeRect,
//       },
//       'fourth-iteration+=0.6'
//     )
//   }
// }
