import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>
type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({ param })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted")

      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] })
    },
    onError: () => {
      toast.error("Failed to delete project")
    }
  })
}
