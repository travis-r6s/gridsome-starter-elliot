<template>
  <Layout>
    <div class="grid">
      <SfGallery :images="images" />
    </div>
  </Layout>
</template>

<script>
// Components
import { SfGallery } from '@storefront-ui/vue'
export default {
  name: 'Product',
  components: { SfGallery },
  computed: {
    product () { return this.$page.elliot.product },
    images () {
      console.log(this.product.images)
      return this.product.images.edges.map(({ node }) => {
        console.log(node)
        const image = `https://storage.googleapis.com/elliot-images-us/${node.url}`
        return { desktop: { url: image }, mobile: { url: image } }
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
        images(orderBy: "orderingPosition") {
          edges {
            node {
              id
              url
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
