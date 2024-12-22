import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Yüklenme durumu

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false); // Kontrol tamamlandı
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>; // Yüklenme sırasında bir spinner veya boş alan gösterebilirsiniz
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
