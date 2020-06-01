<template>
  <Layout>
    <notifications group="collection" />
    <SfSection
      :title-heading="collection.name"
      :level-heading="1" />
    <div class="container">
      <div class="grid">
        <SfProductCard
          v-for="product in products"
          :key="product.id"
          :image="product.image"
          :image-width="250"
          :image-height="300"
          :title="product.name"
          :link="product.slug"
          :regular-price="product.basePrice | currency"
          :special-price="product.salePrice | currency"
          :is-on-wishlist="isItemLiked(product.id)"
          :is-added-to-cart="isItemInCart(product.id)"
          class="c-sf-product-card"
          link-tag="g-link"
          show-add-to-cart-button
          @click:add-to-cart="addProductToCart(product)"
          @click:wishlist="updateLiked(product)">
          <template #image="{ image, title, link }">
            <g-link :to="link">
              <g-image
                :src="image"
                :alt="title"
                :title="title"
                style="width: 100%;" />
            </g-link>
          </template>
        </SfProductCard>
      </div>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfSection, SfProductCard } from '@storefront-ui/vue'

export default {
  name: 'Collection',
  metaInfo () {
    return { title: this.collection.name }
  },
  components: { SfSection, SfProductCard },
  computed: {
    collection () { return this.$page.collection },
    products () {
      return this.collection.products.map(product => {
        const [{ basePrice, salePrice }] = product.skus
        return {
          ...product,
          slug: `/product/${product.slug}`,
          basePrice,
          salePrice: (basePrice > salePrice) && salePrice,
          image: product.images[ 0 ].image
        }
      })
    }
  },
  methods: {
    isItemInCart (id) { return this.$store.getters.isItemInCart(id) },
    isItemLiked (id) { return this.$store.getters.isItemLiked(id) },
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

<page-query>
query Collection ($id: ID!) {
  collection (id: $id) {
    id
    name
    products {
      id
      name
      slug
      description
      images {
        image(width: 250, height: 300)
      }
      skus {
        salePrice
        basePrice
      }
    }
  }
}
</page-query>

<style lang="scss">
.c-sf-product-card {
  --product-card-max-width: 100%;
}
</style>
