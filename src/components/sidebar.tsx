import Link from "next/link"
import Image from "next/image"

import { Projects } from "./projects"
import { Navigation } from "./navigation"
import { DottedSeparator } from "./dotted-separator"
import { WorkspaceSwitcher } from "./workspace-switcher"

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/" className="flex items-center gap-x-2">
        <Image width={48} height={48} src="/logo.svg" alt="logo" />
        <span className="text-3xl font-bold">Jira</span>
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  )
}
