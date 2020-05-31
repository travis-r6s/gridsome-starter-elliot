module.exports = {
  siteName: 'Gridsome + Elliot 😍',
  plugins: [
    {
      use: 'gridsome-source-elliot',
      options: {
        keys: process.env.ELLIOT_ENV,
        logs: true
      }
    }
  ]
}
