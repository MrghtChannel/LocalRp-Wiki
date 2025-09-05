import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/footer";
import { CopyHandler } from "@/components/copyhandler";
import "@/styles/globals.css";

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://local-rp-wiki.vercel.app"),
  title: "LocalRP Wiki — гайди, таблиці, вікіпедія",
  description:
    "LocalRP Wiki — вся інформація про LocalRP: гайди, таблиці, вікіпедія. Повна база знань для гравців LocalRP.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      uk: "/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://local-rp-wiki.vercel.app",
    title: "LocalRP Wiki — гайди, таблиці, вікіпедія",
    description:
      "LocalRP Wiki — вся інформація про LocalRP: гайди, таблиці, вікіпедія. Повна база знань для гравців LocalRP.",
    siteName: "LocalRP Wiki",
    locale: "uk_UA",
    images: [
      {
        url: "https://local-rp-wiki.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LocalRP Wiki — гайди, таблиці, вікіпедія",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalRP Wiki — гайди, таблиці, вікіпедія",
    description:
      "LocalRP Wiki — вся інформація про LocalRP: гайди, таблиці, вікіпедія. Повна база знань для гравців LocalRP.",
    images: ["https://local-rp-wiki.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${sansFont.variable} ${monoFont.variable} font-regular antialiased tracking-wide`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
            {children}
          </main>
          <Footer />
          <CopyHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
