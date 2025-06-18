import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.tasks["$post"]>
type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["$post"]({ json })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Task created")

      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] })
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] })
    },
    onError: () => {
      toast.error("Failed to create task")
    }
  })
}
