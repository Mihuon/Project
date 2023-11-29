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
  createPlace?: Maybe<Place>;
  createProfile?: Maybe<Profile>;
  createReservation?: Maybe<Reservation>;
  deletePlace?: Maybe<Place>;
  deleteReservation?: Maybe<Reservation>;
  updatePlace?: Maybe<Place>;
  updateReservation?: Maybe<Reservation>;
};


export type MutationCreatePlaceArgs = {
  cost?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateProfileArgs = {
  admin?: InputMaybe<Scalars['Boolean']>;
  credit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};


export type MutationCreateReservationArgs = {
  charge?: InputMaybe<Scalars['Int']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  place?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
};


export type MutationDeletePlaceArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteReservationArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePlaceArgs = {
  cost?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateReservationArgs = {
  charge?: InputMaybe<Scalars['Int']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  place?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
};

export type Place = {
  __typename?: 'Place';
  cost?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  admin?: Maybe<Scalars['Boolean']>;
  credit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  githubUsers: Array<GithubUser>;
  place: Array<Place>;
  profile: Array<Profile>;
  reservation: Array<Reservation>;
  users: Array<User>;
};

export type Reservation = {
  __typename?: 'Reservation';
  charge?: Maybe<Scalars['Int']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  place?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  timeFrom?: Maybe<Scalars['Int']>;
  timeTo?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
};

export type PlaceQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaceQuery = { __typename?: 'Query', place: Array<{ __typename?: 'Place', id?: string | null, name?: string | null, cost?: number | null }> };

export type CreatePlaceMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Int']>;
}>;


export type CreatePlaceMutation = { __typename?: 'Mutation', createPlace?: { __typename?: 'Place', id?: string | null, name?: string | null, cost?: number | null } | null };

export type UpdatePlaceMutationVariables = Exact<{
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Int']>;
}>;


export type UpdatePlaceMutation = { __typename?: 'Mutation', updatePlace?: { __typename?: 'Place', id?: string | null, name?: string | null, cost?: number | null } | null };

export type DeletePlaceMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePlaceMutation = { __typename?: 'Mutation', deletePlace?: { __typename?: 'Place', id?: string | null } | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: Array<{ __typename?: 'Profile', uid?: string | null, name?: string | null, surname?: string | null, credit?: number | null, admin?: boolean | null }> };

export type CreateProfileMutationVariables = Exact<{
  uid?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
  credit?: InputMaybe<Scalars['Int']>;
  admin?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile?: { __typename?: 'Profile', uid?: string | null, name?: string | null, surname?: string | null, credit?: number | null, admin?: boolean | null } | null };

export type ReservationQueryVariables = Exact<{ [key: string]: never; }>;


export type ReservationQuery = { __typename?: 'Query', reservation: Array<{ __typename?: 'Reservation', id?: string | null, name?: string | null, timeFrom?: number | null, timeTo?: number | null, place?: string | null, charge?: number | null, paid?: boolean | null, confirmed?: boolean | null, profile?: string | null }> };

export type CreateReservationMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
  charge?: InputMaybe<Scalars['Int']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  profile?: InputMaybe<Scalars['String']>;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation?: { __typename?: 'Reservation', id?: string | null, name?: string | null, timeFrom?: number | null, timeTo?: number | null, place?: string | null, charge?: number | null, paid?: boolean | null, confirmed?: boolean | null, profile?: string | null } | null };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  timeFrom?: InputMaybe<Scalars['Int']>;
  timeTo?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
  charge?: InputMaybe<Scalars['Int']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateReservationMutation = { __typename?: 'Mutation', updateReservation?: { __typename?: 'Reservation', id?: string | null, name?: string | null, timeFrom?: number | null, timeTo?: number | null, place?: string | null, charge?: number | null, paid?: boolean | null } | null };

export type DeleteReservationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DeleteReservationMutation = { __typename?: 'Mutation', deleteReservation?: { __typename?: 'Reservation', id?: string | null } | null };


export const PlaceDocument = gql`
    query Place {
  place {
    id
    name
    cost
  }
}
    `;

