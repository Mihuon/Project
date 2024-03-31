import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { authUtils } from '../firebase/authUtils';
const isServer = typeof window === 'undefined';
// source: https://github.com/shshaw/next-apollo-ssr
// @ts-ignore

const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT: ApolloClient<any>;
const endpoint = '/api/graphql';
const logoutLink = (logout: VoidFunction) =>
  onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.info(JSON.stringify(networkError));
      // @ts-ignore
      if (networkError?.result?.error === 'Unauthorized') {
        logout();
      }
    }
    if (graphQLErrors?.[0]?.message === 'Unauthorized') {
      logout();
    }
  });
const oAuthLink = () =>
  // @ts-ignore
  setContext(async ({ operationName }, { headers }) => {
    const user = authUtils.getCurrentUser() || null;
    const jwtToken = user ? await user.getIdToken() : null;
    // console.log('USER', user);
    return {
      headers: {
        ...headers,
        authorization: jwtToken ? `Bearer ${jwtToken}` : '',
      },
    };
  });
const httpLink = (): HttpLink => {
  if (typeof window === 'undefined') {
    return new HttpLink({
      uri: endpoint,
      credentials: 'same-origin',
      headers: {},
    });
  }
  return new HttpLink({
    uri: endpoint,
    credentials: 'same-origin',
    headers: {
    },
  });
};

type ApolloClientProps =
  | {
    forceNew?: false;
    logout?: VoidFunction;
  }
  | {
    forceNew: true;
  };
export function getApolloClient(parameters: ApolloClientProps) {
  const forceNew = parameters?.forceNew;
  const logout = parameters.forceNew ? undefined : parameters.logout;
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      uri: endpoint,
      cache: new InMemoryCache().restore(windowApolloState || {}),
      credentials: 'same-origin',
      link: ApolloLink.from(
        isServer || !logout
          ? [oAuthLink(), httpLink()]
          : [oAuthLink(), logoutLink(logout), httpLink()],
      ),
    });
  }
  return CLIENT;
}
