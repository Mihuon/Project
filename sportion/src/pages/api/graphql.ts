/* eslint-disable no-useless-catch */
import { Context } from '@apollo/client';
import axios from 'axios';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';

import { firestore } from '../../server/firebase-admin-config';
import { verifyToken } from '../../server/verifyToken';

const typeDefs = gql`
  type Query {
    users: [User!]!
    githubUsers: [GithubUser!]!
    profile:[Profile!]!
    reservation: [Reservation!]!
    place: [Place!]!
  }
  type User {
    name: String
  }
  type Profile {
    uid: String
    name: String
    surname: String
    credit: Int
    admin: Boolean
  }
  type GithubUser {
    id: ID!
    login: String!
    avatarUrl: String!
  }
  
  type Reservation {
  id      : String
  name    : String
  timeFrom: Int
  timeTo  : Int
  place   : String
  charge  : Int
  paid    : Boolean
  profile : String
  }
  type Place {
  id  : String
  name: String
  cost: Int
}
  type Mutation {
  createReservation(
    name: String
    timeFrom: Int
    timeTo: Int
    place: String
    charge: Int
    paid: Boolean
    profile: String
    
  ): Reservation
  updateReservation(
    id: String
    name: String
    timeFrom: Int
    timeTo: Int
    place: String
    charge: Int
    paid: Boolean
  ): Reservation
  deleteReservation(id: String):Reservation

  
  createPlace(
    name: String
    cost: Int
  ): Place
  updatePlace(
    id: String
    name: String
    cost: Int
  ): Place
  deletePlace(id: String):Place
}
`;
const db = firestore();
const resolvers = {
    Query: {
        users: async () => {
            const usersRef = db.collection(
                'users',
            ) as FirebaseFirestore.CollectionReference<DbUser>;
            const docsRefs = await usersRef.listDocuments();
            const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
            const docsSnapshots = await Promise.all(docsSnapshotPromises);
            const docs = docsSnapshots.map((doc) => doc.data()!);
            console.log(docs);

            return [{ name: 'Nextjs' }];
        },
        profile:async (context: Context) => {
            const result = await db.collection('Profile').get();

            const data = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    uid: docData.uid,
                    name: docData.name,
                    surname: docData.surname,
                    credit: docData.credit,
                    admin: docData.admin
                });
            });
            console.log(data);
            return data;
        },
        reservation: async (context: Context) => {
            const result = await db.collection('Reservation').get();

            const data = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    name: docData.name,
                    timeFrom: docData.timeFrom,
                    timeTo: docData.timeTo,
                    place: docData.place,
                    paid: docData.paid,
                    charge: docData.charge,
                    profile: docData.profile
                });
            });
            console.log(data);
            return data;
        },
        place: async (context: Context) => {
            const result = await db.collection('Place').get();

            const data = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    name: docData.name,
                    cost: docData.cost
                });
            });
            console.log(data);
            return data;
        },
        githubUsers: async () => {
            try {
                const users = await axios.get('https://api.github.com/users');
                // @ts-ignore
                return users.data.map(({ id, login, avatar_url: avatarUrl }) => ({
                    id,
                    login,
                    avatarUrl,
                }));
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        createReservation: (parent: unknown, args: { name: string, timeFrom: number, timeTo: number, place: string, charge: number, paid: boolean, profile: string }) => {
            const reservation = {
                name: args.name,
                timeFrom: args.timeFrom,
                timeTo: args.timeTo,
                place: args.place,
                charge: args.charge,
                paid: args.paid,
                profile: args.profile
            };
            db.collection('Reservation').add(reservation);
            return args;
        },
        updateReservation: async (parent: unknown, args: { id: string, name: string, timeFrom: number, timeTo: number, place: string, charge: number, paid: boolean }) => {
            const reservation = {
                name: args.name,
                timeFrom: args.timeFrom,
                timeTo: args.timeTo,
                place: args.place,
                charge: args.charge,
                paid: args.paid
            };
            const reservationRef = db.collection('Reservation').doc(args.id);
            await reservationRef.update(reservation);

            const updatedReservation = await reservationRef.get();
            return {
                id: args.id,
                ...updatedReservation.data()
            };
        },
        deleteReservation: async (parent: unknown, args: { id: string }) => {
            const reservationRef = db.collection('Reservation').doc(args.id);
            await reservationRef.delete();

            return true;
        },

        createPlace: (parent: unknown, args: { name: string, cost: number}) => {
            const place = {
                name: args.name,
                cost: args.cost
            };
            db.collection('Place').add(place);
            return args;
        },
        updatePlace: async (parent: unknown, args: { id: string, name: string, cost: number}) => {
            const place = {
                name: args.name,
                cost: args.cost
            };
            const placeRef = db.collection('Place').doc(args.id);
            await placeRef.update(place);

            const updatedPlace = await placeRef.get();
            return {
                id: args.id,
                ...updatedPlace.data()
            };
        },
        deletePlace: async (parent: unknown, args: { id: string }) => {
            const placeRef = db.collection('Place').doc(args.id);
            await placeRef.delete();

            return true;
        }
    }
};
const schema = createSchema({
    typeDefs,
    resolvers,
});
export const config = {
    api: {
        bodyParser: false,
    },
};
export default createYoga({
    schema,
    graphqlEndpoint: '/api/graphql',
    context: async (context) => {
        const auth = context.request.headers.get('authorization');
        //! SMAZAT CONSOLE LOG
        console.log(auth);
        return {
            user: auth ? await verifyToken(auth) : undefined,
        } as Context;
    },
});
