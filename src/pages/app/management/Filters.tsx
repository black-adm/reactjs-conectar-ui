import { ArrowsClockwiseIcon, FunnelIcon } from "@phosphor-icons/react";
import type { UserFilters } from "../../../@types/user";
import { Button } from "../../../components/Button";
import { useUser } from "../../../hooks/useUsers";

interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
}

export function ManagementUserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  const { getUsers } = useUser();

  const defaultFilters = {
    page: 1,
    limit: 10,
    role: undefined,
    sortBy: undefined,
    order: undefined
  };

  const handleRefreshData = async () => {
    return await getUsers(defaultFilters);
  }

  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-4">
        <FunnelIcon className="size-5 text-gray-main" />
        <h3 className="text-lg text-gray-main font-semibold">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-main mb-2">
            Papel
          </label>
          <select
            className="flex h-11 w-full rounded-lg border border-gray-lighter bg-transparent px-3 py-1 text-sm font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-light disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.role || 'all'}
            onChange={(e) => {
              const value = e.target.value;
              onFiltersChange({ role: value === 'all' ? undefined : value as 'admin' | 'user' });
            }}
          >
            <option value="all">Todos</option>
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-main mb-2">
            Ordenar por
          </label>
          <select
            className="flex h-11 w-full rounded-lg border border-gray-lighter bg-transparent px-3 py-1 text-sm font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-light disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.sortBy || 'name'}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as 'name' | 'createdAt' })}
          >
            <option value="name">Nome</option>
            <option value="createdAt">Data de criação</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-main mb-2">
            Ordem
          </label>
          <select
            className="flex h-11 w-full rounded-lg border border-gray-lighter bg-transparent px-3 py-1 text-sm font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-light disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.order || 'asc'}
            onChange={(e) => onFiltersChange({ order: e.target.value as 'asc' | 'desc' })}
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>

        <div className="flex justify-center items-center mt-6">
          <Button
            type="button"
            className="flex items-center gap-2 disabled:bg-transparent disabled:shadow-none disabled:text-gray-light"
            onClick={handleRefreshData}
            disabled={!filters.sortBy || !filters.role}
          >
            <ArrowsClockwiseIcon className="size-5" />
            Reoordenar
          </Button>
        </div>
      </div>
    </div>
  );
}