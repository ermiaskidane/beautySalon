import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/providers/toast-provider'
import ModalProvider from '@/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider/>
          <ModalProvider />
          <Navbar/>
            {children}
          <Footer/>
          </body>
      </html>
    </ClerkProvider>
  )
}
