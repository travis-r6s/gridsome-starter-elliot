// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Plugins
import Notifications from 'vue-notification/dist/ssr'
import Vuex from 'vuex'

// Packages
import Dinero from 'dinero.js'

// Filters
import { formatCurrency } from './filters'

// Styles
import '@storefront-ui/vue/styles.scss'
import '@/styles/storefront.scss'
import '@/styles/base.scss'

export default function (Vue, { appOptions }) {
  Dinero.defaultCurrency = 'GBP'
  Dinero.globalLocale = 'en-GB'

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Use Plugins
  Vue.use(Notifications)
  Vue.use(Vuex)

  // Use Filters
  Vue.filter('currency', formatCurrency)

  // Create Vuex store
  appOptions.store = new Vuex.Store({
    state: {
      cart: []
    },
    mutations: {
      updateCart: (state, cart) => { state.cart = cart }
    },
    actions: {
      addToCart: ({ state, commit }, newItem) => {
        const cart = state.cart
        const itemExists = cart.find(item => item.id === newItem.id)

        if (itemExists) itemExists.quantity += newItem.quantity
        else cart.push(newItem)

        const updatedCart = cart.map(item => {
          const total = Dinero({ amount: item.salePrice || item.basePrice }).multiply(item.quantity).getAmount()
          return { ...item, total }
        })

        commit('updateCart', updatedCart)
      },
      updateItemQty: ({ state, commit }, { id, quantity }) => {
        const cart = state.cart
        const item = cart.find(item => item.id === id)

        item.quantity = quantity
        item.total = Dinero({ amount: item.salePrice || item.basePrice }).multiply(item.quantity).getAmount()

        commit('updateCart', cart)
      },
      removeFromCart: ({ state, commit }, id) => {
        const cart = state.cart
        const updatedCart = cart.filter(item => item.id !== id)

        commit('updateCart', updatedCart)
      }
    },
    getters: {
      cartTotal: ({ cart }) => cart.reduce((total, item) => total.add(Dinero({ amount: item.total })), Dinero({ amount: 0 })).toFormat(),
      cartTotalItems: ({ cart }) => cart.length,
      isItemInCart: ({ cart }) => id => !!cart.find(item => item.id === id)
    }
  })
}
