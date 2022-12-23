/* eslint-disable */
import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper';
import 'swiper/css';

export function initMobile() {
  gsap.registerPlugin(ScrollTrigger);
  // * Easing
  let easeOut = 'power3.inOut'

  // * Text Split
  const split = new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap',
    {
      types: 'words, chars, lines',
      tagName: 'span',
    }
  )
  //update split on resize
  window.addEventListener('resize', () => {
    split.revert()
    split.split()
  })

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

    })

      .from('.navbar', {
        yPercent: -100,
        ease: easeOut,
        duration: 1,
      })

    // gsap.set('.main-paragraph .word', {
    //   yPercent: -100,
    // })
    // gsap.to('.main-paragraph .word', {
    //   stagger: { amount: 0.2 },
    //   yPercent: 0,
    //   duration: .6,
    //   scrollTrigger: {
    //     trigger: '.main-paragraph',
    //     start: 'top 70%',
    //     toggleActions: 'play complete reverse reverse',
    //   }
    // })
  }
  function Clients() {
    let swiper = new Swiper('.clients-slider', {
      // Optional parameters
      speed: 1500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
      // change slides speed
    });

    $('.swiper-button-next').on('click', function () {
      swiper.slideNext()
    })
    $('.swiper-button-prev').on('click', function () {
      swiper.slidePrev()
    })



  }

  function PinText() {
    $('.info-block').each(function () {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      }, 'same')

      $(this).find('.solution-block').each(function (index) {
        tl.to($(this), {
          // index y perc
          xPercent: -index * 100,
          ease: 'sine.in',
          stagger: { amount: 0.1 },
        })
        //reduce opacity for previous block
        if (index > 0 && !index == $(this).length - 1) {
          tl.to($(this).prev(), {
            opacity: 0.2,
          })
        }
        //is last
      })

      $(this).find('.info-block_divider').each(function (index) {
        tl.to($(this), {
          // index y perc
          width: '100%',
          ease: 'sine.in',
        }, 0)
        //is last
      })
      return tl


    })
  }

  function Scruber() {

    $(".main_info").each(function () {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          // trigger element - viewport
          start: "top center",
          end: "+=120%",
          scrub: 1
        }
      });

      tl.from($(this).find(".word"), {
        opacity: 0.2,
        stagger: { amount: 0.8 },
      });
    });

  }
  function Links() {

    function getRandomLetter(length) {
      var result = "";
      var characters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|:<>?";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    $(".char").each(function (index) {
      let text = $(this).text();
      $(this).attr("letter", text);
    });

    $(".letter-wrap").each(function (index) {
      function resetText() {
        if (myInterval !== undefined) {
          clearInterval(myInterval);
        }
        chars.each(function (index) {
          let letter = $(this).attr("letter");
          $(this).text(letter);
        });
      }

      let myInterval;
      let chars = $(this).find(".char");
      $(this).on("mouseenter", function () {
        let length = chars.length;
        myInterval = setInterval(function () {
          chars.each(function (index) {
            if (index < length) {
              let letter = getRandomLetter(1);
              $(this).text(letter);
            } else {
              let letter = $(this).attr("letter");
              $(this).text(letter);
            }
          });
          length = length - 1;
        }, 100);
        setTimeout(() => {
          resetText();
        }, 600);
      });
      $(this).on("mouseleave", function () {
        resetText();
      });
    });
  }


  let master = gsap.timeline()
  master.add(HeroMobile()).add(Clients()).add(Links()).add(PinText()).add(Scruber())



  console.clear()
  console.log('Loaded Mobile');


  const lenis = new Lenis({
    duration: 1.8,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: true,
    smoothMobile: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);



}
