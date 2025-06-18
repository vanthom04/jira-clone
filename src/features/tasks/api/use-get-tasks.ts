import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

import { TaskStatus } from "../types"

interface Props {
  workspaceId: string
  search?: string | null
  projectId?: string | null
  status?: TaskStatus | null
  assigneeId?: string | null
  dueDate?: string | null
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  search,
  dueDate,
}: Props) => {
  return useQuery({
    queryKey: ["tasks", workspaceId, projectId, status, assigneeId, search, dueDate],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const { data } = await response.json()

      return data
    }
  })
}
