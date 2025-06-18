import { LoaderIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { EditTaskForm } from "./edit-task-form"

import { useGetTask } from "../api/use-get-task"

interface Props {
  id: string
  onCancel: () => void
}

export const EditTaskFormWrapper = ({ id, onCancel }: Props) => {
  const workspaceId = useWorkspaceId()

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({ taskId: id })
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

  const isLoading = isLoadingMembers || isLoadingProjects || isLoadingTask

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <LoaderIcon className="size-5 text-muted-foreground animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!initialValues) {
    return null
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      initialValues={initialValues}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  )
}
