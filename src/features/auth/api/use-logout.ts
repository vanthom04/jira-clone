import { toast } from "sonner"
import { InferResponseType } from "hono"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]()

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Logged out")

      router.refresh()
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast.error("Failed to logout")
    }
  })
}
