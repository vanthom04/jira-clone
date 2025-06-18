import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>
type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspace = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces["$post"]({ form })

      if (!response.ok) {
        throw new Error("Failed to create workspace")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Workspace created")

      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
    onError: () => {
      toast.error("Failed to create workspace")
    }
  })
}
