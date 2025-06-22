import type { ReactNode } from "react";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="grid grid-cols-1">
        <Header />
        <main className="min-h-svh w-full py-12 px-6 md:border-x md:border-gray-200 lg:max-w-6xl lg:w-full lg:mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}