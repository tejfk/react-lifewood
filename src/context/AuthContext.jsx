import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// A list of allowed admin emails. For production, use Firebase custom claims.
const adminEmails = ['admin@lifewood.tech', 'jancinaljetjet@gmail.com'];

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        if (!adminEmails.includes(email)) {
            return Promise.reject(new Error("This email is not authorized for admin access."));
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setIsAdmin(user ? adminEmails.includes(user.email) : false);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isAdmin,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};