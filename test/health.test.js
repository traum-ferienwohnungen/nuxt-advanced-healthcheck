/* global describe, afterEach, test, expect */
const fetch = require('node-fetch')
const { setupNuxt } = require('./nuxtBuilder')

const url = path => `http://localhost:3000${path}`

describe('Advanced Healthcheck', () => {
  let nuxt

  afterEach(async () => {
    await nuxt.close()
  })

  test('Test no config', async () => {
    nuxt = await setupNuxt()
    await nuxt.builder.build()
    await nuxt.listen(3000)

    const response = await fetch(url('/healthcheck'))

    expect(response.status).toEqual(200)
  })

  test('Test single route path', async () => {
    const singleRouteConfig = require('./fixtures/singleRoute.config')
    nuxt = await setupNuxt(singleRouteConfig)
    await nuxt.builder.build()
    await nuxt.listen(3000)

    const response = await fetch(url('/alive'))

    expect(response.status).toEqual(200)
  })

  test('Test single route handler', async () => {
    const singleRouteConfig = require('./fixtures/singleRoute.config')
    nuxt = await setupNuxt(singleRouteConfig)
    await nuxt.builder.build()
    await nuxt.listen(3000)

    const response = await fetch(url('/alive')).then(res => res.text())
    expect(response).toEqual('"Hello World"')
  })

  test('Test multi route status', async () => {
    const multiRouteConfig = require('./fixtures/multiRoute.config')
    nuxt = await setupNuxt(multiRouteConfig)
    await nuxt.builder.build()
    await nuxt.listen(3000)

    const responseRouteOne = await fetch(url('/alive'))
    expect(responseRouteOne.status).toEqual(200)

    const responseRouteTwo = await fetch(url('/hello-world'))
    expect(responseRouteTwo.status).toEqual(200)
  })

  test('Test multi route handler', async () => {
    const multiRouteConfig = require('./fixtures/multiRoute.config')
    nuxt = await setupNuxt(multiRouteConfig)
    await nuxt.builder.build()
    await nuxt.listen(3000)

    const responseRouteOneContent = await fetch(url('/alive')).then(res => res.text())
    expect(responseRouteOneContent).toEqual('"I am alive"')

    const responseRouteTwoContent = await fetch(url('/hello-world')).then(res => res.text())
    expect(responseRouteTwoContent).toEqual('"Lorem Ipsum"')
  })
})
