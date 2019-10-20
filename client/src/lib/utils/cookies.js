import { parse, serialize } from 'cookie'

/**
 * Cookie parser that works on the
 * server and on the client
 * @param {Object} req
 * @param {Object} config
 */

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options = {}) => {
  const stringValue =
        typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue)))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
export default cookies = handler => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, values, options)

  return handler(req, res)
}

// const handler = (req, res) => {
//   res.cookie('Next.js', 'api-middleware')
//   res.end('Hello next.js middleware')
// }

// export default cookies(handler)
