import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthResponse, LoginDto } from '../types';
import apiService from '../services/api';

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
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                const userData = await apiService.getProfile();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginDto) => {
        try {
            setIsLoading(true);
            const authResponse: AuthResponse = await apiService.login(credentials);

            // Store tokens
            localStorage.setItem('access_token', authResponse.tokens.access_token);
            if (authResponse.tokens.refresh_token) {
                localStorage.setItem('refresh_token', authResponse.tokens.refresh_token);
            }

            setUser(authResponse.user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await apiService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
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