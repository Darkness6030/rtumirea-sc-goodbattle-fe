import { createRouter, RouterProvider } from '@tanstack/react-router'

import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({ defaultViewTransition: true, routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export { App }
