import { parse } from 'cookie'

/**
 * Cookie parser that works on the
 * server and on the client
 * @param {Object} req
 * @param {Object} config
 */

export default req => {
  return parse(req ? req.headers.cookie || '' : document.cookie)
}
