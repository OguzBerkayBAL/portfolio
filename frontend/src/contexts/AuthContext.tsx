import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginDto } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginDto) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Backend kaldırıldı: demo amaçlı localStorage'tan basit oturum okuması
        const storedUser = localStorage.getItem('demo_user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginDto) => {
        // Backend yok: demo login. İstersen tamamen kaldırabiliriz.
        setIsLoading(true);
        const demoUser: User = {
            id: 'demo-user',
            username: credentials.usernameOrEmail,
            email: credentials.usernameOrEmail,
            firstName: 'Guest',
            lastName: 'User',
            role: 'admin' as any,
            status: 'active' as any,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        setUser(demoUser);
        setIsLoading(false);
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('demo_user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const isAuthenticated = !!user;

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 