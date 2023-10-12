import { Providers } from '@/redux/provider'
import './index.css'
import '../assets/Layout.css'
import ResponsiveAppBar from '@/component/Header/Header'
import ToastProvider from '@/component/Loader'

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
            <ResponsiveAppBar />
            {children}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
