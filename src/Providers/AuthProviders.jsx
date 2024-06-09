import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword (auth, email, password)
    }

    const updateUserData = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
      });
    };

    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }


    const googleLogin = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            // if(currentUser){
            //     // get token and store client
            //     const userInfo = {email: currentUser?.email};
            //     axios.post('http://localhost:5000/jwt', userInfo)
            //     .then(res => {
            //         if(res.data.token){
            //             localStorage.setItem('access-token', res.data.token);
            //         }
            //     })
            // }
            // else {
            //     // TODO: remove token(if token stored in the client side: local storage, caching, in memory);
            //     localStorage.removeItem('access-token');
            // }
            setLoading(false);
        });
        return () =>  unSubscribe();
    },[])



    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        googleProvider,
        signIn,
        logOut,
        googleLogin,
        updateUserData,
        setUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;