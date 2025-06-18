import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics"

import { AnalyticsCard } from "@/components/analytics-card"
import { DottedSeparator } from "@/components/dotted-separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total Tasks"
            value={data.taskCount}
            increaseValue={data.taskDifference}
            variant={data.taskDifference > 0 ? "up" : "down"}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assigned Tasks"
            value={data.assignedTaskCount}
            increaseValue={data.assignedTaskDifference}
            variant={data.assignedTaskDifference > 0 ? "up" : "down"}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed Tasks"
            value={data.completedTaskCount}
            increaseValue={data.completedTaskDifference}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data.overdueTaskCount}
            increaseValue={data.overdueTaskDifference}
            variant={data.overdueTaskDifference > 0 ? "up" : "down"}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incomplete Tasks"
            value={data.incompleteTaskCount}
            increaseValue={data.incompleteTaskDifference}
            variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
