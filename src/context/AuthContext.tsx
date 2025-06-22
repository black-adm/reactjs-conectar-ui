import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { SignInRequest, SignUpRequest } from '../@types/auth';
import type { User } from '../@types/user';
import { storageKeys } from '../config/storageKeys';
import { AuthService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  signedIn: boolean;
  loading: boolean;
  signIn: (data: SignInRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signedIn = !!user;

  useEffect(() => {
    const token = localStorage.getItem(storageKeys.accessToken);
    const userData = localStorage.getItem(storageKeys.loggedUser);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem(storageKeys.accessToken);
        localStorage.removeItem(storageKeys.loggedUser);
      }
    }

    setLoading(false);
  }, []);

  const signIn = async (data: SignInRequest) => {
    const response = await AuthService.signIn(data);

    const userData = await AuthService.getProfileData(response.accessToken);

    localStorage.setItem(storageKeys.accessToken, response.accessToken);
    localStorage.setItem(storageKeys.loggedUser, JSON.stringify(userData));

    setUser(response.user);
  };

  const signUp = async (data: SignUpRequest) => {
    await AuthService.signUp(data);

    const loginData: SignInRequest = {
      email: data.email,
      password: data.password
    };

    const response = await AuthService.signIn(loginData);

    localStorage.setItem(storageKeys.accessToken, response.accessToken);
    localStorage.setItem(storageKeys.loggedUser, JSON.stringify(response.user));

    setUser(response.user);
  };

  const signOut = () => {
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.loggedUser);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      signedIn,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

