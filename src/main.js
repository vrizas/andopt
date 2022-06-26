import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import firebaseConfig from './firebaseConfig.json'
import AppMobile from './AppMobile.vue'
import AppDesktop from './AppDesktop.vue'
import routerMobile from './router/mobile'
import routerDesktop from './router/desktop'
import './assets/base.css'
import { registerSW } from 'virtual:pwa-register'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

library.add(fas, far)

const isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))

if (isMobile) {
  createApp(AppMobile)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(routerMobile)
    .mount('#app')
} else {
  createApp(AppDesktop)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(routerDesktop)
    .mount('#app')
}

const intervalMS = 60 * 60 * 1000

const updateSW = registerSW({
  onRegistered (r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  }
})
