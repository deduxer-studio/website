/* eslint-disable */
import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/all'
import $ from 'jquery'
import SplitType from 'split-type'

export function initHome() {

  gsap.registerPlugin(ScrollTrigger, Flip);
  // * Easing
  let easeOut = 'power2.inOut'

  // * Text Split
  new SplitType(
    '[text-split], .heading-hero, .hero-content_block',
    {
      types: 'words, chars, lines',
      tagName: 'span',
    }
  )




  function Hero() {
    $(".heading-wrap").each(function (index) {
      let headings = $(this).find(".heading-hero");
      headings.each(function () {
        gsap.set($(this), {
          opacity: 1,
        });
      });

      let tl = gsap.timeline({ repeat: -1 });
      tl.set($(this), { opacity: 1 });

      headings.each(function (index) {

        if (index > 0) {
          tl.from($(this).find(".char"), { yPercent: 100, stagger: { amount: 0.2 }, duration: 1, ease: easeOut }, "<0.1");
        }
        if (index < headings.length - 1) {
          tl.to($(this).find(".char"), { delay: 0.5, yPercent: -100, stagger: { amount: 0.2 }, duration: 0.8, ease: easeOut });
        }
      });
    });

    let tl = gsap.timeline()
    tl.from('.hero-content-row', {
      opacity: 0,
      yPercent: 100,
      stagger: { amount: 0.2 },
      duration: 1,
      //add class on timeline end
      onComplete: function () {
        const state = Flip.getState(".hero-content-row, .hero-content_block");
        $(".hero-content-row").each(function (index) {
          $(this).addClass("active");

        });

        Flip.from(state, {
          absolute: true, // uses position: absolute during the flip to work around flexbox challenges
          duration: 1,
          stagger: 0.03,
          ease: easeOut
          // you can use any other tweening properties here too, like onComplete, onUpdate, delay, etc. 
        });
      },
      ease: easeOut,
    })
      .from('.navbar', {
        scaleY: 0,
        ease: easeOut,
        duration: 1,
        transformOrigin: 'bottom',
      })
      .from('.navbar-logo', {
        opacity: 0,
      }, '<0.5')
      .from('.navbar-navigation a', {
        opacity: 0,
        yPercent: 100,
        ease: easeOut,
        duration: 1,
        stagger: { amount: 0.2 },
      }, '<0.2')


  }


  function PinText() {


    $('.info-headings_line').each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          end: '+=100%',
          start: 'top top',
          pin: true,
          scrub: true,
        }
      })
      tl.to($(this), {
        opacity: 1,
      })
    })


  }
  gsap.set('.works__rectangles', {
    display: 'none'
  })

  function SwitchRectangles() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_hero',
        start: 'top top',
        end: '+=100%',
        scrub: true,
        markers: true,
      }
    })
    tl.to('.rectangles_clone', {
      display: 'none',
      onComplete: function () {
        document.querySelectorAll('.rectangle_clone').forEach((el) => {
          el.classList.add('rectangle--space')
        })
      },
    })
      .to('.rectangles_clone', {
        display: 'block',
        duration: 0,

      }, 'show')
      .to('.rectangles', {
        display: 'none',
        duration: 0,

      }, 'show')
      .to('.page-wrapper', {
        backgroundColor: '#7E3AF9'
      })
      .to('.rectangle-clone', {
        backgroundColor: 'rgba(242, 235, 254, 0.06)',
        ease: 'sine.inOut',
      }, 'show')

      .to('.rectangle-clone.first', {
        height: Math.floor(Math.random() * (35 - 5 + 1)) + 5 + '%',
        borderRadius: '0rem',
        ease: 'sine.inOut',
        duration: 3,
      })
      .to('.rectangle-clone.second', {
        height: Math.floor(Math.random() * (35 - 5 + 1)) + 5 + '%',
        borderRadius: '0rem',
        ease: 'sine.inOut',
        duration: 3,
      })
      .to('.rectangle-clone.third', {
        height: Math.floor(Math.random() * (35 - 5 + 1)) + 5 + '%',
        borderRadius: '50rem',
        ease: 'sine.inOut',
        duration: 3,
      })




    return tl
  }

  let master = gsap.timeline()
  master.add(Hero()).add(PinText()).add(SwitchRectangles())

}

