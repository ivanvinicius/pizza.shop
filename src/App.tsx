import './globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from './components/ui/sonner'
import { router } from './router'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza Shop" />
      <Toaster richColors theme="light" />

      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
