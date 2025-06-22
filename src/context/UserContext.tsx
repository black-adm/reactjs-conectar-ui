import { createContext, useCallback, useState, type ReactNode } from 'react';
import type { GetUsersResponse, User, UserFilters } from '../@types/user';
import { UserService } from '../services/user';

interface UserContextData {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  setFilters: (filters: Partial<UserFilters>) => void;
  getUsers: (filters: UserFilters) => Promise<void>;
  clearError: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFiltersState] = useState<UserFilters>({
    role: undefined,
    sortBy: undefined,
    order: undefined,
    page: 1,
    limit: 10
  });

  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const setFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const getUsers = useCallback(async (filters: UserFilters) => {
    setLoading(true);
    setError(null);

    try {
      const requestFilters = {
        page: filters.page,
        limit: filters.limit,
        role: filters.role,
        sortBy: filters.sortBy,
        order: filters.order
      };

      const response: GetUsersResponse = await UserService.getUsers(requestFilters);

      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: UserContextData = {
    users,
    pagination,
    loading,
    error,
    filters,
    setFilters,
    getUsers,
    clearError,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

