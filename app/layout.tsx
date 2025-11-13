import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://posada-32e4e.web.app'),
  title: "Techno Posada 2024 | Fiesta Electrónica Navideña",
  description: "🎄✨ Únete a la Techno Posada más épica del año. 19 de diciembre en Zapopan, JAL. Música electrónica, hospedaje disponible y tour de tequila. Una experiencia única que mezcla la tradición navideña con beats futuristas. ¡Confirma tu asistencia ahora!",
  keywords: "techno posada, fiesta electrónica, navidad 2024, zapopan, música techno, fiesta navideña, evento electrónico, posada techno",
  authors: [{ name: "Zajid Campos" }],
  openGraph: {
    title: "Techno Posada 2024 | La Fiesta Navideña del Futuro",
    description: "🎅🎧 Vive la posada más techno del año. 19 de diciembre • 20:00 hrs • Zapopan, JAL. Hospedaje + Tour de Tequila disponible.",
    type: "website",
    locale: "es_MX",
    siteName: "Techno Posada 2024",
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Techno Posada 2024 - Fiesta Electrónica Navideña',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techno Posada 2024 | Fiesta Electrónica Navideña",
    description: "🎄 La posada más techno del año. 19 de diciembre en Zapopan. Música electrónica + hospedaje + tour de tequila.",
    images: ['/opengraph-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
