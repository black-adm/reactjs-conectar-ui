import { AppLayout } from "../../../components/Layout";
import { UserProvider } from "../../../context/UserContext";
import { ManagementPageContent } from "./Content";

export default function ManagementPage() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Administração e gerenciamento de usuários</h1>
        <p className="mt-2 text-gray-light">
          Gerencie todos os usuários do sistema, visualize informações e execute ações administrativas.
        </p>
      </div>

      <UserProvider>
        <ManagementPageContent />
      </UserProvider>
    </AppLayout>
  )
}