"use client"

import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetTitle, SheetTrigger, SheetContent } from "@/components/ui/sheet"

import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <MenuIcon className="text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="sr-only">Mobile Sidebar</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
