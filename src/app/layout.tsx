import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false // Disables automatic fallback font
})

export const metadata: Metadata = {
  title: 'AI Business Suite',
  description: 'AI-powered tools for your business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white">
        {/* Loading indicator (optional) */}
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50 opacity-0 animate-fade-out">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        {children}
        
        {/* Version watermark (optional) */}
        <div className="fixed bottom-4 right-4 text-xs text-gray-400">
          AI Suite v1.0
        </div>
      </body>
    </html>
  )
}
