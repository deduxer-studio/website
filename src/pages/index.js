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
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        onEnter: () => timeline.play()
      });
    }

    $(".main-paragraph").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".word"), { yPercent: 101, duration: 0.65, ease: easeOut, stagger: '0.007' });
      createScrollTrigger($(this), tl);
    });






    const container = document.querySelector(".horizontal-wrapper");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        start: "top top",
        end: "650%"
      }
    });
    timeline.to('.process-content', {
      opacity: 0,
      scale: 0.85,
      transformOrigin: 'left center',
      duration: 0.5,
      ease: easeOut,
    }, 0)

    $('.process-card').each(function (index) {
      timeline.to($(this), {
        x: '0%',
        ease: 'none',
      }, index * 0.5)
      timeline.to($(this).prev(), {
        x: '-90vw',
        ease: 'none',
      }, index * 0.5)

    })
    $('.card-lottie').each(function (index) {
      timeline.to($(this), {
        x: '70vw',
        delay: 0.2,
        ease: easeOut,
      }, index * 0.5)
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
  master.add(Hero()).add(PinText()).add(Info()).add(Indicator()).add(Clients()).add(Footer()).add(Links()).add(WorksEnter()).add(Navbar())
}



