/* eslint no-console: 0 */
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()

// Nuxt.js をインスタンス化
const config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
config.port = config.dev ? 3000 : process.env.PORT
const nuxt = new Nuxt(config)

// プロダクション環境ではビルドしない
const promise = config.dev ? new Builder(nuxt).build() : Promise.resolve()
promise
  .then(() => {
    app.use(nuxt.render)
    // devだったら3000 productionならprocess.env.PORT
    console.log('process.env.PORT' + config.port)
    app.listen(config.port)
    console.log('Server is listening on http://localhost:3000')
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
