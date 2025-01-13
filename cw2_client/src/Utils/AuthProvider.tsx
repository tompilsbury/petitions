import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { validateUser } from "./Requests";
import { jwtDecode, JwtPayload } from "jwt-decode";

type LoginType = {
    email: string;
    password: string;
};

interface ProviderProps {
    token: string;
    login(data: LoginType): Promise<boolean | LoginError>;
    logout(): void;
    isAdmin: boolean;
}

interface CustomJwtPayload extends JwtPayload {
    is_admin: boolean;
}

interface LoginError {
    status: number,
    message: string
}

const defaultAuthContext: ProviderProps = {
    token: '',
    login: async () => {
        return { status: 500, message: 'Not implemented' }; 
    },
    logout: () => {},
    isAdmin: false,
};


const AuthContext = createContext<ProviderProps>(defaultAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedToken = localStorage.getItem('token') || '';
    const [token, setToken] = useState(storedToken);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decoded: CustomJwtPayload = jwtDecode(token);
                setIsAdmin(decoded.is_admin);
            } catch (error) {
                console.error("Invalid token:", error);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, [token]);

    const login = async (data: LoginType): Promise<boolean | LoginError> => {
        try {
            const response = await validateUser(data);
            console.log("Login Response:", response);
    
            if (response?.status === 200) {
                const data = response.data;
                setToken(data.token);
                localStorage.setItem("token", data.token);
    
                const decoded: CustomJwtPayload = jwtDecode(data.token);
                setIsAdmin(decoded.is_admin);
                navigate('/dashboard');
                
                return true;
            } else {
                const error: LoginError = {
                    status: response?.status || 500,
                    message: response?.data?.message || 'Login failed',
                };
                return error;
            }
        } catch (error: any) {
            console.error("Error during login:", error);
                const loginError: LoginError = {
                status: 500,
                message: 'Unexpected error during login',
            };
            return loginError;
        }
    };
    
    
    const logout = () => {
        setToken('');
        setIsAdmin(false);
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, login , logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
