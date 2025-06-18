import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, form }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({ param, form })

      if (!response.ok) {
        throw new Error("Failed to update workspace")
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace updated")

      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
    },
    onError: () => {
      toast.error("Failed to update workspace")
    }
  })
}
