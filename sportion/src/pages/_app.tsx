import '@/styles/globals.css'
import '@/styles/style.css'
import '@/styles/form.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { getApolloClient } from '../utility/appolo-client';
import { AuthContextProvider } from '../../components/auth-context-provider';
import { PrimaryAppbar } from '../../components/primaryAppbar'

import style from '@/styles/theme/style';

import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {

  const theme = createTheme(style)

  const client = getApolloClient({ forceNew: false });
  return (
    <AuthContextProvider>

      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <PrimaryAppbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </AuthContextProvider>
  )
}
