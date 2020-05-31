module.exports = {
  siteName: 'Gridsome + Elliot 😍',
  plugins: [
    {
      use: 'gridsome-source-elliot',
      options: {
        keys: process.env.ELLIOT_ENV,
        logs: true
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        flexsearch: {
          profile: 'match'
        },
        searchFields: ['name'],
        collections: [
          {
            typeName: 'Product',
            indexName: 'Product',
            fields: ['title', 'id', 'slug', 'description', 'images']
          },
          {
            typeName: 'Collection',
            indexName: 'Collection',
            fields: ['title', 'id', 'slug']
          }
        ]
      }
    }
  ]
}
