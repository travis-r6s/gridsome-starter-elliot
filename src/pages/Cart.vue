<template>
  <Layout>
    <SfSection
      title-heading="Your Cart"
      :level-heading="1" />
    <div class="container">
      <SfTable>
        <SfTableHeading>
          <SfTableHeader
            v-for="(header, i) in tableHeaders"
            :key="i">
            {{ header }}
          </SfTableHeader>
        </SfTableHeading>
        <SfTableRow
          v-for="(item, key) in cartItems"
          :key="key">
          <SfTableData>
            <SfImage
              :src="item.image"
              :alt="item.name"
              :width="80"
              :height="80"
              lazy />
          </SfTableData>
          <SfTableData>
            {{ item.name }}
          </SfTableData>
          <SfTableData>
            <SfQuantitySelector
              :qty="item.quantity"
              aria-label="Quantity"
              @input="updateItemQuantity({ id: item.id, quantity: $event })" />
          </SfTableData>
          <SfTableData>
            {{ item.salePrice || item.basePrice | currency }}
          </SfTableData>
          <SfTableData>
            {{ item.total | currency }}
          </SfTableData>
          <SfTableData>
            <SfButton
              class="sf-button--text"
              @click="removeFromCart(item.id)"
              @keyup="removeFromCart(item.id)">
              Remove Item
            </SfButton>
          </SfTableData>
        </SfTableRow>
      </SfTable>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfSection, SfTable, SfButton, SfImage, SfQuantitySelector } from '@storefront-ui/vue'

export default {
  name: 'Cart',
  metaInfo () {
    const totalItems = this.cartTotalItems
    if (!totalItems) return { title: `Your cart is... empty? 😥` }
    return { title: `${totalItems} items - ${this.cartTotal}` }
  },
  components: { SfSection, SfTable, SfButton, SfImage, SfQuantitySelector },
  data: () => ({
    tableHeaders: [
      '',
      'Product',
      'Quantity',
      'Amount',
      'Total',
      ''
    ]
  }),
  computed: {
    cartTotalItems () { return this.$store.getters.cartTotalItems },
    cartTotal () { return this.$store.getters.cartTotal },
    cartItems () {
      // const items = this.$store.state.cart
      return this.$store.state.cart
    }
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
