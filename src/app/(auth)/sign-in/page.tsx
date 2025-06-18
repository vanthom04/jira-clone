import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/queries"
import { SignInCard } from "@/features/auth/components/sign-in-card"

const Page = async () => {
  const user = await getCurrent()

  if (user) {
    return redirect("/")
  }

  return <SignInCard />
}

export default Page
