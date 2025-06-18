import Link from "next/link"
import Image from "next/image"

import { UserButton } from "@/features/auth/components/user-button"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/" className="flex items-center gap-x-2">
            <Image width={48} height={48} src="/logo.svg" alt="logo" />
            <span className="text-3xl font-bold">Jira</span>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout
