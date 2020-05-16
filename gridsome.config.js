module.exports = {
  siteName: 'Gridsome + Elliot 😍',
  plugins: [
    {
      use: 'gridsome-plugin-image-cdn',
      options: {
        site: {
          baseUrl: ''
        },
        cdn: {
          baseUrl: 'https://ik.imagekit.io/travis/elliot',
          preset: 'imageKit',
          imagePrefix: '/'
        },
        types: [
          {
            typeName: 'Elliot_ProductImageNode',
            sourceField: 'url'
          }
        ]
      }
    }
  ]
}
