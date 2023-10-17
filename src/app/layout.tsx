import { Providers } from '@/redux/provider'
import { Analytics } from '@vercel/analytics/react';
import './index.css'
import '../assets/Layout.css'
import ResponsiveAppBar from '@/component/Header/Header'
import ToastProvider from '@/component/Loader'
import Loader from '@/component/Loader/loader'

export const metadata = {
  title: 'Spiral Demo',
  description: 'Cretaed by Abhishek',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className='cls-background'>
        <Providers>
          <ToastProvider>
            <Loader />
            <ResponsiveAppBar />
            {children}
            <Analytics />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
