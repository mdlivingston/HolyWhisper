import React, { useContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

const AuthContext = React.createContext()

export function useAuth()
{
    return useContext(AuthContext)
}

export function AuthProvider({ children })
{
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login()
    {
        return auth().signInAnonymously()
    }

    // Upgrades the current anonymous user to a permanent email/password
    // account. The UID stays the same, so all Firestore data is preserved.
    async function createAccount(email, password)
    {
        const credential = auth.EmailAuthProvider.credential(email, password)
        const result = await auth().currentUser.linkWithCredential(credential)
        setCurrentUser(auth().currentUser)
        return result
    }

    // Signs into an existing account (e.g. on a new device). The anonymous
    // session on this device is replaced by the existing account's UID.
    function signIn(email, password)
    {
        return auth().signInWithEmailAndPassword(email, password)
    }

    function resetPassword(email)
    {
        return auth().sendPasswordResetEmail(email)
    }

    function logout()
    {
        return auth().signOut()
    }

    useEffect(() =>
    {
        const unsubscribe = auth().onAuthStateChanged(user =>
        {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        createAccount,
        signIn,
        resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>


    )
}
