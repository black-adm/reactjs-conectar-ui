import {
  ClockIcon,
  CrownIcon,
  PencilSimpleIcon,
  User as UserIcon
} from "@phosphor-icons/react";

import { CalendarCheckIcon, DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { useUser } from "../../../hooks/useUsers";
import { DeleteUserAction } from "./Delete";

export function UsersTable() {
  const { users, loading, pagination } = useUser();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return 'Nenhum acesso recente.';

    const now = new Date();
    const loginDate = new Date(lastLogin);
    const diffInHours = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;

    return formatDate(lastLogin);
  };

  const getRoleBadge = (role: string) => {
    const isAdmin = role === 'admin';
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isAdmin
        ? 'bg-green-100 text-green-800'
        : 'bg-peach-light/20 text-peach-main'
        }`}>
        {isAdmin ? <CrownIcon className="size-3" /> : <UserIcon className="size-3" />}
        {isAdmin ? 'Admin' : 'Usuário'}
      </div>
    );
  };

  const getStatusDot = (lastLogin: string | null) => {
    if (!lastLogin) return 'bg-red-500';

    const now = new Date();
    const loginDate = new Date(lastLogin);
    const diffInHours = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) return 'bg-green-main';
    if (diffInHours < 168) return 'bg-peach-main'; // 7 dias
    return 'bg-gray-lighter';
  };

  if (loading) {
    return (
      <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-14 bg-gray-lighter border-b border-gray-200"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-100 bg-white"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-main">
          Usuários cadastrados ({pagination?.total || 0})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-light uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-light uppercase tracking-wider">
                Papel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-light uppercase tracking-wider">
                Último acesso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-light uppercase tracking-wider">
                Criado em
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-light uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="size-10 bg-gradient-to-br from-green-main to-green-light rounded-full flex items-center justify-center text-lg text-peach-main font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white ${getStatusDot(user.lastLoginAt)}`}></div>
                    </div>

                    <div>
                      <div className="font-medium text-gray-main">{user.name}</div>
                      <div className="text-sm text-gray-light flex items-center gap-2">
                        {user.email}
                        {user.googleId && (
                          <span className="text-xs bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full">
                            Google
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <ClockIcon className="size-4" />
                    {formatLastLogin(user.lastLoginAt)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <CalendarCheckIcon className="size-4" />
                    {formatDate(user.createdAt)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="relative">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="hover:bg-green-light"
                      onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                    >
                      <DotsThreeIcon className="size-5 text-gray-main" />
                    </Button>

                    {openDropdown === user.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenDropdown(null)}
                        />

                        <div className="absolute bg-white right-0 top-full mt-1 w-44 p-2 rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="w-full px-4 py-2 text-left text-sm text-gray-main hover:bg-green-light flex items-center gap-2"
                          >
                            <PencilSimpleIcon className="size-4" />
                            Editar usuário
                          </Button>

                          <DeleteUserAction userId={user.id} userFullName={user.name} />
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <UserIcon className="size-12 text-gray-lighter mx-auto mb-4" />

          <h3 className="text-lg font-medium text-gray-main mb-2">
            Nenhum usuário encontrado
          </h3>

          <p className="text-gray-light">
            Tente ajustar os filtros para encontrar outros usuários.
          </p>
        </div>
      )}
    </div>
  );
}