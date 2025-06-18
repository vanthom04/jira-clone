import {
  PlusIcon,
  CircleIcon,
  CircleDotIcon,
  CircleDashedIcon,
  CircleCheckIcon,
  CircleDotDashedIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { snakeCaseToTitleCase } from "@/lib/utils"

import { TaskStatus } from "../types"
import { useCreateTaskModal } from "../hooks/use-create-task-modal"

interface Props {
  board: TaskStatus
  taskCount: number
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.TODO]: (
    <CircleIcon className="size-[18px] text-red-400" />
  ),
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  )
}

export const KanbanColumnHeader = ({ board, taskCount }: Props) => {
  const { open } = useCreateTaskModal()

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {statusIconMap[board]}
        <h2 className="text-sm font-medium">
          {snakeCaseToTitleCase(board)}
        </h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button size="icon" variant="ghost" className="size-5" onClick={open}>
        <PlusIcon className="text-neutral-500" />
      </Button>
    </div>
  )
}
