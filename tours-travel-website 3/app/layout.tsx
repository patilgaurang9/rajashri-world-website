import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: {
    default: "Wanderlust Tours - Discover Amazing Destinations",
    template: "%s | Wanderlust Tours"
  },
  description: "Explore the world with our curated tours and travel experiences. Book your dream vacation today with expert guides and unforgettable adventures.",
  keywords: ["tours", "travel", "vacation", "booking", "destinations", "adventure", "luxury travel", "cultural tours"],
  authors: [{ name: "Wanderlust Tours" }],
  creator: "Wanderlust Tours",
  publisher: "Wanderlust Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wanderlust-tours.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Wanderlust Tours - Discover Amazing Destinations",
    description: "Explore the world with our curated tours and travel experiences.",
    url: 'https://wanderlust-tours.com',
    siteName: 'Wanderlust Tours',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wanderlust Tours - Discover the World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanderlust Tours - Discover Amazing Destinations',
    description: 'Explore the world with our curated tours and travel experiences.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  generator: 'Next.js'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <PerformanceMonitor />
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
