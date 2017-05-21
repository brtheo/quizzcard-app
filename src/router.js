import VueRouter from 'vue-router'

import AddDico from './components/AddDico.vue'
import Quizzcard from './components/Quizzcard.vue'
import AllDico from './components/AllDico.vue'

const routes = [
  {
    path: '/',
    name: 'all-dico',
    component: AllDico
  },
  {
    path: '/quizzcard', 
    name: 'quizzcard',
    component: Quizzcard
  },
  {
    path: '/add-dico', 
    name: 'add-dico',
    component: AddDico
  }
]

export default new VueRouter({routes})