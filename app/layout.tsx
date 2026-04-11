import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { LanguageProvider } from './context/LanguageContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://romantico-apartamento.vercel.app'),
  title: 'Romántico Apartamento con Tina · Pital, San Carlos',
  description: 'Apartamento romántico con tina privada en Pital, San Carlos, Costa Rica. A 1.5 km del campo de girasoles. Superanfitrión. Reserva en Airbnb.',
  openGraph: {
    title: 'Romántico Apartamento con Tina · Pital, San Carlos',
    description: 'Escapada romántica con tina privada, WiFi, A/C y estacionamiento gratuito. Superanfitrión Johnny ★ 4.94 · 48 reseñas.',
    images: ['/assets/sala.webp'],
    type: 'website',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Preload hero image */}
        <link rel="preload" as="image" href="/assets/sala.webp" />
      </head>
      <body className="lang--es" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
