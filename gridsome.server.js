const [ELLIOT_DOMAIN_ID, ELLIOT_STORE_FRONT_ID, _, ELLIOT_API_KEY] = process.env.ELLIOT_ENV.split('|')
const { setContext } = require('apollo-link-context')
const { HttpLink } = require('apollo-link-http')
const fetch = require('node-fetch')
const fs = require('fs')
const {
  makeRemoteExecutableSchema,
  transformSchema,
  RenameTypes
} = require('graphql-tools')

const {
  NamespaceUnderFieldTransform,
  StripNonQueryTransform
} = require('@gridsome/source-graphql/transforms')

module.exports = function (api) {
  api.createSchema(async ({ addSchema }) => {
    const typeName = 'Elliot'
    const fieldName = 'elliot'
    const ELLIOT_GRAPHQL_ENDPOINT = 'https://admin.elliot.store/api'
    const headers = { 'Content-Type': 'application/json', KEY: `KEY ${ELLIOT_API_KEY}` }

    const http = new HttpLink({ uri: ELLIOT_GRAPHQL_ENDPOINT, fetch })
    const link = setContext(() => ({ headers })).concat(http)

    const remoteSchema = makeRemoteExecutableSchema({
      schema: fs.readFileSync('./schema.graphql', 'utf8'),
      link
    })
    const namespacedSchema = await transformSchema(remoteSchema, [
      new StripNonQueryTransform(),
      new RenameTypes(name => `${typeName}_${name}`),
      new NamespaceUnderFieldTransform(typeName, fieldName)
    ])

    addSchema(namespacedSchema)
  })

  api.createPages(async ({ createPage, graphql }) => {
    const variables = { id: ELLIOT_DOMAIN_ID }
    const { data } = await graphql(`query domain ($id: ID!) {
      elliot {
        node(id: $id) {
          ... on Elliot_DomainNode {
            products {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        }
      }
    }`, variables)

    for (const { node: product } of data.elliot.node.products.edges) {
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: { id: product.id, slug: product.slug }
      })
    }
  })
}
