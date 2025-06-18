import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$delete"]>
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$delete"], 200>

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[":taskId"]["$delete"]({ param })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Task deleted")

      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] })
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] })
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] })
    },
    onError: () => {
      toast.error("Failed to delete task")
    }
  })
}
