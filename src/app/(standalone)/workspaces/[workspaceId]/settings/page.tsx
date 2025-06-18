import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/queries"

import { WorkspaceIdSettingsClient } from "./client"

const Page = async () => {
  const user = await getCurrent()

  if (!user) {
    redirect("/sign-in")
  }

  return <WorkspaceIdSettingsClient />
}

export default Page
