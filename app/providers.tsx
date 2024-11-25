'use client'

import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { DataProvider } from '@/providers/dataContext'
import { PumpsProvider } from '@/providers/pumpsContext'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <DataProvider>
          <PumpsProvider>{children}</PumpsProvider>
        </DataProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
