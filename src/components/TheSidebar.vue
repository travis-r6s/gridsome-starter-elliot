<template>
  <SfSidebar
    :visible="isSidebarOpen"
    :heading-level="3"
    title="Your Cart"
    button
    overlay
    class="sf-sidebar--right the-sidebar"
    @close="isSidebarOpen = false">
    <div
      v-if="!cartTotalItems"
      class="empty">
      <p>You have any empty cart...</p>
    </div>
    <div
      v-else
      class="product-list">
      <SfCollectedProduct
        v-for="item in cartItems"
        :key="item.id"
        :qty="item.quantity"
        :image="formatImage(product.image)"
        :image-width="100"
        :image-height="100"
        :title="item.name"
        :regular-price="item.total">
        <template #configuration>
          <div :style="{ margin: '1rem 0 0 0' }">
            <SfProperty
              name="Size"
              value="XS" />
            <SfProperty
              name="Color"
              value="white" />
          </div>
        </template>
        <template #remove>
          <SfCircleIcon
            icon="cross"
            aria-label="Remove"
            class="sf-circle-icon--small sf-collected-product__remove sf-collected-product__remove--circle-icon"
            @click="removeFromCart(product.id)" />
          <SfButton
            class="sf-button--text sf-collected-product__remove sf-collected-product__remove--text"
            @click="removeFromCart(product.id)">
            Remove
          </SfButton>
        </template>
      </SfCollectedProduct>
    </div>
    <template #content-bottom>
      <SfProperty
        class="sf-property--full-width"
        name="Cart Total"
        :value="cartTotal" />
      <br>
      <SfButton class="sf-button--full-width">
        Checkout
      </SfButton>
    </template>
  </SfSidebar>
</template>

<script>
// Components
import { SfButton, SfCircleIcon, SfCollectedProduct, SfProperty, SfSidebar } from '@storefront-ui/vue'

export default {
  name: 'TheSidebar',
  components: { SfButton, SfCircleIcon, SfCollectedProduct, SfProperty, SfSidebar },
  data: () => ({
    isSidebarOpen: true
  }),
  computed: {
    cartTotalItems () { return this.$store.getters.cartTotalItems },
    cartTotal () { return this.$store.getters.cartTotal },
    cartItems () { return this.$store.state.cart }
  },
  mounted () {
    this.$bus.$on('sidebar:change', state => {
      this.isSidebarOpen = state === 'open'
    })
  },
  methods: {
    updateItemQuantity (quantity) {
      this.$store.dispatch('updateItemQuantity', quantity)
    },
    removeFromCart (id) {
      this.$store.dispatch('removeFromCart', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.the-sidebar {
  --sidebar-z-index: 11;
}
</style>
