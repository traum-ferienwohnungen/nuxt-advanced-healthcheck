module.exports = {
  healthcheck: [{
    path: '/alive',
    handler: (req, res, next) => {
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify('I am alive'))
    }
  }, {
    path: '/hello-world',
    handler: (req, res, next) => {
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify('Lorem Ipsum'))
    }
  }
  ]
}
