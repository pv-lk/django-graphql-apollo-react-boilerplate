import Head from 'next/head'
import withApollo from 'lib/with-apollo'
import redirect from 'lib/utils/redirect'
import checkCurrentUser from 'lib/users/current-user'
import getCsrfToken from 'lib/utils/csrf'

const IndexPage = ({ currentUser }) => {

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hello { currentUser.me.username } </p>
    </div>
  )
}

IndexPage.getInitialProps = async ctx => {
  console.log(await getCsrfToken(ctx))

  const { currentUser } = await checkCurrentUser(ctx.apolloClient)
  console.log(currentUser)
  if (!currentUser.me) {
    redirect(ctx, '/login')
  }
  return { currentUser }
}

export default withApollo(IndexPage)
