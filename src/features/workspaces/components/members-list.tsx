"use client"

import Link from "next/link"
import { Fragment } from "react"
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react"

import { MemberRole } from "@/features/members/types"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { useUpdateMember } from "@/features/members/api/use-update-member"
import { useDeleteMember } from "@/features/members/api/use-delete-member"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { Separator } from "@/components/ui/separator"
import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"

export const MembersList = () => {
  const workspaceId = useWorkspaceId()

  const [ConfirmDialog, confirm] = useConfirm(
    "Remove member",
    "This member will be removed from the workspace.",
    "destructive"
  )

  const { data } = useGetMembers({ workspaceId })
  const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember()
  const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember()

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId }
    })
  }

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm()

    if (ok) {
      deleteMember({ param: { memberId } }, {
        onSuccess: () => {
          window.location.reload()
        }
      })
    }
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 px-7">
        <Button size="sm" variant="secondary" asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">
          Members List
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                name={member.name}
                className="size-10"
                fallbackClassName="text-lg"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="ml-auto"
                  >
                    <MoreVerticalIcon className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    disabled={isUpdatingMember}
                    onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                  >
                    Set as Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    disabled={isUpdatingMember}
                    onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                  >
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={isDeletingMember}
                    onClick={() => handleDeleteMember(member.$id)}
                    className="font-medium text-amber-700 hover:text-amber-700"
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}
