import '@/styles/globals.css'
import '@fontsource/roboto'
import 'katex/dist/katex.min.css'
import { Metadata, Viewport } from 'next'

import { Navbar } from '@/components/navbar'
import { siteConfig } from '@/config/site'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/fuel.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow px-6 py-8 md:pt-16">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
