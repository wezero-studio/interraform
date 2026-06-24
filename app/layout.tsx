import type { Metadata } from 'next'
import './globals.css'
import PageLoader from '@/components/PageLoader'
import SmoothScroller from '@/components/SmoothScroller'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://interraform.pages.dev'

export const metadata: Metadata = {
  title: 'InterraForm | Workspace Design & Construction',
  description:
    'Interraform designs and builds modern workspaces, offices, and commercial interiors that improve productivity, efficiency, and business environment through strategic design and complete project execution.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'InterraForm | Workspace Design & Construction',
    description:
      'Interraform designs and builds modern workspaces, offices, and commercial interiors that improve productivity, efficiency, and business environment.',
    siteName: 'InterraForm',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'InterraForm — Workspace Design & Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InterraForm | Workspace Design & Construction',
    description:
      'Interraform designs and builds modern workspaces, offices, and commercial interiors.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroller>
          <PageLoader />
          <div id="page-content">
            {children}
          </div>
        </SmoothScroller>
      </body>
    </html>
  )
}
