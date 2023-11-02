// import components
import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from './pages/DashboardPage.vue'
import ContactMePage from './pages/ContactMePage.vue'
import { faChartLine, faMessage } from '@fortawesome/free-solid-svg-icons';

export const routes = [
  { id: 'dashboard', label: 'Dashboard', icon: faChartLine, path: '/', component: DashboardPage },
  { id: 'contact-me', label: 'Contact me', icon: faMessage,  path: '/contact-me', component: ContactMePage }
]

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes
})
