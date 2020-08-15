import cookie from 'cookie'

const isBrowser = () => typeof window !== 'undefined'

const parseCookies = (ctx = {}, options = {}) => {
  if (ctx && ctx.req && ctx.req.headers.cookie) {
    return cookie.parse(ctx.req.headers.cookie, options)
  }

  if (isBrowser()) {
    return cookie.parse(document.cookie, options)
  }

  return {}
}

const setCookie = (
  ctx = {},
  name,
  value,
  options = {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  }
) => {
  if (ctx && ctx.res) {
    ctx.res.setHeader('Set-Cookie', cookie.serialize(name, value, options))
  }

  if (isBrowser()) {
    document.cookie = cookie.serialize(name, value, options)
  }

  return {}
}

const destroyCookie = (ctx = {}, name) => {
  if (ctx && ctx.res) {
    ctx.res.setHeader('Set-Cookie', cookie.serialize(name, '', { maxAge: -1 }))
  }

  if (isBrowser()) {
    document.cookie = cookie.serialize(name, '', { maxAge: -1 })
  }

  return {}
}

export default {
  get: (ctx, options) => parseCookies(ctx, options),
  set: (ctx, name, value, options) => {
    setCookie(ctx, name, value, options)
  },
  destroy: (ctx, name) => destroyCookie(ctx, name),
}
