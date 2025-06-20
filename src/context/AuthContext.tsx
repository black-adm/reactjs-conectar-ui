import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { SignInRequest } from '../@types/auth';
import type { User } from '../@types/user';
import { AuthService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  signedIn: boolean;
  loading: boolean;
  signIn: (data: SignInRequest) => Promise<void>;
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
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const signIn = async (data: SignInRequest) => {
    const response = await AuthService.signIn(data);

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));

    setUser(response.user);
  };

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      signedIn,
      loading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

