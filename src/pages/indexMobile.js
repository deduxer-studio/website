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
  new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap',
    {
      types: 'words, chars, lines',
      tagName: 'span',
    }
  )

  function HeroMobile() {
    $(".heading-wrap").each(function (index) {
      let headings = $(this).find(".heading-hero");
      headings.each(function () {
        gsap.set($(this), {
          opacity: 1,
        });
      });

      let tl = gsap.timeline({ repeat: -1 });
      tl.set($(this), { opacity: 1 });
      tl.delay(4);

      headings.each(function (index) {

        if (index > 0) {
          tl.from($(this).find(".char"), { yPercent: 100, stagger: { amount: 0.25 }, duration: 1, ease: easeOut }, "<0.1");
        }
        if (index < headings.length - 1) {
          tl.to($(this).find(".char"), { delay: 0.3, yPercent: -100, stagger: { amount: 0.2 }, duration: 0.8, ease: easeOut });
        }
      });
    });

    let tl = gsap.timeline({})
    tl.delay(3.5);
    tl.set('.hero-content_block .line', {
      overflow: 'hidden',
    })
    tl.from('.hero-content_block .char', {
      yPercent: 100,
      stagger: { amount: 0.8 },
      ease: easeOut,
      duration: 1.5,

    })
    return tl
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
      })
      $(this).find('.solution-block').each(function (index) {
        tl.to($(this), {
          // index y perc
          xPercent: -index * 100,
          ease: 'sine.in',
          stagger: { amount: 0.2 },
        })
        //reduce opacity for previous block
        if (index > 0 && !index == $(this).length - 1) {
          tl.to($(this).prev(), {
            opacity: 0.2,
          })
        }
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



}
