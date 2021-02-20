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

    function logout()
    {
        return auth.signOut()
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
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>


    )
}
