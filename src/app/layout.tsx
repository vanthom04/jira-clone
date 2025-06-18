import { type Metadata } from "next"
import { Inter } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/components/query-provider"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jira",
  description: "Connect every team, task, and project together with Jira",
  authors: [{ name: "vanthom04", url: "https://github.com/vanthom04" }],
  icons: [{ url: "/logo.svg" }]
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NuqsAdapter>
      <html lang="en">
        <body className={cn(inter.className, "antialiased min-h-screen")}>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </NuqsAdapter>
  )
}
