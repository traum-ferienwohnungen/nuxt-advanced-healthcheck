const defaults = {
  path: '/healthcheck',
  handler: (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Ok')
  }
}

const _addMiddleware = (config = {}, moduleOptions, context) => {
  const options = Object.assign({}, defaults, moduleOptions, config)
  context.addServerMiddleware({
    path: options.path,
    handler: options.handler
  })
}

function healthcheck (moduleOptions) {
  if (Array.isArray(this.options.healthcheck)) {
    this.options.healthcheck.forEach((healthOptions) => {
      _addMiddleware(healthOptions, moduleOptions, this)
    })
  } else {
    _addMiddleware(this.options.healthcheck, moduleOptions, this)
  }
}

module.exports = healthcheck
module.exports.meta = require('../package.json')
