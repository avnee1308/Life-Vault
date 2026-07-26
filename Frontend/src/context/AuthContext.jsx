import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    // Restore authentication after page refresh
    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedUser) {

            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);

                localStorage.removeItem("user");
            }

        }

        setLoading(false);

    }, []);


    // Login
    const login = (userData, jwtToken) => {

        localStorage.setItem("token", jwtToken);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setToken(jwtToken);
        setUser(userData);

    };


    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );

}


export function useAuth() 
{
    return useContext(AuthContext);
}