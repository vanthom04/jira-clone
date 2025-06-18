import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"], 200>

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, form }) => {
      const response = await client.api.projects[":projectId"]["$patch"]({ param, form })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Project updated")

      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] })
    },
    onError: () => {
      toast.error("Failed to update project")
    }
  })
}
