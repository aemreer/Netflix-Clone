import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import {
    addDoc,
    collection,
    getFirestore,
} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBNkV29zp-Z67I0ZwXPjrOlgtIY9f2VsNY",
    authDomain: "netflix-26df2.firebaseapp.com",
    projectId: "netflix-26df2",
    storageBucket: "netflix-26df2.firebasestorage.app",
    messagingSenderId: "341714372090",
    appId: "1:341714372090:web:f3874e5b3edf18c7009043"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
const logout = () => {
    signOut(auth)
}
export { auth, db, login, signup, logout }
