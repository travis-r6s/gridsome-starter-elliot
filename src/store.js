// Packages
import Vuex from 'vuex'
import Dinero from 'dinero.js'

export default () => {
  // Set Dinero defaults
  Dinero.defaultCurrency = 'GBP'
  Dinero.globalLocale = 'en-GB'

  return new Vuex.Store({
    state: {
      cart: [],
      liked: []
    },
    mutations: {
      updateCart: (state, cart) => { state.cart = cart },
      updateLiked: (state, items) => { state.liked = items }
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
      updateItemQuantity: ({ state, commit }, { id, quantity }) => {
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
      },
      updateLiked: ({ state, commit }, newItem) => {
        const liked = state.liked
        const itemExists = liked.find(item => item.id === newItem.id)

        if (itemExists) {
          const updatedLiked = liked.filter(item => item.id !== newItem.id)
          commit('updateLiked', updatedLiked)
        } else {
          const updatedLiked = [...liked, newItem]
          commit('updateLiked', updatedLiked)
        }
      }
    },
    getters: {
      cartTotal: ({ cart }) => cart.reduce((total, item) => total.add(Dinero({ amount: item.total })), Dinero({ amount: 0 })).toFormat(),
      cartTotalItems: ({ cart }) => cart.length,
      isItemInCart: ({ cart }) => id => !!cart.find(item => item.id === id),
      likedItems: ({ liked }) => liked,
      isItemLiked: ({ liked }) => id => !!liked.find(item => item.id === id)
    }
  })
}
