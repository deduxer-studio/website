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


  //tooltip follow mouse with gsap

  $(document).on('mousemove', function (e) {
    gsap.to('.tooltip', {
      x: e.clientX,
      y: e.clientY,
    })
  })

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
        //increase tl speed
        tl.timeScale(2)
        tl.reverse()

      })

    })






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



  function Hero() {

    let tl = gsap.timeline()
    tl.delay(4)
    gsap.set('.intro-heading_itself .char', {
      yPercent: 100,
    })

    tl.to('.intro-heading_itself .char', {
      yPercent: 0,
      stagger: '0.016',
      ease: 'power2.out',
      duration: 1.15,

    })

      .from('.navbar', {
        yPercent: -100,
        ease: easeOut,
        duration: .6,
      })

    gsap.set('.main-paragraph .word', {
      yPercent: -100,
    })
    gsap.to('.main-paragraph .word', {
      stagger: { amount: 0.2 },
      yPercent: 0,
      duration: .6,
      scrollTrigger: {
        trigger: '.main-paragraph',
        start: 'top bottom',
        toggleActions: 'play none none none',
      }
    })

  }

  function Navbar() {
    // hamburger menu click function with jquery and gsap


    let tl = gsap.timeline({ paused: true });
    gsap.set('.navbar-background', {
      display: 'flex',
      y: '-100%'
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
    tl.to('.navbar-background', {
      y: '0%',
      duration: 1.6,
      ease: easeOut,

    }, 'same')
    tl.to('.navbar-menu_wrapper', {
      height: '60vh',
      duration: 1.2,
      ease: easeOut,
      delay: .8

    }, 'same')
    tl.to('.navbar-links .char', {
      stagger: '0.018',
      yPercent: 0,
      duration: .8,
      delay: 1.2,
      ease: 'power2.out',

    }, 'same')
    tl.to('.socials-navbar .char', {
      yPercent: 0,
      duration: .6,
      delay: 1.4,
      ease: 'power2.out',

    }, 'same')

    tl.to('.navbar-indicator div', {
      yPercent: 0,
      stagger: { amount: 0.2 },
      duration: .9,
      delay: 1.2,
      ease: easeOut,

    }, 'same')


    $('.navbar-hamburger').on('click', function () {
      $('.component_navbar').toggleClass('active');
      if ($('.component_navbar').hasClass('active')) {
        tl.timeScale(1);
        tl.play();
      } else {
        tl.timeScale(1.6);
        tl.reverse();
        //play 2x faster
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

  function WorksEnter() {
    $('.work-bg-placeholder').each(function () {
      //change height to 0% when element is in viewport
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            console.log('enter');
            $(this).css('height', '0%')
          },
        }
      })

      return tl
    })
  }


  let master = gsap.timeline()
  master.add(Hero()).add(PinText()).add(Info()).add(Works()).add(Indicator()).add(Clients()).add(Footer()).add(Links()).add(WorksEnter()).add(Navbar())
}



