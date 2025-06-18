import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/queries"
import { SignUpCard } from "@/features/auth/components/sign-up-card"

const Page = async () => {
  const user = await getCurrent()

  if (user) {
    return redirect("/")
  }

  return <SignUpCard />
}

export default Page
