<template>
  <Layout>
    <notifications group="product" />
    <g-image :src="$page.product.image" />
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
          :link="`/product/${rProduct.slug}`"
          link-tag="g-link"
          :regular-price="rProduct.basePrice | currency"
          :special-price="rProduct.salePrice | currency"
          :is-on-wishlist="isItemLiked(rProduct.id)"
          @click:wishlist="updateLiked(rProduct)">
          <template #image="{ image, title, link, imageHeight, imageWidth }">
            <g-image
              :src="image"
              :width="imageWidth"
              :height="imageHeight"
              :alt="title"
              :title="title" />
          </template>
        </SfProductCard>
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
    if (!this.product.productSeo) return { title: this.product.name }
    const { title, description } = this.product.seo
    return {
      title,
      meta: [{ name: 'description', content: description }]
    }
  },
  components: { SfGallery, SfHeading, SfPrice, SfSelect, SfAddToCart, SfProductCard, SfBreadcrumbs, SfDivider },
  data: () => ({ selectedOptions: {}, quantity: 1 }),
  computed: {
    product () { return this.$page.product },
    images () { return this.product.images.map(node => ({ desktop: { url: node.image.src }, mobile: { url: node.mobile.src } })) },
    breadcrumbs () {
      const home = { text: 'Home', link: '/' }
      const collections = this.product.collections.map(({ name, slug }) => ({ text: name, link: `/collection/${slug}` }))
      const product = { text: this.product.name, link: '#' }
      return [home, ...collections, product]
    },
    relatedProducts () {
      console.log(this.product.related)
      return this.product.related.slice(0, 4).map(product => {
        const [{ basePrice, salePrice }] = product.skus
        return {
          ...product,
          basePrice,
          salePrice: (basePrice > salePrice) && salePrice,
          image: product.images[ 0 ].image
        }
      })
    },
    variants () {
      return this.product.variants.map(variant => ({ ...variant, salePrice: (variant.basePrice > variant.salePrice) && variant.salePrice }))
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
    isItemLiked (id) { return this.$store.getters.isItemLiked(id) },
    setFirstOptions () {
      const [firstVariant] = this.variants
      this.selectedOptions = firstVariant.attributes
    },
    addToCart () {
      const variant = this.currentVariant
      const quantity = this.quantity

      this.$store.dispatch('addToCart', { ...variant, quantity, name: this.product.name, image: this.images[ 0 ] })
      this.$notify({
        group: 'product',
        type: 'success',
        title: 'Added product to cart',
        text: `Just added ${quantity} x ${this.product.name} to cart`
      })
    },
    updateLiked (product) {
      this.$store.dispatch('updateLiked', product)
    }
  }
}
</script>

<page-query>
query Product ($id: ID!) {
  product (id: $id) {
    id
    name
    slug
    description
    attributes
    metadata {
      productCategoryTag1
      productCategoryTag2
      productCategoryTag3
    }
    images {
      image(width: 400, height: 400)
      mobile: image(width: 160, height: 160)
    }
    variants: skus {
      id
      sku
      salePrice
      basePrice
      attributes
    }
    collections {
      id
      name
      slug
    }
    related {
      id
      name
      slug
      images {
        image(width: 210, height: 300)
      }
      skus {
        id
        basePrice
        salePrice
      }
    }
    seo {
      title
      description
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
