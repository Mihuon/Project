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
