import { zodResolver } from '@hookform/resolvers/zod';
import { PencilSimpleIcon, SpinnerGapIcon, UserIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import type { User } from '../../../@types/user';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { useUser } from '../../../hooks/useUsers';
import { twMerge } from '../../../lib/utils';
import { UserService } from '../../../services/user';
import { updateUserDataSchema } from './schema';

interface UpdateUserActionProps {
  user: User;
}

export function UpdateUserAction({ user }: UpdateUserActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const { filters, getUsers } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof updateUserDataSchema>>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      role: user.role as "user" | "admin",
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      await UserService.updateUserData(user.id, data);
      await getUsers(filters);

      toast.success(`Usuário ${data.name} atualizado com sucesso.`);
      closeDialog();
    } catch {
      toast.error(`Erro ao tentar atualizar dados do usuário ${user.name}`);
    }
  });

  return (
    <div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="w-full px-4 py-2 text-left text-sm text-gray-main hover:bg-green-light flex items-center gap-2"
        onClick={openDialog}
      >
        <PencilSimpleIcon className="size-4" />
        Editar usuário
      </Button>

      {isOpen && (
        <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
            onClick={closeDialog}
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <form
                className="relative bg-white transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-xl"
                onSubmit={onSubmit}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:flex-col sm:items-start">
                    <div className='flex items-center mb-6'>
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-peach-light sm:mx-0 sm:size-10">
                        <UserIcon className='size-6 text-green-main' />
                      </div>

                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-base font-semibold" id="dialog-title">
                          Editar usuário {user.name}
                        </h3>

                        <div className="mt-2">
                          <p className="text-sm text-gray-light">
                            Altere as informações do usuário selecionado.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-md mx-auto w-full grid gap-6 my-4">
                      <div className="grid gap-3">
                        <label htmlFor="full-name">Nome completo</label>
                        <Input
                          id="full-name"
                          placeholder="Informe seu nome"
                          autoComplete="full-name"
                          autoCorrect="off"
                          autoCapitalize="off"
                          maxLength={100}
                          className={twMerge(
                            errors && errors.name && "border-red-500 focus-visible:ring-red-500"
                          )}
                          {...register("name")}
                        />
                      </div>
                      {errors && errors.name && (
                        <span className="text-sm text-red-500">{errors.name.message}</span>
                      )}

                      <div className="grid gap-3">
                        <label htmlFor="new-email">Email</label>
                        <Input
                          id="new-email"
                          type="email"
                          placeholder="Informe seu e-mail"
                          autoComplete="new-email"
                          autoCorrect="off"
                          autoCapitalize="off"
                          maxLength={100}
                          className={twMerge(
                            errors && errors.email && "border-red-500 focus-visible:ring-red-500"
                          )}
                          {...register("email")}
                        />
                      </div>
                      {errors && errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                      )}

                      <div className="grid gap-3">
                        <label className="block text-sm font-medium text-gray-main" htmlFor="role">
                          Função
                        </label>
                        <select
                          id="role"
                          className={twMerge(
                            "flex h-11 w-full rounded-lg border border-gray-lighter bg-transparent px-3 py-1 text-sm font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-light disabled:cursor-not-allowed disabled:opacity-50",
                            errors && errors.role && "border-red-500 focus-visible:ring-red-500"
                          )}
                          {...register("role")}
                        >
                          <option value="user">Usuário</option>
                          <option value="admin">Administrador</option>
                        </select>
                        {errors && errors.role && (
                          <span className="text-sm text-red-500">{errors.role.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white px-4 pt-4 pb-8 sm:flex sm:flex-row-reverse sm:gap-4 sm:px-6">
                  <Button type="submit">
                    {isSubmitting ? <SpinnerGapIcon className="size-6 animate-spin" /> : "Atualizar dados"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDialog}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};