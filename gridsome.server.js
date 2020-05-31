module.exports = function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const { data } = await graphql(`{
      allProduct {
        edges {
          node {
            id
            slug
          }
        }
      }
      allCollection {
        edges {
          node {
            id
            slug
          }
        }
      }
    }`)

    for (const { node: product } of data.allProduct.edges) {
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: product
      })
    }

    for (const { node: collection } of data.allCollection.edges) {
      createPage({
        path: `/collection/${collection.slug}`,
        component: './src/templates/Collection.vue',
        context: collection
      })
    }
  })
}
