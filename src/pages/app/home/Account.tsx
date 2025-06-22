import type { User } from "../../../@types/user";

interface UserAccountInfoProps {
  user: User;
}

export function UserAccountInfo({ user }: UserAccountInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Data inválida";

    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
      <h3 className="text-xl font-semibold mb-6">
        Informações da minha conta
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-light mb-1">
            Nome completo
          </p>
          <p className="text-lg">{user.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-light mb-1">
            Endereço de e-mail
          </p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-light mb-1">
            Criado em
          </p>
          <p className="text-lg">
            {formatDate(user?.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-light mb-1">
            Último acesso
          </p>
          <p className="text-lg">
            {formatDate(user.lastLoginAt)}
          </p>
        </div>
      </div>
    </div>
  )
}