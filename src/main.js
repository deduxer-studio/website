/* eslint-disable */
import './styles/style.css'
// import all code from components smooth
import { initPageTransition } from './components/barba'
import { initDeduction } from './components/deduction'
import { initMesh } from './components/mesh'
import { initSmoothScroll } from './components/smooth'
import { initHome } from './pages/index'
import { initMobile } from './pages/indexMobile'

initPageTransition()

window.addEventListener('load', initDeduction, false)
//check mobile
initMesh()
initSmoothScroll()
if (window.innerWidth < 768) {
  initMobile()
}
else {
  initHome()

}


