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


    $('.info-headings_line').each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          end: '+=80%',
          start: 'top top',
          pin: true,
          scrub: true,
        }
      })
      tl.set($(this).find('.solution-bg'), {
        scaleY: 0,
      })
      tl.set($(this).find('.heading-solutions .char'), {
        y: '-100%',
      })
      tl.to($(this), {
        yPercent: 20,
      }, 'same')

      tl.to($(this).find('.solution-bg'), {
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: easeOut,

      }, 'same')
      tl.to($(this).find('.heading-solutions .char'), {
        y: '0',
        stagger: { amount: 0.4 },

        ease: easeOut,

      }, 'same')

    })


    // ScrollTrigger.create({
    //   trigger: '.section_info',
    //   start: 'top top',
    //   end: '+=450%',

    //   scrub: true,
    //   onUpdate: self => {
    //     currentWaveCount = self.progress * 22
    //     deductionOptions.cam.zoom = self.progress * 5

    //   }
    // })





    // gsap.set('.solution-tooltip', {
    //   xPercent: -50,
    //   yPercent: -50,
    //   scale: 0
    // });


    $('[data-tooltip]').on('mouseenter', function () {
      let tooltip = $(this).attr('data-tooltip')
      $('.tooltip-text').text(tooltip)

      gsap.to($('.tooltip'), {
        scale: 1,
        duration: .6,
        ease: 'ease.circle.inOut',

      })
    })
    $('[data-tooltip]').on('mouseleave', function () {
      let tooltip = $(this).attr('data-tooltip')
      $('.tooltip-text').text(tooltip)

      gsap.to($('.tooltip'), {
        scale: 0,
        duration: .6,
        ease: 'ease.circle.inOut',

      })
    })


    $('.work-card-bg').each(function (index) {
      $(this).hover(function () {

        $(this).find('.work-bg').addClass("active");  //Add the active class to the area is hovered
      }, function () {
        $(this).find('.work-bg').removeClass("active");
      });




    })

    $('.works-cms').each(function () {
      let hovered = 0
      gsap.set('.work-title .char', {
        y: '101%',
      })
      let tl = gsap.timeline({ paused: true })

      tl.to($(this).find('.work-title .char'), {
        y: '0%',
        stagger: { amount: 0.2 },
        ease: easeOut,
        duration: 0.6,
      })

      $(this).on('mouseenter', function () {
        hovered = 1

        tl.play()

      })
      $(this).on('mouseleave', function () {
        hovered = 0
        tl.reverse()

      })

    })




    gsap.from('.main_info .line', {
      stagger: { amount: 0.2 },
      yPercent: 100,
      scrollTrigger: {
        trigger: '.section_info',

      }
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
