import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.tasks[":taskId"]["$patch"]({ param, json })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Task updated")

      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] })
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] })
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] })
    },
    onError: () => {
      toast.error("Failed to update task")
    }
  })
}
