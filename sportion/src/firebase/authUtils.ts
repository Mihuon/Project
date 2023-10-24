import firebase_app from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(firebase_app);
export const authUtils = {
    login : async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    },
    logout : async () => {
        await auth.signOut()
    },
    register : async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    },
    getCurrentUser : ()=>auth.currentUser
}