import { useState } from "react"
import { PencilIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DottedSeparator } from "@/components/dotted-separator"

import { Task } from "../types"
import { useUpdateTask } from "../api/use-update-task"

interface Props {
  task: Task
}

export const TaskDescription = ({ task }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(task.description || "")

  const { mutate, isPending } = useUpdateTask()

  const handleSave = () => {
    mutate({
      param: { taskId: task.$id },
      json: { description: value }
    }, {
      onSuccess: () => {
        setIsEditing(false)
      }
    })
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button size="sm" variant="secondary" onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? <XIcon /> : <PencilIcon />}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            rows={4}
            value={value}
            disabled={isPending}
            placeholder="Add a description..."
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            size="sm"
            disabled={isPending}
            onClick={handleSave}
            className="w-fit ml-auto"
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">
              No description set
            </span>
          )}
        </div>
      )}
    </div>
  )
}
