import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GithubUser = {
  __typename?: 'GithubUser';
  avatarUrl: Scalars['String'];
  id: Scalars['ID'];
  login: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  githubUsers: Array<GithubUser>;
  reservation: Array<Reservation>;
  users: Array<User>;
};

export type Reservation = {
  __typename?: 'Reservation';
  charge?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  place?: Maybe<Scalars['String']>;
  timeFrom?: Maybe<Scalars['Int']>;
  timeTo?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
};

export type Usr = {
  __typename?: 'Usr';
  name?: Maybe<Scalars['String']>;
};

export type ReservationQueryVariables = Exact<{ [key: string]: never; }>;


export type ReservationQuery = { __typename?: 'Query', reservation: Array<{ __typename?: 'Reservation', id?: string | null, name?: string | null, timeFrom?: number | null, timeTo?: number | null, place?: string | null, charge?: number | null, paid?: boolean | null }> };


export const ReservationDocument = gql`
    query Reservation {
  reservation {
    id
    name
    timeFrom
    timeTo
    place
    charge
    paid
  }
}
    `;

/**
 * __useReservationQuery__
 *
 * To run a query within a React component, call `useReservationQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationQuery({
 *   variables: {
 *   },
 * });
 */
export function useReservationQuery(baseOptions?: Apollo.QueryHookOptions<ReservationQuery, ReservationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationQuery, ReservationQueryVariables>(ReservationDocument, options);
      }
export function useReservationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationQuery, ReservationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationQuery, ReservationQueryVariables>(ReservationDocument, options);
        }
export type ReservationQueryHookResult = ReturnType<typeof useReservationQuery>;
export type ReservationLazyQueryHookResult = ReturnType<typeof useReservationLazyQuery>;
export type ReservationQueryResult = Apollo.QueryResult<ReservationQuery, ReservationQueryVariables>;