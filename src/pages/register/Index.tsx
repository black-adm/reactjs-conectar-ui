import logoImg from '../../assets/logo.png'

import { RegisterForm } from './Form'

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <a href="/login" className="flex justify-center items-center self-center">
              <img src={logoImg} alt="Logo da empresa Conéctar" />
            </a>
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-peach-main to-peach-light relative hidden lg:block" />
    </div>
  )
}