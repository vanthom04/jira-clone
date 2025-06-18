"use client"

import Link from "next/link"
import { PencilIcon } from "lucide-react"

import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher"
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics"

import { Button } from "@/components/ui/button"
import { Analytics } from "@/components/analytics"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"

export const ProjectIdClient = () => {
  const projectId = useProjectId()

  const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId })
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({ projectId })

  if (isLoadingProject || isLoadingAnalytics) {
    return <PageLoader />
  }

  if (!project) {
    return <PageError message="Project not found" />
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
              <PencilIcon className="size-4" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
      {analytics ? (
        <Analytics data={analytics} />
      ) : null}
      <TaskViewSwitcher hideProjectFilter />
    </div>
  )
}
