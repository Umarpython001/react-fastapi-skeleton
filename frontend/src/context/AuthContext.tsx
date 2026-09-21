import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
        // On app load, check if there's a userId in localStorage
        // In a real app, we would fetch the full user profile from the API here
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            // We keep the user as null initially and let the Dashboard/Profile
            // fetch the details, or we could fetch them here to have them globally.
            // For now, we just signal that we have a session.
            console.log("AuthProvider: Found stored userId, session active.");
        }
        setIsLoading(false);
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
