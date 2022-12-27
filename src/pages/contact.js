/* eslint-disable */
import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'

export function initContact() {

  let easeOut = 'power3.inOut'

  new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap',
    {
      types: 'words, chars, lines',
      tagName: 'span',
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
      height: '70vh',
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
  if (window.innerWidth < 768) {
    Navbar();
    Links()
  }
  else {
    function NavbarDesktop() {
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
    NavbarDesktop();
    Links()
  }

}