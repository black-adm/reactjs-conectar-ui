import { TrashIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { Button } from "../../../components/Button";
import { useUser } from "../../../hooks/useUsers";
import { UserService } from "../../../services/user";

interface DeleteUserActionProps {
  userId: string;
  userFullName: string;
}

export function DeleteUserAction({ userId, userFullName }: DeleteUserActionProps) {
  const { filters, getUsers } = useUser();

  const handleDeleteUser = async () => {
    try {
      await UserService.deleteUser(userId);
      await getUsers(filters);
      toast.success(`O usuário ${userFullName} foi deletado com sucesso!`);
    } catch {
      toast.error(`Erro ao tentar deletar o usuário ${userFullName}`);
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-100 flex items-center gap-2"
      onClick={handleDeleteUser}
    >
      <TrashIcon className="size-4" />
      Excluir usuário
    </Button>
  )
}