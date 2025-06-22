import { AppLayout } from "../../../components/Layout";
import { useAuth } from "../../../hooks/useAuth";
import { UserAccountInfo } from "./Account";
import { UserProfile } from "./Profile";
import { UserUpdate } from "./Update";

export default function HomePage() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <AppLayout>
      <div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Dados da sua conta
            </h1>
            <p className="text-gray-light">
              Gerencie as informações da sua conta e preferências.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <UserProfile user={user} />
            <div className="lg:col-span-2 space-y-6">
              <UserAccountInfo user={user} />
              <UserUpdate user={user} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}