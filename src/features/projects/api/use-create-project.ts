import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.projects["$post"]>
type ResponseType = InferResponseType<typeof client.api.projects["$post"], 201>

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects["$post"]({ form })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Project created")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast.error("Failed to create project")
    }
  })
}
