import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
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
  title: "Koushik Saha | Lead & Senior Full-Stack Software Engineer",
  description: "Koushik Saha — Senior Full-Stack Engineer building micro-frontend platforms at 1M+ MAU scale, with AWS & GCP certifications and peer-reviewed AI research.",
  alternates: {
    canonical: "https://www.koushiksaha.dev/",
  },
  openGraph: {
    title: "Koushik Saha — Full-Stack Software Engineer",
    description: "Koushik Saha — Senior Full-Stack Engineer building micro-frontend platforms at 1M+ MAU scale, with AWS & GCP certifications and peer-reviewed AI research.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.koushiksaha.dev/#person",
                  "name": "Koushik Saha",
                  "url": "https://www.koushiksaha.dev/",
                  "sameAs": [
                    "https://github.com/Koushik-Saha",
                    "https://www.linkedin.com/in/koushik-saha20/"
                  ],
                  "jobTitle": "Senior Full-Stack Software Engineer",
                  "knowsAbout": [
                    "React", "Next.js", "TypeScript", "Node.js", "Go", "AWS", "Google Cloud Platform", "Micro-frontend Architecture", "Module Federation", "AI RAG Systems", "Web Performance Optimization"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://www.koushiksaha.dev/#mindreframe",
                  "name": "MindReframe",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "All",
                  "browserRequirements": "Requires HTML5",
                  "author": { "@id": "https://www.koushiksaha.dev/#person" },
                  "description": "An AI-native progressive web application (PWA) incorporating in-memory prompt chains and LLM guardrails."
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://www.koushiksaha.dev/#groundfloor-react-ui",
                  "name": "@codemen/groundfloor-react-ui",
                  "applicationCategory": "DeveloperApplication",
                  "operatingSystem": "All",
                  "author": { "@id": "https://www.koushiksaha.dev/#person" },
                  "description": "An open-source React and TypeScript component library matching WCAG 2.1 AAA accessibility rules."
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#080808] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
