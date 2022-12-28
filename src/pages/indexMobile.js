import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper'
import 'swiper/css'

export function initMobile() {
  gsap.registerPlugin(ScrollTrigger)
  // * Easing
  let easeOut = 'power3.inOut'

  // * Text Split
  new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap, .heading-process-card, .main-paragraph-process',
    {
      types: 'words, chars, lines',
      tagName: 'span',
    }
  )
  function Process() {
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top bottom',
        onLeaveBack: () => {
          timeline.progress(0)
          timeline.pause()
        },
      })
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 60%',
        onEnter: () => timeline.play(),
      })
    }

    $('[words-slide-up]').each(function () {
      let tl = gsap.timeline({ paused: true })
      tl.from($(this).find('.word'), {
        yPercent: 101,
        duration: 0.65,
        ease: easeOut,
        stagger: '0.007',
      })
      createScrollTrigger($(this), tl)
    })

    $('[letters-slide-up]').each(function () {
      let tl = gsap.timeline({ paused: true })
      tl.from($(this).find('.char'), {
        yPercent: 101,
        duration: 0.35,
        ease: easeOut,
        stagger: '0.018',
      })
      createScrollTrigger($(this), tl)
    })
    $('.card-lottie').each(function () {
      let tl = gsap.timeline({ paused: true })
      tl.from($(this), {
        yPercent: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power1.inOut',
      })
      createScrollTrigger($(this), tl)
    })
    $('.process-card').each(function () {
      let tl = gsap.timeline({ paused: true })
      tl.from($(this), { scaleY: 0.75, duration: 0.9, ease: easeOut })
      createScrollTrigger($(this), tl)
    })
  }

  function HeroMobile() {
    let tl = gsap.timeline()
    tl.delay(4)
    gsap.set('.intro-heading_itself .char', {
      yPercent: 100,
    })

    tl.to('.intro-heading_itself .char', {
      yPercent: 0,
      stagger: '0.018',
      ease: easeOut,
      duration: 1.2,
    }).from('.navbar', {
      yPercent: -100,
      ease: easeOut,
      duration: 1,
    })
  }
  function WorksEnter() {
    $('.work-bg-placeholder').each(function () {
      //change height to 0% when element is in viewport
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            console.log('enter')
            $(this).css('height', '0%')
          },
        },
      })

      return tl
    })
  }
  function Clients() {
    let swiper = new Swiper('.clients-slider', {
      // Optional parameters
      speed: 1500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // change slides speed
    })

    $('.swiper-button-next').on('click', function () {
      swiper.slideNext()
    })
    $('.swiper-button-prev').on('click', function () {
      swiper.slidePrev()
    })
  }

  function Links() {
    function getRandomLetter(length) {
      var result = ''
      var characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|:<>?'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    }

    $('.char').each(function () {
      let text = $(this).text()
      $(this).attr('letter', text)
    })

    $('.letter-wrap').each(function () {
      function resetText() {
        if (myInterval !== undefined) {
          clearInterval(myInterval)
        }
        chars.each(function () {
          let letter = $(this).attr('letter')
          $(this).text(letter)
        })
      }

      let myInterval
      let chars = $(this).find('.char')
      $(this).on('mouseenter', function () {
        let length = chars.length
        myInterval = setInterval(function () {
          chars.each(function (index) {
            if (index < length) {
              let letter = getRandomLetter(1)
              $(this).text(letter)
            } else {
              let letter = $(this).attr('letter')
              $(this).text(letter)
            }
          })
          length = length - 1
        }, 100)
        setTimeout(() => {
          resetText()
        }, 600)
      })
      $(this).on('mouseleave', function () {
        resetText()
      })
    })
  }

  function Navbar() {
    // hamburger menu click function with jquery and gsap

    let tl = gsap.timeline({ paused: true })
    gsap.set('.navbar-background', {
      display: 'flex',
      y: '-100%',
    })
    gsap.set('.navbar-links .char', {
      yPercent: 101,
    })
    gsap.set('.socials-navbar .char', {
      yPercent: 101,
    })
    gsap.set('.navbar-indicator div', {
      yPercent: 101,
    })
    tl.to(
      '.navbar-background',
      {
        y: '0%',
        duration: 1.6,
        ease: easeOut,
      },
      'same'
    )
    tl.to(
      '.navbar-menu_wrapper',
      {
        height: '70vh',
        duration: 1.2,
        ease: easeOut,
        delay: 0.8,
      },
      'same'
    )
    tl.to(
      '.navbar-links .char',
      {
        stagger: '0.018',
        yPercent: 0,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out',
      },
      'same'
    )
    tl.to(
      '.socials-navbar .char',
      {
        yPercent: 0,
        duration: 0.6,
        delay: 1.4,
        ease: 'power2.out',
      },
      'same'
    )

    tl.to(
      '.navbar-indicator div',
      {
        yPercent: 0,
        stagger: { amount: 0.2 },
        duration: 0.9,
        delay: 1.2,
        ease: easeOut,
      },
      'same'
    )

    $('.navbar-hamburger').on('click', function () {
      $('.component_navbar').toggleClass('active')
      if ($('.component_navbar').hasClass('active')) {
        tl.timeScale(1)
        tl.play()
      } else {
        tl.timeScale(1.6)
        tl.reverse()
        //play 2x faster
      }
    })
  }

  let master = gsap.timeline()
  master
    .add(HeroMobile())
    .add(Clients())
    .add(Links())
    .add(WorksEnter())
    .add(Navbar())
    .add(Process())
}
