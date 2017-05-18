import VueRouter from 'vue-router'

import AddDico from './components/AddDico.vue'
import Quizzcard from './components/Quizzcard.vue'
import AllDico from './components/AllDico.vue'

const routes = [
  {
    path: '/',
    name: 'add-dico',
    component: AddDico
  },
  {
    path: '/quizzcard', 
    name: 'quizzcard',
    component: Quizzcard
  },
  {
    path: '/all-dico', 
    name: 'all-dico',
    component: AllDico
  }
]

export default new VueRouter({routes})