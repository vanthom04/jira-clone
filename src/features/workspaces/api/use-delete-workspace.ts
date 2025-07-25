import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$delete"]>
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$delete"], 200>

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({ param })

      if (!response.ok) {
        throw new Error("Failed to delete workspace")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace deleted")
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
    },
    onError: () => {
      toast.error("Failed to delete workspace")
    }
  })
}
