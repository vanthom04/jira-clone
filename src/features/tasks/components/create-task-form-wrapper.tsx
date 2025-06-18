import { LoaderIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { CreateTaskForm } from "./create-task-form"

interface Props {
  onCancel: () => void
}

export const CreateTaskFormWrapper = ({ onCancel }: Props) => {
  const workspaceId = useWorkspaceId()

  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl
  }))

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name
  }))

  const isLoading = isLoadingMembers || isLoadingProjects

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <LoaderIcon className="size-5 text-muted-foreground animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  )
}
