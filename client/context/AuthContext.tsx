import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/services/auth";

type User = {
  email: string;
  accessToken: string;
};

type SessionContextType = {
  user: User | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signin = async (email: string, password: string) => {
    try {
      const { access_token } = await login(email, password);

      const loggedInUser = {
        email,
        accessToken: access_token,
      };

      setUser(loggedInUser);
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error("Invalid email or password.");
    }
  };

  const signout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <SessionContext.Provider value={{ user, signin, signout, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
