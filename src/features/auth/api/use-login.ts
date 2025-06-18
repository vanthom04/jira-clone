import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>
type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json })

      if (!response.ok) {
        throw new Error("Failed to login")
      }

      return await response.json()
    },
    onSuccess: () => {
      router.refresh()
      toast.success("Logged in")
      queryClient.invalidateQueries({ queryKey: ["current"] })
    },
    onError: () => {
      toast.error("Failed to login")
    }
  })
}
