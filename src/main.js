// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Plugins
import Notifications from 'vue-notification/dist/ssr'
import store from '@/store'
import Vuex from 'vuex'

// Packages
import Dinero from 'dinero.js'

// Filters
import { formatCurrency } from './filters'

// Styles
import '@storefront-ui/vue/styles.scss'
import '@/styles/storefront.scss'
import '@/styles/base.scss'

export default function ( Vue, { appOptions } ) {
  // Set Dinero defaults
  Dinero.defaultCurrency = 'GBP'
  Dinero.globalLocale = 'en-GB'

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Use Plugins
  Vue.use(Notifications)
  Vue.use(Vuex)

  // Use Filters
  Vue.filter('currency', formatCurrency)

  // Global Events (for sidebar & notifications)
  const bus = new Vue()
  Vue.prototype.$bus = bus

  // Add Vuex store
  appOptions.store = store
}
