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

export type Mutation = {
  __typename?: 'Mutation';
  createReservation?: Maybe<Reservation>;
  deleteReservation?: Maybe<Reservation>;
  updateReservation?: Maybe<Reservation>;
};


export type MutationCreateReservationArgs = {
  charge?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  place?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteReservationArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateReservationArgs = {
  charge?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  place?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
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

export type CreateReservationMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
  charge?: InputMaybe<Scalars['Int']>;
  paid?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation?: { __typename?: 'Reservation', id?: string | null, name?: string | null, timeFrom?: number | null, timeTo?: number | null, place?: string | null, charge?: number | null, paid?: boolean | null } | null };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
  charge?: InputMaybe<Scalars['Int']>;
  paid?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateReservationMutation = { __typename?: 'Mutation', updateReservation?: { __typename?: 'Reservation', id?: string | null, name?: string | null, timeFrom?: number | null, timeTo?: number | null, place?: string | null, charge?: number | null, paid?: boolean | null } | null };

export type DeleteReservationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DeleteReservationMutation = { __typename?: 'Mutation', deleteReservation?: { __typename?: 'Reservation', id?: string | null } | null };


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
export const CreateReservationDocument = gql`
    mutation CreateReservation($name: String, $timeFrom: Int, $timeTo: Int, $place: String, $charge: Int, $paid: Boolean) {
  createReservation(
    name: $name
    timeFrom: $timeFrom
    timeTo: $timeTo
    place: $place
    charge: $charge
    paid: $paid
  ) {
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
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      timeFrom: // value for 'timeFrom'
 *      timeTo: // value for 'timeTo'
 *      place: // value for 'place'
 *      charge: // value for 'charge'
 *      paid: // value for 'paid'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const UpdateReservationDocument = gql`
    mutation UpdateReservation($id: String!, $name: String, $timeFrom: Int, $timeTo: Int, $place: String, $charge: Int, $paid: Boolean) {
  updateReservation(
    id: $id
    name: $name
    timeFrom: $timeFrom
    timeTo: $timeTo
    place: $place
    charge: $charge
    paid: $paid
  ) {
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
export type UpdateReservationMutationFn = Apollo.MutationFunction<UpdateReservationMutation, UpdateReservationMutationVariables>;

/**
 * __useUpdateReservationMutation__
 *
 * To run a mutation, you first call `useUpdateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReservationMutation, { data, loading, error }] = useUpdateReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      timeFrom: // value for 'timeFrom'
 *      timeTo: // value for 'timeTo'
 *      place: // value for 'place'
 *      charge: // value for 'charge'
 *      paid: // value for 'paid'
 *   },
 * });
 */
export function useUpdateReservationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReservationMutation, UpdateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReservationMutation, UpdateReservationMutationVariables>(UpdateReservationDocument, options);
      }
export type UpdateReservationMutationHookResult = ReturnType<typeof useUpdateReservationMutation>;
export type UpdateReservationMutationResult = Apollo.MutationResult<UpdateReservationMutation>;
export type UpdateReservationMutationOptions = Apollo.BaseMutationOptions<UpdateReservationMutation, UpdateReservationMutationVariables>;
export const DeleteReservationDocument = gql`
    mutation DeleteReservation($id: String) {
  deleteReservation(id: $id) {
    id
  }
}
    `;
export type DeleteReservationMutationFn = Apollo.MutationFunction<DeleteReservationMutation, DeleteReservationMutationVariables>;

/**
 * __useDeleteReservationMutation__
 *
 * To run a mutation, you first call `useDeleteReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReservationMutation, { data, loading, error }] = useDeleteReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReservationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReservationMutation, DeleteReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReservationMutation, DeleteReservationMutationVariables>(DeleteReservationDocument, options);
      }
export type DeleteReservationMutationHookResult = ReturnType<typeof useDeleteReservationMutation>;
export type DeleteReservationMutationResult = Apollo.MutationResult<DeleteReservationMutation>;
export type DeleteReservationMutationOptions = Apollo.BaseMutationOptions<DeleteReservationMutation, DeleteReservationMutationVariables>;