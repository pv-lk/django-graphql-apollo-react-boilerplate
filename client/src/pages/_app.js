import React from 'react'
import App from 'next/app'
import { ProvideAuth } from '../lib/users/useAuth'

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps}/>
    </ProvideAuth>
  )
}

export default MyApp
