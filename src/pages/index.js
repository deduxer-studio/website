/* eslint-disable */
import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/all'
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper';
import 'swiper/css';



export function initHome() {
  gsap.registerPlugin(ScrollTrigger, Flip);
  // * Easing
  let easeOut = 'power2.inOut'

  // * Text Split
  new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap',
    {
      types: 'words, chars, lines',
      tagName: 'divs',
    }
  )

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


  function Indicator() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-wrapper',
        start: 'top top',
        endTrigger: '.main-wrapper',
        end: '+=' + document.querySelector('.main-wrapper').offsetHeight,
        scrub: true,
        onUpdate: self => {
          //check if element is in view
          $('section').each(function (index) {

            //check if this section is in view
            if (
              $(this).offset().top < $(window).scrollTop() + $(window).height() &&
              $(this).offset().top + $(this).height() > $(window).scrollTop()
            ) {

              //add class to section
              $(this).addClass('active');
              $('.indicator-block').removeClass('active')
              $('.indicator-block').eq(index).addClass('active')
              //remove class from section
              $(this).siblings().removeClass('active');
            }
          })


          $(".marquee").each(function (index) {
            let track = $(this).find(".marquee_track");
            let items = $(this).find(".marquee_item");
            let tl = gsap.timeline({ repeat: -1, defaults: { ease: "expo.inOut", duration: 1, delay: 1 } });

            items.each(function (index) {
              let distance = (index + 1) * -100;
              tl.to(track, { yPercent: distance });
            });

            items.first().clone().appendTo(track);
          });



        }

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
      tl.delay(4);

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
          absolute: true,
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
      .from('.navbar-navigation_link', {
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

  function Info() {
    //scrolltrigger till end of section 
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_info',
        start: 'top top',
        end: '+=300%',

        scrub: true,

      }
    })



  }

  function Works() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_works',
        start: 'top top',
        scrub: true,
        pin: true,
        end: '+=40%',
      }
    })

    tl.to('.background-works', {
      width: '100%',
      height: '100%',
      borderRadius: 0,
      ease: easeOut,
    })



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
  function Footer() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.component_footer',
        start: 'top top',
        pin: true,
        scrub: true,
        end: '+=80%',
      }
    })

    tl.from('.footer-bg', {
      scaleX: 1.2,
      borderRadius: 0,
      ease: easeOut,
    })
  }
  //document readdy
  let master = gsap.timeline()
  master.add(Hero()).add(PinText()).add(Info()).add(Works()).add(Indicator()).add(Clients()).add(Footer()).add(Links()).add(Scruber())


  console.clear()




}


