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
          :image-width="300"
          :image-height="400"
          :title="product.name"
          :link="product.slug"
          link-tag="g-link"
          :regular-price="product.basePrice | currency"
          :special-price="product.salePrice | currency"
          :is-on-wishlist="isItemLiked(product.id)"
          show-add-to-cart-button
          :is-added-to-cart="isItemInCart(product.id)"
          @click:add-to-cart="addProductToCart(product)"
          @click:wishlist="updateLiked(product)" />
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
    collection () { return this.$page.elliot.collection },
    products () {
      return this.collection.products.edges.map(({ node }) => {
        const [{ node: image }] = node.images.edges
        const [{ node: { basePrice, salePrice } }] = node.skus.edges
        return {
          ...node,
          slug: `/product/${node.slug}`,
          basePrice,
          salePrice: (basePrice > salePrice) && salePrice,
          image: {
            mobile: { url: image.mobile },
            desktop: { url: image.desktop }
          }
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
  elliot {
    collection: node(id: $id) {
      ... on Elliot_CollectionNode {
        id
        name
        products {
          edges {
            node {
              id
              name
              slug
              description
              images(orderBy: "orderingPosition", first: 1) {
                edges {
                  node {
                    mobile: url(height: 200, width: 100)
                    desktop: url(height: 400, width: 300)
                  }
                }
              }
              skus (first: 1) {
                edges {
                  node {
                    salePrice
                    basePrice
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</page-query>
