// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Plugins
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
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Use Plugins
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
          const total = Dinero({ amount: item.salePrice }).multiply(item.quantity)
          return { ...item, total }
        })

        commit('updateCart', updatedCart)
      },
      updateItemQty: ({ state, commit }, { id, quantity }) => {
        const cart = state.cart
        const item = cart.find(item => item.id === id)

        item.quantity = quantity
        item.total = Dinero({ amount: item.salePrice }).multiply(item.quantity)

        commit('updateCart', cart)
      },
      removeFromCart: ({ state, commit }, id) => {
        const cart = state.cart
        const updatedCart = cart.filter(item => item.variantId !== id)

        commit('updateCart', updatedCart)
      }
    },
    getters: {
      cartTotal: ({ cart }) => cart.reduce((total, item) => total.add(Dinero({ amount: item.salePrice }).multiply(item.quantity)), Dinero()),
      cartTotalItems: ({ cart }) => cart.length
    }
  })
}
