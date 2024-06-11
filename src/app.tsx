import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '~/providers/theme-provider'

import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider storageKey="pizza-shop-ui-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster richColors theme="light" />

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}
