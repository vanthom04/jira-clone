"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon, MoreVertical } from "lucide-react"

import { MemberAvatar } from "@/features/members/components/member-avatar"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { snakeCaseToTitleCase } from "@/lib/utils"

import { TaskDate } from "./task-date"
import { TaskActions } from "./task-actions"

import { Task } from "../types"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task name
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name

      return <p className="line-clamp-1">{name}</p>
    }
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const project = row.original.project

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-6 rounded"
            fallbackClassName="rounded"
          />
          <p className="line-clamp-1">{project.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={assignee.name}
          />
          <p className="line-clamp-1">{assignee.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due date
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate

      return <TaskDate value={dueDate} />
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status

      return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>
    }
  },
  {
    accessorKey: "actions",
    header: () => <span />,
    cell: ({ row }) => {
      const id = row.original.$id
      const projectId = row.original.projectId

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical />
          </Button>
        </TaskActions>
      )
    }
  }
]
