<template>
  <Layout>
    {{ $page.elliot.product }}
  </Layout>
</template>

<script>
export default {
  name: 'Product'
}
</script>

<page-query>
query Product ($id: ID!) {
  elliot {
    product: node (id: $id) {
      ... on Elliot_ProductNode {
        id
        name
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
              image
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
