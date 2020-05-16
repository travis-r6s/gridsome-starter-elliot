<template>
  <Layout>
    <notifications group="product" />
    <div class="container">
      <div class="grid product">
        <SfGallery
          :images="images"
          :image-width="400"
          :image-height="400" />
        <div>
          <SfBreadcrumbs :breadcrumbs="breadcrumbs" />
          <br>
          <SfHeading
            class="sf-heading--left sf-heading__title--h2"
            :title="product.name"
            :subtitle="currentVariant.sku"
            :level="1" />
          <br>
          <SfPrice
            :regular="currentVariant.basePrice | currency"
            :special="currentVariant.salePrice | currency" />
          <br>
          <div
            class="content"
            v-html="product.description" />
          <br>
          <SfSelect
            v-for="({ attributeKey, attributeValues }, i) in product.attributes"
            :key="i"
            v-model="selectedOptions[attributeKey]"
            :label="attributeKey"
            required>
            <SfSelectOption
              v-for="(option, key) in attributeValues"
              :key="key"
              :value="option">
              {{ option }}
            </SfSelectOption>
          </SfSelect>
          <br>
          <SfAddToCart
            v-model="quantity"
            @click="addToCart" />
        </div>
      </div>
      <SfDivider />
      <div class="grid related-products">
        <SfProductCard
          v-for="rProduct in relatedProducts"
          :key="rProduct.id"
          :image="rProduct.image"
          :image-width="200"
          :image-height="200"
          :title="rProduct.name"
          :link="`/product/${product.slug}`"
          link-tag="g-link"
          :regular-price="rProduct.basePrice | currency"
          :special-price="rProduct.salePrice | currency"
          :is-on-wishlist="false"
          @click:wishlist="alert('@click:wishlist')" />
      </div>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfGallery, SfHeading, SfPrice, SfSelect, SfAddToCart, SfProductCard, SfBreadcrumbs, SfDivider } from '@storefront-ui/vue'
export default {
  name: 'Product',
  metaInfo () {
    const [{ node } = {}] = this.product.productSeo.edges
    if (!node) return { title: this.product.name }
    return {
      title: node.title,
      meta: [{ name: 'description', content: node.description }]
    }
  },
  components: { SfGallery, SfHeading, SfPrice, SfSelect, SfAddToCart, SfProductCard, SfBreadcrumbs, SfDivider },
  data: () => ({ selectedOptions: {}, quantity: 1 }),
  computed: {
    product () { return this.$page.elliot.product },
    images () {
      return this.product.images.edges.map(({ node }) => {
        const { mobile, desktop } = node
        return { desktop: { url: desktop }, mobile: { url: mobile } }
      })
    },
    breadcrumbs () {
      const home = { text: 'Home', link: '/' }
      const collections = this.product.collections.edges.map(({ node }) => ({ text: node.name, link: `/collection/${node.slug}` }))
      const product = { text: this.product.name, link: '#' }
      return [home, ...collections, product]
    },
    relatedProducts () {
      return this.product.relatedProducts.edges.slice(0, 4).map(({ node }) => {
        const [{ node: image }] = node.images.edges
        const [{ node: { basePrice, salePrice } }] = node.skus.edges
        return {
          ...node,
          basePrice,
          salePrice: (basePrice > salePrice) && salePrice,
          image: {
            mobile: { url: image.mobile },
            desktop: { url: image.desktop }
          }
        }
      })
    },
    variants () {
      return this.product.variants.edges.map(({ node }) => ({ ...node, salePrice: (node.basePrice > node.salePrice) && node.salePrice }))
    },
    currentVariant () {
      const matchedVariant = this.variants.find(variant =>
        Object.entries(variant.attributes).every(
          ([name, value]) => value === this.selectedOptions[ name ]
        )
      )
      return matchedVariant
    }
  },
  created () {
    this.setFirstOptions()
  },
  methods: {
    setFirstOptions () {
      const [firstVariant] = this.variants
      this.selectedOptions = firstVariant.attributes
    },
    addToCart () {
      const variant = this.currentVariant
      const quantity = this.quantity

      this.$store.dispatch('addToCart', { ...variant, quantity })
      this.$notify({
        group: 'product',
        type: 'success',
        title: 'Added product to cart',
        text: `Just added ${quantity} x ${this.product.name} to cart`
      })
    }
  }
}
</script>

<page-query>
query Product ($id: ID!) {
  elliot {
    product: node (id: $id) {
      ... on Elliot_ProductNode {
        id
        name
        slug
        description
        attributes
        collections {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
        metadata {
          edges {
            node {
              productCategoryTag1
              productCategoryTag2
              productCategoryTag3
            }
          }
        }
        images(orderBy: "orderingPosition", first: 3) {
          edges {
            node {
              id
              mobile: url(height: 200, width: 200)
              desktop: url(height: 400, width: 400)
            }
          }
        }
        variants: skus {
          edges {
            node {
              id
              sku
              salePrice
              basePrice
              attributes
            }
          }
        }
        collections {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
        relatedProducts {
          edges {
            node {
              id
              name
              slug
              images (first: 1) {
                edges {
                  node {
                    id
                    mobile: url(height: 100, width: 100)
                    desktop: url(height: 200, width: 200)
                  }
                }
              }
              skus (first: 1) {
                edges {
                  node {
                    id
                    basePrice
                    salePrice
                  }
                }
              }
            }
          }
        }
        productSeo {
          edges {
            node {
              title
              description
            }
          }
        }
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.product {
  margin: 4rem 0;
}
.related-products {
  margin-top: 4rem;
}
</style>
