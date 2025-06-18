import { useRouter } from "next/navigation"
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react"

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { useConfirm } from "@/hooks/use-confirm"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"

import { useDeleteTask } from "../api/use-delete-task"
import { useEditTaskModal } from "../hooks/use-update-task-modal"

interface Props {
  id: string
  projectId: string
  children: React.ReactNode
}

export const TaskActions = ({ id, projectId, children }: Props) => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  const { open } = useEditTaskModal()

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive"
  )

  const { mutate, isPending } = useDeleteTask()

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      mutate({ param: { taskId: id } })
    }
  }

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
  }

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="stroke-2" />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="stroke-2" />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="stroke-2" />
            Edit task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="font-medium p-[10px] text-amber-700 focus:text-amber-700"
          >
            <TrashIcon className="stroke-2 text-amber-700" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