/**
 * __usePlaceQuery__
 *
 * To run a query within a React component, call `usePlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaceQuery(baseOptions?: Apollo.QueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
      }
export function usePlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
export type PlaceQueryResult = Apollo.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const CreatePlaceDocument = gql`
    mutation CreatePlace($name: String, $cost: Int) {
  createPlace(name: $name, cost: $cost) {
    id
    name
    cost
  }
}
    `;
export type CreatePlaceMutationFn = Apollo.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      cost: // value for 'cost'
 *   },
 * });
 */
export function useCreatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, options);
      }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = Apollo.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = Apollo.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const UpdatePlaceDocument = gql`
    mutation UpdatePlace($id: String!, $name: String, $cost: Int) {
  updatePlace(id: $id, name: $name, cost: $cost) {
    id
    name
    cost
  }
}
    `;
export type UpdatePlaceMutationFn = Apollo.MutationFunction<UpdatePlaceMutation, UpdatePlaceMutationVariables>;

/**
 * __useUpdatePlaceMutation__
 *
 * To run a mutation, you first call `useUpdatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaceMutation, { data, loading, error }] = useUpdatePlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      cost: // value for 'cost'
 *   },
 * });
 */
export function useUpdatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlaceMutation, UpdatePlaceMutationVariables>(UpdatePlaceDocument, options);
      }
export type UpdatePlaceMutationHookResult = ReturnType<typeof useUpdatePlaceMutation>;
export type UpdatePlaceMutationResult = Apollo.MutationResult<UpdatePlaceMutation>;
export type UpdatePlaceMutationOptions = Apollo.BaseMutationOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>;
export const DeletePlaceDocument = gql`
    mutation DeletePlace($id: String!) {
  deletePlace(id: $id) {
    id
  }
}
    `;
export type DeletePlaceMutationFn = Apollo.MutationFunction<DeletePlaceMutation, DeletePlaceMutationVariables>;

/**
 * __useDeletePlaceMutation__
 *
 * To run a mutation, you first call `useDeletePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlaceMutation, { data, loading, error }] = useDeletePlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlaceMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlaceMutation, DeletePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlaceMutation, DeletePlaceMutationVariables>(DeletePlaceDocument, options);
      }
export type DeletePlaceMutationHookResult = ReturnType<typeof useDeletePlaceMutation>;
export type DeletePlaceMutationResult = Apollo.MutationResult<DeletePlaceMutation>;
export type DeletePlaceMutationOptions = Apollo.BaseMutationOptions<DeletePlaceMutation, DeletePlaceMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    uid
    name
    surname
    credit
    admin
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($uid: String, $name: String, $surname: String, $credit: Int, $admin: Boolean) {
  createProfile(
    uid: $uid
    name: $name
    surname: $surname
    credit: $credit
    admin: $admin
  ) {
    uid
    name
    surname
    credit
    admin
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *      name: // value for 'name'
 *      surname: // value for 'surname'
 *      credit: // value for 'credit'
 *      admin: // value for 'admin'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
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
    confirmed
    profile
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
    mutation CreateReservation($name: String, $timeFrom: Int, $timeTo: Int, $place: String, $charge: Int, $paid: Boolean, $confirmed: Boolean, $profile: String) {
  createReservation(
    name: $name
    timeFrom: $timeFrom
    timeTo: $timeTo
    place: $place
    charge: $charge
    paid: $paid
    confirmed: $confirmed
    profile: $profile
  ) {
    id
    name
    timeFrom
    timeTo
    place
    charge
    paid
    confirmed
    profile
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
 *      confirmed: // value for 'confirmed'
 *      profile: // value for 'profile'
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
    mutation UpdateReservation($id: String!, $name: String, $timeFrom: Int, $timeTo: Int, $place: String, $charge: Int, $paid: Boolean, $confirmed: Boolean) {
  updateReservation(
    id: $id
    name: $name
    timeFrom: $timeFrom
    timeTo: $timeTo
    place: $place
    charge: $charge
    paid: $paid
    confirmed: $confirmed
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
 *      confirmed: // value for 'confirmed'
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