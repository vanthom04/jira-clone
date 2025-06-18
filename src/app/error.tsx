"use client"

import Link from "next/link"
import { AlertTriangleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-4">
      <div className="flex flex-col items-center gap-y-2">
        <AlertTriangleIcon className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Something went wrong
        </p>
      </div>
      <Button size="sm" variant="secondary" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}

export default Error
