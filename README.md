# Nuxt-Advanced-Healthcheck

Module for NuxtJS that adds the provides a healthcheck route.

## Install

*Installing with NPM*
`npm i @traum-ferienwohnungen/nuxt-advanced-healthcheck`

*Installing with Yarn*
`yarn add @traum-ferienwohnungen/nuxt-advanced-healthcheck`

## Setup

*Add `@traum-ferienwohnungen/nuxt-advanced-healthcheck` to your nuxt config*
```javascript
module.exports = {
  modules: [
    '@traum-ferienwohnungen/nuxt-advanced-healthcheck'
  ]
}
```

*The default route for checking the health of your application is now available under `/healthcheck`*
It will respond with the `Content-Type: text/plain` and `Ok` as response data.

## Advanced configuration

### Single Route
To configure a single healthcheck route and the response handler use this reference:

```javascript
  healthcheck: {
    path: '/alive'
    handler: (req, res, next) => {
      res.setHeader('application/json')
      res.end(JSON.stringify('Hello World'))
    }
  }
```

### Multi Route
When you want to use multiple routes you can use an array - like so:

```javascript
  healthcheck: [
    {
      path: '/alive',
      handler: (req, res, next) => {
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify('Hello World'))
      }
    },
    {
      // Only for local requests
      path: '/status',
      handler: (req, res, next) => {
        if(req.headers['x-forwarded-for'] === '127.0.0.1') {
          res.status(200)
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify('Ok'))
        } else {
          res.status(404)
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify('Not Found'))
        }
      }
    }
  ]
```

