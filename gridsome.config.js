const [ELLIOT_DOMAIN_ID, ELLIOT_STORE_FRONT_ID, ELLIOT_STORE_FRONT_NAME, ELLIOT_API_KEY] = process.env.ELLIOT_ENV.split('|')

module.exports = {
  siteName: 'Gridsome + Elliot 😍',
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: 'https://admin.elliot.store/api',
        fieldName: 'elliot',
        typeName: 'Elliot',
        headers: {
          'Content-Type': 'application/json',
          KEY: `KEY ${ELLIOT_API_KEY}`
        }
      }
    }
  ]
}
