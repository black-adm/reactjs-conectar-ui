import logoImg from '../../assets/logo.png'

import { LoginForm } from './Form'

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="max-w-sm w-full flex flex-col gap-6">
        <a href="#" className="flex items-center self-center">
          <img src={logoImg} alt="Logo da empresa Conéctar" />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
