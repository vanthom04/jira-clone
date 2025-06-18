"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card"

import { useInviteCode } from "../hooks/use-invite-code"
import { useWorkspaceId } from "../hooks/use-workspace-id"
import { useJoinWorkspace } from "../api/use-join-workspace"

interface Props {
  initialValues: {
    name: string
  }
}

export const JoinWorkspaceForm = ({ initialValues }: Props) => {
  const router = useRouter()
  const inviteCode = useInviteCode()
  const workspaceId = useWorkspaceId()

  const { mutate, isPending } = useJoinWorkspace()

  const onSubmit = () => {
    mutate({
      param: { workspaceId },
      json: { code: inviteCode }
    }, {
      onSuccess: ({ data }) => {
        router.push(`/workspaces/${data.$id}`)
      }
    })
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="px-7">
        <CardTitle className="text-xl font-bold">
          Join workspace
        </CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong> workspace
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          <Button
            asChild
            size="lg"
            type="button"
            variant="secondary"
            disabled={isPending}
            className="w-full lg:w-fit"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            type="button"
            disabled={isPending}
            className="w-full lg:w-fit"
            onClick={onSubmit}
          >
            Join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
