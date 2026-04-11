import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { fetchAuthUser } from '@/api'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/(app)')({
  beforeLoad: async () => {
    const user = await fetchAuthUser()
    useAuthStore.getState().setAuthState(user)

    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  return <Outlet />
}
