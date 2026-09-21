import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/api'


// Define the shape of the User profile
interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    level: number;
    age: number;
    matric_no?: string;
    unique_user_id?: string;
}

// Define the shape of the Context state
interface AuthContextType {
    user: User | null; // The User object itself
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // Used for state chenge to change user
    login: (userData: User) => void; //Used to store user id locally with local storage
    logout: () => void; //Deletes the user id from local storage
    isLoading: boolean; //Wait for the app to load the user (check if logged in or logged out)
}

// Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The Provider component that wraps the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedUserId = localStorage.getItem('userId');

                if (storedUserId) {
                    console.log("Stored user ID found, fetching profile...", storedUserId);
                    const url_to_get_user = `http://127.0.0.1:8000/api/students/students/${storedUserId}`;
                    const response = await api.get(url_to_get_user);

                    console.log("User profile fetched successfully:", response.data);
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Session recovery failed:", error);
                localStorage.removeItem('userId');
            } finally {
                // Critical: only set loading to false AFTER the fetch is attempted
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('userId', userData.id.toString());
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access to the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
