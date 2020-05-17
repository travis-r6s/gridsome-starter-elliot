<template>
  <Layout>
    <SfSection
      title-heading="Liked Items"
      :level-heading="1">
      <div class="container">
        <div class="grid">
          <SfProductCard
            v-for="product in likedProducts"
            :key="product.id"
            :image="product.image"
            :image-width="300"
            :image-height="400"
            :title="product.name"
            :link="product.slug"
            link-tag="g-link"
            :regular-price="product.basePrice | currency"
            :special-price="product.salePrice | currency"
            is-on-wishlist
            show-add-to-cart-button
            :is-added-to-cart="isItemInCart(product.id)"
            @click:is-added-to-cart="addProductToCart(product)"
            @click:wishlist="updateLiked(product)" />
        </div>
      </div>
    </SfSection>
  </Layout>
</template>

<script>
// Components
import { SfSection, SfProductCard } from '@storefront-ui/vue'

export default {
  name: 'Liked',
  components: { SfSection, SfProductCard },
  computed: {
    likedProducts () { return this.$store.getters.likedItems }
  },
  methods: {
    isItemInCart (id) { return this.$store.getters.isItemInCart(id) },
    addProductToCart (product) {
      this.$store.dispatch('addToCart', { ...product, quantity: 1 })
      this.$notify({
        group: 'collection',
        type: 'success',
        title: 'Added product to cart',
        text: `Just added 1 x ${product.name} to cart`
      })
    },
    updateLiked (product) {
      this.$store.dispatch('updateLiked', product)
    }
  }
}
</script>
