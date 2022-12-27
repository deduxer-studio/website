/* eslint-disable */
import './styles/style.css'
// import all code from components smooth
import { initPageTransition } from './components/barba'
import { initSmoothScroll } from './components/smooth'

initPageTransition()

//############################################ CONTACT ############################################
if (window.location.pathname === '/contact') {
  console.log('contact');
  import('./pages/contact').then((contact) => {
    contact.initContact()
  })
}

//############################################ HOME ############################################
if (window.location.pathname === '/') {

  import('./components/deduction').then((deduction) => {
    deduction.initDeduction()
  })

  import('./components/mesh').then((mesh) => {
    mesh.initMesh()
  })
  if (window.innerWidth < 768) {
    //########## MOBILE ##########
    import('./pages/indexMobile').then((home) => {
      home.initMobile()
    })

  }
  else {
    //########## PC ##########
    initSmoothScroll()
    import('./pages/index').then((home) => {
      home.initHome()
    })

  }
}




