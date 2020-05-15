// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Styles
import '@storefront-ui/vue/styles.scss'
import '@/styles/storefront.scss'
import '@/styles/base.scss'

export default function (Vue) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
