import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { Orders } from './pages/app/orders'
import { SignUp } from './pages/auth/sign-up'
import { SignIn } from './pages/auth/sing-in'

export const router = createBrowserRouter([
  /* auth */
  {
    element: <AuthLayout />,
    children: [
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-in', element: <SignIn /> },
    ],
  },

  /* dashboard */
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
])
