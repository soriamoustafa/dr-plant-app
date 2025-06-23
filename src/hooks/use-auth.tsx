import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { clearCart } from "@/api/cartApi"; 
type User = {
  displayName: string;
  email: string;
  token: string;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  displayName: string;
  email: string;
  phone: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkEmailExists: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
};

const BASE_URL="https://localhost:7019"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    axios
      .get(`${BASE_URL}/api/Account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        localStorage.removeItem("token");
      });
  }
}, []);

  async function login(data: LoginData) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/Account/login`, data);
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.data.displayName}!`,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      toast({
        title: "Login failed",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await axios.get(`${BASE_URL}/api/Account/emailexists`, {
        params: { email },
      });
      return response.data === true;
    } catch (error) {
      console.error("Failed to check email existence", error);
      return false;
    }
  }

  async function register(data: RegisterData) {
    setIsLoading(true);
    setError(null);
    try {
      const emailExists = await checkEmailExists(data.email);
      if (emailExists){
        toast({
          title:"Email already in use",
          description:"an account with this email already exists",
          variant:"destructive",
        })
        setIsLoading(false);
        return;
      }
      const response = await axios.post(`${BASE_URL}/api/Account/register`, data);
      setUser(response.data);
      toast({
        title: "Registration successful",
        description: `Welcome, ${response.data.displayName}!`,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      toast({
        title: "Registration failed",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
  }

  return (
    <AuthContext.Provider value={{ user, login ,checkEmailExists, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
