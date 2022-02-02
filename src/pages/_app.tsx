import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { AuthContextProvider } from '../contexts/AuthContext'

import GlobalStyles from '../styles/GlobalStyles'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
