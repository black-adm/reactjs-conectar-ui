import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <main>
        <div className="flex flex-col items-center space-y-1.5 py-6">
          <h2 className="text-2xl font-semibold">Acesso interno</h2>
          <p className="text-gray-light text-center truncate">
            Entre com o google ou insira suas credenciais de acesso.
          </p>
        </div>
        <div>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login com o Google
                </Button>
              </div>
              <div className="after:border-gray-lighter relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-white text-gray-light relative z-10 px-4">
                  Ou continue com
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Informe seu e-mail"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="password">Senha</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </div>
              <div className="text-center text-sm">
                Não possui uma conta?{" "}
                <a href="#" className="text-peach-main underline underline-offset-4 hover:text-green-main">
                  Cadastrar
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
