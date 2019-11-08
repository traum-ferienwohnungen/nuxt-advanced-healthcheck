const { Nuxt, Builder } = require('nuxt-edge')
const defaultConfig = require('./fixtures/nuxt.config')

jest.setTimeout(60000)

async function setupNuxt (config) {
  // Mute console.info
  console.info = () => {}
  const nuxt = new Nuxt({
    ...defaultConfig,
    ...config,
    _ready: false
  })

  await nuxt.ready()

  const builder = new Builder(nuxt)
  nuxt.builder = builder

  return nuxt
}

module.exports = {
  setupNuxt
}
