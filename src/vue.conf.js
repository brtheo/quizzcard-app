import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VueUniqIds from 'vue-uniq-ids'

import filters from './filters'

import 'polyfill-nodelist-foreach'
import 'classlist-polyfill'
import 'w3c-blob'
import "vue-material/dist/vue-material.css"
import "./transitions/vue2-animate.less"

Vue.use(VueRouter)
Vue.use(VueMaterial.MdCore) 
Vue.use(VueMaterial.MdButton)
Vue.use(VueMaterial.MdCard)
Vue.use(VueMaterial.MdInputContainer)
Vue.use(VueMaterial.MdIcon)
Vue.use(VueMaterial.MdBackdrop)
Vue.use(VueMaterial.MdToolbar)
Vue.use(VueMaterial.MdDialog)
Vue.use(VueMaterial.MdTooltip)
Vue.use(VueMaterial.MdTable)
Vue.use(VueMaterial.MdLayout)
Vue.use(VueMaterial.MdProgress)
Vue.use(VueMaterial.MdSwitch)
Vue.use(VueMaterial.MdBottomBar)
Vue.use(VueUniqIds,{attrs:['data-uuid'], template: '%qinu%-%arg[0]%'})

Vue.mixin({ filters })

Vue.material.registerTheme(
  {
    'default':{
      primary: {color: 'grey', hue: 800},
      accent: {color: 'red', hue: 'A200'},
      warn: {color: 'orange', hue: 700}
    },
    'tealy': {
      primary: {color: 'teal', hue: 500},
      accent: {color: 'orange', hue: 700},
      warn: {color: 'grey', hue: 800}
    },
    'limy': {
      primary: {color: 'lime', hue: 500},
      accent: {color: 'orange', hue: 700},
      warn: {color: 'grey', hue: 800}
    },
})

