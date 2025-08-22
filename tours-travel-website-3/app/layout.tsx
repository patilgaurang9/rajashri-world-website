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
    default: "Rajashri World - Tours, Travel & Experiences in India",
    template: "%s | Rajashri World"
  },
  description: "Rajashri World offers curated tours, travel packages, and unique experiences across India. Discover, book, and explore with trusted guides and local expertise.",
  keywords: ["rajashri world", "tours", "travel", "india", "vacation", "booking", "experiences", "adventure", "cultural tours", "holiday"],
  authors: [{ name: "Rajashri World" }],
  creator: "Rajashri World",
  publisher: "Rajashri World",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rajashriworld.com'),
  alternates: {
    canonical: 'https://rajashriworld.com/',
  },
  openGraph: {
    title: "Rajashri World - Tours, Travel & Experiences in India",
    description: "Rajashri World offers curated tours, travel packages, and unique experiences across India.",
    url: 'https://rajashriworld.com',
    siteName: 'Rajashri World',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rajashri World - Tours & Travel',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajashri World - Tours, Travel & Experiences in India',
    description: 'Rajashri World offers curated tours, travel packages, and unique experiences across India.',
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
      <head>
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Rajashri World",
              "url": "https://rajashriworld.com",
              "logo": "https://rajashriworld.com/og-image.jpg",
              "description": "Rajashri World offers curated tours, travel packages, and unique experiences across India.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-1234567890",
                "contactType": "customer service"
              }
            }
          `}
        </Script>
      </head>
      <body className="bg-white text-gray-900 antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <PerformanceMonitor />
        <Script id="service-worker" strategy="afterInteractive">
          {`
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
          `}
        </Script>
      </body>
    </html>
  )
}
