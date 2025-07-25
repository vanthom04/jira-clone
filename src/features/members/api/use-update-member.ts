import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"], 200>

export const useUpdateMember = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({ param, json })

      if (!response.ok) {
        throw new Error("Failed to update member")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Member updated")
      queryClient.invalidateQueries({ queryKey: ["members"] })
    },
    onError: () => {
      toast.error("Failed to update member")
    }
  })
}
