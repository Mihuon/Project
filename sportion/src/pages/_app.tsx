import '@/styles/globals.css'
import '@/styles/style.css'
import '@/styles/form.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { getApolloClient } from '../utility/appolo-client';
import { AuthContextProvider } from '@/components/auth-context-provider';


export default function App({ Component, pageProps }: AppProps) {

  const client = getApolloClient({ forceNew: false });
  return (
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />

      </ApolloProvider>
    </AuthContextProvider>
  )
}
