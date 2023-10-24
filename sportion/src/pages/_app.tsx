import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { getApolloClient } from '../utility/appolo-client';

export default function App({ Component, pageProps }: AppProps) {
  
  const client = getApolloClient({ forceNew: false });
  return(
  
  <ApolloProvider client={client}>
  <Component {...pageProps} />
  
  </ApolloProvider>
  )
}
