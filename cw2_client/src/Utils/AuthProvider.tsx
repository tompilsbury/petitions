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
    login(data: LoginType): void;
    logout(): void;
    isAdmin: boolean;
}

interface CustomJwtPayload extends JwtPayload {
    is_admin: boolean;
}

const AuthContext = createContext<ProviderProps>({
    token: '',
    login: () => {},
    logout: () => {},
    isAdmin: false,
});

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

    const login = async (data: LoginType): Promise<boolean> => {
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
            }
        } catch (error) {
            return false
        }
        return false
    };

    const logout = () => {
        setToken('');
        setIsAdmin(false);
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
