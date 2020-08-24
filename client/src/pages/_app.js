import 'styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { useRouter } from 'next/router'


const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={ apolloClient }>
      <Component { ...pageProps } />
    </ApolloProvider>
  )
}

export default App
