/* eslint-disable */
import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/all'
import $, { speed } from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper';
import 'swiper/css';
import { deductionOptions, deductionCamera, deductionHeight, deductionWidth, deductionMesh } from '../components/deduction'


export function initHome() {
  console.log(deductionOptions);
  gsap.registerPlugin(ScrollTrigger, Flip);
  // * Easing
  let easeOut = 'power2.inOut'

  // * Text Split
  new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title',
    {
      types: 'words, chars, lines',
      tagName: 'divs',
    }
  )
  let currentWaveCount = deductionOptions.perlin.waves


  function MeshMove() {
    let tl = gsap.timeline({
      ease: 'Linear.easeNone',
      scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'top top',
        end: '+=' + document.querySelector('.page-wrapper').offsetHeight,
        scrub: true,
        markers: true,
        onUpdate: self => {
          // deductionOptions.cam.zoom = self.progress * 8
          console.log(deductionOptions.cam.zoom, 'lol');
        }
      },


    })

    tl.to(deductionCamera.position, {
      x: -4,


    }, 'first')
    tl.to(deductionOptions.perlin, {
      waves: 10,


    }, 'first')
      .to(deductionOptions.cam, {
        zoom: 7,
      }, 'first')
      .to(deductionCamera.position, {
        x: 0,

      }, 'same')
      .to(deductionOptions.cam, {
        zoom: 1,
      }, 'same')
      .to(deductionOptions.cam, {
        zoom: 8,
      }, 'last')
      .to(deductionOptions.perlin, {
        waves: 3,
      }, 'last')
      .to(deductionOptions.cam, {
        zoom: 50,
      })


  }

  function Indicator() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page-wrapper',
        markers: true,
        start: 'top top',
        endTrigger: '.page-wrapper',
        end: '+=' + document.querySelector('.page-wrapper').offsetHeight,
        scrub: true,
        onUpdate: self => {
          console.log(self.progress);
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
    tl.set('.main_info par .char', {
      yPercent: 100,
    })

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
          end: '+=110%',
          start: 'top top',
          pin: true,
          scrub: true,
        }
      })
      tl.to($(this), {
        yPercent: 30,
      })

    })





    $('.info-headings_line').each(function (index) {
      gsap.set($(this).find('.solution-bg'), {
        scaleY: 0,
      })
      gsap.set($(this).find('.heading-solutions .char'), {
        y: '-100%',
      })
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top top',
          end: '+=120%',
          scrub: true,
        }
      });

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
    $(window).on('mousemove', function (e) {
      gsap.to('.tooltip', {
        duration: 0,
        overwrite: "auto",
        x: e.clientX,
        y: e.clientY,
        ease: "none"
      });
      deductionMesh.position.x = e.clientX / 1500
      deductionMesh.position.y = e.clientY / -5000
      currentWaveCount = deductionOptions.perlin.waves
    })

    $('[data-tooltip]').on('mouseenter', function () {
      //get attribute value
      let tooltip = $(this).attr('data-tooltip')
      $('.tooltip-text').text(tooltip)

      gsap.to($('.tooltip'), {
        scale: 1,
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
        y: '-100%',
      })
      console.log(hovered);
      let tl = gsap.timeline({ paused: true })

      tl.to($(this).find('.work-title .char'), {
        y: '0%',
        stagger: { amount: 0.4 },
        ease: easeOut,
        duration: 0.6,
      })

      $(this).on('mouseenter', function () {
        hovered = 1
        console.log(hovered);
        tl.play()

      })
      $(this).on('mouseleave', function () {
        hovered = 0
        console.log(hovered);
        tl.reverse()

      })

    })

    $('[data-tooltip]').on('mouseleave', function () {
      //get attribute value
      let tooltip = $(this).attr('data-tooltip')
      $('.tooltip-text').text(tooltip)

      gsap.to($('.tooltip'), {
        scale: 0,
        duration: 0.35,
        ease: 'ease.circle.out',
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
        end: '+=60%',
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
      speed: 500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
      // change slides speed
    });

    $('.swiper-button-next').on('click', function () {
      console.log('next');
      swiper.slideNext()
    })
    $('.swiper-button-prev').on('click', function () {
      console.log('prev');
      swiper.slidePrev()
    })



  }

  let master = gsap.timeline()
  master.add(Hero()).add(PinText()).add(Info()).add(Works()).add(MeshMove()).add(Indicator()).add(Clients())




}


