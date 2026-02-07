import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            setUser({ username: 'AdminUser' }); 
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
            username,
            password
            });

            const { token } = response.data;
            if (token) {
            setToken(token);
            return { success: true, token: token };
            }
        } catch (error) {
            let errorMsg = "Credenciales incorrectas o error de servidor";
            
            if (error.response) {
            if (error.response.status === 401) errorMsg = "Username or password is incorrect";
            if (error.response.status === 500) errorMsg = "Internal Error: Server cannot process the request";
            }
            
            return { success: false, message: errorMsg };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};