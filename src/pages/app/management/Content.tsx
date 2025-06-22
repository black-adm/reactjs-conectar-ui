import { useEffect } from "react";
import { useUser } from "../../../hooks/useUsers";
import { ManagementUserFilters } from "./Filters";
import { Pagination } from "./Pagination";
import { UsersTable } from "./Table";

export function ManagementPageContent() {
  const {
    pagination,
    error,
    filters,
    setFilters,
    getUsers,
    clearError
  } = useUser();

  useEffect(() => {
    getUsers(filters);
  }, [filters, getUsers]);

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  return (
    <div className="space-y-6">
      <ManagementUserFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-700 font-medium">Erro</span>
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Dispensar
            </button>
          </div>
          <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <UsersTable />

        {pagination && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}