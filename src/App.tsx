import './globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '~/providers/theme-provider'

import { Toaster } from './components/ui/sonner'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider storageKey="pizza-shop-ui-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster richColors theme="light" />

        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  )
}
