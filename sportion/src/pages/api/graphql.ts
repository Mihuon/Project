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
    reservation: [Reservation!]!
  }
  type User {
    name: String
  }
  type Usr {
    name: String
  }
  type GithubUser {
    id: ID!
    login: String!
    avatarUrl: String!
  }
  
  type Reservation {
  id:String
  name:String
  timeFrom: Int
  timeTo: Int
  place:String
  charge:Int
  paid:Boolean
  }
  type Mutation {
  createReservation(
    name: String
    timeFrom: Int
    timeTo: Int
    place: String
    charge: Int
    paid: Boolean
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
                    charge: docData.charge
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
        createReservation: (parent: unknown, args: { name: string, timeFrom: number, timeTo: number, place: string, charge: number, paid: boolean }) => {
            const reservation = {
                name: args.name,
                timeFrom: args.timeFrom,
                timeTo: args.timeTo,
                place: args.place,
                charge: args.charge,
                paid: args.paid
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
            try {
                // Use Firestore's 'update' method to update an existing document in the 'Reservation' collection
                const reservationRef = db.collection('Reservation').doc(args.id);
                await reservationRef.update(reservation);

                // Return the updated reservation
                const updatedReservation = await reservationRef.get();
                return {
                    id: args.id,
                    ...updatedReservation.data()
                };
            } catch (error) {
                // Handle any errors that occur during the update
                throw error;
            }
        },
        deleteReservation: async (parent: unknown, args: { id: string }) => {
                const reservationRef = db.collection('Reservation').doc(args.id);
                await reservationRef.delete();
    
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
        console.log(auth);
        return {
            user: auth ? await verifyToken(auth) : undefined,
        } as Context;
    },
});
