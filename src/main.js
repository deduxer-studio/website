import './styles/style.css'
// import all code from components smooth
import { initPageTransition } from './components/barba'
import { initDeduction } from './components/deduction'
import { initMesh } from './components/mesh'
import { initSmoothScroll } from './components/smooth'
import { initHome } from './pages/index'

initSmoothScroll()
initPageTransition()

window.addEventListener('load', initDeduction, false)
initHome()
initMesh()
