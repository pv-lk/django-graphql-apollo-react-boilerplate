import Head from 'next/head'
import Layout from 'components/layout/Layout'
import { withApollo } from 'lib/withApollo'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <p>Hello world!</p>
      </Layout>
    </div>
  )
}

export default withApollo(IndexPage)
