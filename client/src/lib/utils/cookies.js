import { parse, serialize } from 'cookie'
import { isServer } from './checks'

const getCookies = (req, key) => {

  if (isServer()) {
    if (req && req.headers && req.headers.cookie) {
      const cookies = parse(req.headers.cookie)
      return key ? cookies[key] : cookies
    }

    return undefined
  }

  const cookies = {}
  const cookieStrings = document.cookie ? document.cookie.split('; ') : []
  for (var i = 0; i < cookieStrings.length; i++) {
    var parts = cookies[i].split('=')
    var cookie = parts.slice(1).join('=')

    if (cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1)
    }

    var name = parts[0]

    cookies[name] = cookie
  }

  return key ? (decode(cookies[key])) : cookies
}

const setCookie = (res, key, value, options = {}) => {

  if ('maxAge' in options) {
    options.expires = new Date(date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  const cookieString = serialize(key, stringify(value), { ...options })

  if (isServer()) {
    if (res) {
      return res.getHeader('Set-Cookie')
      ? res.setHeader('Set-Cookie', [cookieString])
      : res.setHeader()
    }
    return undefined
  }

}
