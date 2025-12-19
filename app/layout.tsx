import React from 'react'
import './globals.css'
import Script from 'next/script'
import RouterProviderClient from './RouterProviderClient'

export const metadata = {
  title: 'ChatiFicial',
  description: 'ChatiFicial application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Load animation libraries used by the landing page after hydration to avoid hydration mismatch */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js" strategy="afterInteractive" />

        <RouterProviderClient>
          {children}
        </RouterProviderClient>
      </body>
    </html>
  )
}
