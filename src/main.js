import { createApp } from 'vue'
import AppMobile from './AppMobile.vue'
import AppDesktop from './AppDesktop.vue'
import routerMobile from './router/mobile'
import routerDesktop from './router/desktop'
import './assets/base.css'


const isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

if (isMobile) {
    createApp(AppMobile).use(routerMobile).mount('#app')
} else {
    createApp(AppDesktop).use(routerDesktop).mount('#app')
}
