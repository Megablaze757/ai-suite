// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'

// Font definitions
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'MyAI Suite - AI Tools for Business',
  description: 'Powered by DeepSeek and Open-Source AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-gray-50 antialiased">
        {/* Brand-colored loading indicator */}
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50 opacity-0 animate-fade-out">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
        
        {children}

        {/* Brand watermark */}
        <div className="fixed bottom-4 right-4 text-xs text-gray-400">
          MyAI Suite v1.0
        </div>
      </body>
    </html>
  )
}