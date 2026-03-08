"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

// Tipagem do usuário
interface User {
    name: string;
    email: string;
    role?: string;
    token?: string; // token gerado do env
}

// Tipagem do contexto
interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    loading: boolean;
}

// Props do provedor
interface AuthProviderProps {
    children: ReactNode;
}

// Criamos o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook customizado
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};

// Páginas públicas
const PUBLIC_PAGES = ["/", "/login", "/sobremin", "/chat"];

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Carrega usuário/token do localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            // Sempre valida o token com o do .env
            if (parsedUser.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
                setUser(parsedUser);
            } else {
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    // Protege páginas privadas
    useEffect(() => {
        if (!loading && !user && !PUBLIC_PAGES.includes(pathname)) {
            router.push("/login");
        }
    }, [user, loading, pathname, router]);

    // Função de login usando credenciais do .env
    const login = (username: string, password: string): boolean => {
        const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER; // ex: "admin"
        const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS; // ex: "1234"
        const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN; // token secreto

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            const newUser: User = {
                name: username,
                email: `${username}@example.com`,
                role: "admin",
                token: ADMIN_TOKEN,
            };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            router.push("/admin");
            return true; // login bem-sucedido
        }

        return false; // login falhou
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading || (!PUBLIC_PAGES.includes(pathname) && !user)) return <Loading />;

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};