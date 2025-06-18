"use client"

import { useCallback } from "react"
import { useQueryState } from "nuqs"
import { LoaderIcon, PlusIcon } from "lucide-react"

import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { DataKanban } from "./data-kanban"
import { DataFilters } from "./data-filters"
import { DataCalendar } from "./data-calendar"

import { TaskStatus } from "../types"
import { useGetTasks } from "../api/use-get-tasks"
import { useTaskFilters } from "../hooks/use-task-filters"
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks"
import { useCreateTaskModal } from "../hooks/use-create-task-modal"

interface Props {
  hideProjectFilter?: boolean
}

export const TaskViewSwitcher = ({ hideProjectFilter }: Props) => {
  const paramProjectId = useProjectId()
  const workspaceId = useWorkspaceId()

  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters()
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table"
  })

  const { open } = useCreateTaskModal()
  const { mutate: bulkUpdate } = useBulkUpdateTasks()
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramProjectId || projectId,
    assigneeId,
    status,
    dueDate
  })

  const onKanbanChange = useCallback(
    (tasks: { $id: string, status: TaskStatus, position: number }[]) => {
      bulkUpdate({ json: { tasks } })
    },
    [bulkUpdate]
  )

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button
            size="sm"
            onClick={open}
            className="w-full lg:w-auto"
          >
            <PlusIcon />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable data={tasks?.documents ?? []} columns={columns} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban data={tasks?.documents ?? []} onChange={onKanbanChange} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
