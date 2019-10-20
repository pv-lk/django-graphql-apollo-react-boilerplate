import React from 'react'
import App from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from 'lib/config/theme'
import Layout from 'components/layout/Layout'

class MyApp extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  }
}

export default MyApp
