import cookie from 'cookie'
import redirect from 'lib/utils/redirect'
import { TOKEN_AUTH } from './graphql/mutations.graphql'

// export default client =>
//   client
//     .mutate({
//       mutation: TOKEN_AUTH
//     })
//     .then(({ data }) => {
//       console.log(data)
//       cookie.serialize('token', data.login.token)
//       cache.reset().then(() => {
//         redirect({}, '/')
//       })
//     })
//     .catch(({ error }) => {
//       console.log(error)
//     })

export default (token, client) => {
    console.log(token)
    cookie.serialize('JWT', token)
    client.cache.reset().then(() => {
      redirect({}, '/')
      console.log(cookie.parse())
    })
  }
