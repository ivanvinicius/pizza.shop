import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Orders } from './pages/app/orders/orders'
import { SignUp } from './pages/auth/sign-up'
import { SignIn } from './pages/auth/sing-in'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  /* auth */
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-in', element: <SignIn /> },
    ],
  },

  /* dashboard */
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },

  /* catch all not found routes */
  {
    path: '*',
    element: <NotFound />,
  },
])
