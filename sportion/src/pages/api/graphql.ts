/* eslint-disable no-useless-catch */
import { Context } from '@apollo/client';
import axios from 'axios';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';
import { DateTimeResolver } from 'graphql-scalars'

import { firestore } from '../../server/firebase-admin-config';
import { verifyToken } from '../../server/verifyToken';
import { DecodedIdToken } from 'firebase-admin/auth';
import { profile } from 'console';

type MyContext = { user?: DecodedIdToken };

const typeDefs = gql`
  type Query {
    reservation: [Reservation!]!
    myReservation:[Reservation!]!
    profile:[Profile!]!
    myProfile:[Profile!]!
    place: [Place!]!
  }
  type Reservation {
  id: String
  name: String
  timeFrom: String
  timeTo: String
  place: String
  charge: Int
  paid: Boolean
  confirmed: Boolean
  profile:String
  }
  type Profile {
  id: String
    uid: String
    name: String
    surname: String
    credit: Int
    admin: Boolean
  }
  type Place {
  id:String
  name:String
  cost:Int
}
  type Mutation {
  createReservation(
    name: String
    timeFrom: String
    timeTo: String
    place: String
    charge: Int
    paid: Boolean
    confirmed: Boolean
    profile: String
  ): Reservation
  updateReservation(
    id: String
    name: String
    timeFrom: String
    timeTo: String
    place: String
    charge: Int
    paid: Boolean
    confirmed: Boolean
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

  createProfile(
    uid: String
    name: String
    surname: String
    credit: Int
    admin: Boolean
  ): Profile
  updateProfile(
  id:String
    uid: String
    name: String
    surname: String
    credit: Int
    admin: Boolean
  ): Profile
  updateCreditProfile(
  id:String
    credit: Int
  ): Profile
  }
`;
const db = firestore();
const resolvers = {
    Query: {
        profile: async (context: Context) => {
            const result = await db.collection('Profile').get();

            const data: { id: string; uid: string; name: string; surname: string; credit: number; admin: boolean; }[] = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    uid: docData.uid,
                    name: docData.name,
                    surname: docData.surname,
                    credit: docData.credit,
                    admin: docData.admin
                });
            });
            return data;
        },
        myProfile: async (parent: unknown, args: unknown, context: MyContext) => {
            const user = context.user;
            const result = await db.collection('Profile').where('uid', '==', user?.uid).get();

            const data: { id: string; uid: string; name: string; surname: string; credit: number; admin: boolean; }[] = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    uid: docData.uid,
                    name: docData.name,
                    surname: docData.surname,
                    credit: docData.credit,
                    admin: docData.admin
                });
            });
            return data;
        },
        reservation: async (context: Context) => {
            const result = await db.collection('Reservation').get();

            const data: {
                id: string;
                name: string;
                timeFrom: string;
                timeTo: string;
                place: string;
                paid: boolean;
                confirmed: boolean;
                charge: number;
                profile: string;
            }[] = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    name: docData.name,
                    timeFrom: docData.timeFrom,
                    timeTo: docData.timeTo,
                    place: docData.place,
                    paid: docData.paid,
                    confirmed: docData.confirmed,
                    charge: docData.charge,
                    profile: docData.profile
                });
            });
            return data;
        },
        myReservation: async (parent: unknown, args: unknown, context: MyContext) => {
            const user = context.user;
            const result = await db.collection('Reservation').where('profile', '==', user?.uid).get();
            const data: { id: string; name: string; timeFrom: string; timeTo: string; place: string; paid: boolean; confirmed: boolean; charge: number; profile: string; }[] = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    name: docData.name,
                    timeFrom: docData.timeFrom,
                    timeTo: docData.timeTo,
                    place: docData.place,
                    paid: docData.paid,
                    confirmed: docData.confirmed,
                    charge: docData.charge,
                    profile: docData.profile
                });
            });
            return data;
        },
        place: async (context: Context) => {
            const result = await db.collection('Place').get();

            const data: { id: string; name: string; cost: number; }[] = [];

            result.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    name: docData.name,
                    cost: docData.cost
                });
            });

            return data;
        },
    },
    Mutation: {
        createReservation: (parent: unknown, args: {
            name: string,
            timeFrom: string,
            timeTo: string,
            place: string,
            charge: number,
            paid: boolean,
            confirmed: boolean,
            profile: string
        }) => {
            const reservation = {
                name: args.name,
                timeFrom: args.timeFrom,
                timeTo: args.timeTo,
                place: args.place,
                charge: args.charge,
                paid: args.paid,
                confirmed: args.confirmed,
                profile: args.profile
            };
            db.collection('Reservation').add(reservation);
            return args;
        },
        updateReservation: async (parent: unknown, args: { id: string, name: string, timeFrom: number, timeTo: number, place: string, charge: number, paid: boolean, confirmed: boolean, }) => {
            const reservation = {
                name: args.name,
                timeFrom: args.timeFrom,
                timeTo: args.timeTo,
                place: args.place,
                charge: args.charge,
                paid: args.paid,
                confirmed: args.confirmed
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

        createPlace: (parent: unknown, args: { name: string, cost: number }) => {
            const place = {
                name: args.name,
                cost: args.cost
            };
            db.collection('Place').add(place);
            return args;
        },
        updatePlace: async (parent: unknown, args: { id: string, name: string, cost: number }) => {
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
        },
        createProfile: (parent: unknown, args: { uid: string, name: string, surname: string, credit: number, admin: boolean }) => {
            const profile = {
                uid: args.uid,
                name: args.name,
                surname: args.surname,
                credit: args.credit,
                admin: args.admin,
            };
            db.collection('Profile').add(profile);
            return args;
        },
        updateProfile: async (parent: unknown, args: { id: string, uid: string, name: string, surname: string, credit: number, admin: boolean }) => {
            const profile = {
                uid: args.uid,
                name: args.name,
                surname: args.surname,
                credit: args.credit,
                admin: args.admin,
            };
            const profileRef = db.collection('Profile').doc(args.id);
            await profileRef.update(profile);

            const updatedProfile = await profileRef.get();
            return {
                id: args.id,
                ...updatedProfile.data()
            };
        },
        updateCreditProfile: async (parent: unknown, args: { id: string, credit: number }) => {
            const profile = {
                credit: args.credit
            };
            const profileRef = db.collection('Profile').doc(args.id);
            await profileRef.update(profile);

            const updatedProfile = await profileRef.get();
            return {
                id: args.id,
                ...updatedProfile.data()
            };
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
        return {
            user: auth ? await verifyToken(auth) : undefined,
        } as Context;
    },
});
