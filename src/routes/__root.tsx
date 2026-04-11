import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

import Logo from '@/assets/logo.svg?react'
import { Header } from '@/components/header'
import { Typography } from '@/components/ui'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen w-screen flex-col gap-4 px-4 max-lg:hidden">
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </div>

      <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 p-8 text-center lg:hidden">
        <Logo className="size-20" />
        <div className="flex flex-col items-center gap-2">
          <Typography variant="h2">Платформа недоступна</Typography>
          <Typography className="max-w-xs" variant="muted">
            Good Battle можно использовать только в&nbsp;десктопной версии
            браузера. Пожалуйста, откройте сайт на&nbsp;компьютере.
          </Typography>
        </div>
      </div>

      <Toaster />
    </>
  ),
})
