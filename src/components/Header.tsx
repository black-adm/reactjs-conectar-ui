import { PowerIcon } from '@phosphor-icons/react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';

export function Header() {
  const { signOut } = useAuth();

  return (
    <header className="flex flex-col space-y-3 sticky top-0 shrink-0 z-10 border-b border-gray-200">
      <div className="flex justify-between items-center pt-2 pb-4 px-8 md:px-12 lg:max-w-6xl lg:w-full lg:mx-auto xl:px-0">
        <a href="/" className="pt-1.5 w-24">
          <img src={logoImg} alt="Logo da empresa Conéctar" />
        </a>

        <Button
          type='button'
          size="icon"
          variant="outline"
          className='rounded-full'
          onClick={() => signOut()}
        >
          <PowerIcon className='size-4' />
        </Button>
      </div>
    </header>
  )
}