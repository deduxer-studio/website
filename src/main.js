import './styles/style.css'
// import all code from components smooth
// import { initPageTransition } from './components/barba'
import { initDeduction } from './components/deduction'
import { initSmoothScroll } from './components/smooth'
import { initHome } from './pages/index'

initHome()
initSmoothScroll()
window.addEventListener('load', initDeduction, false)
