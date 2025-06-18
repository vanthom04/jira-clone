import { useMedia } from "react-use"

import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerTitle, DrawerContent } from "@/components/ui/drawer"

interface Props {
  open: boolean
  children: React.ReactNode
  onOpenChange: (open: boolean) => void
}

export const ResponsiveModal = ({ children, open, onOpenChange }: Props) => {
  const isDesktop = useMedia("(min-width: 1024px)", true)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          aria-describedby={undefined}
          className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]"
        >
          <DialogTitle className="sr-only">Modal</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent aria-describedby={undefined}>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          <DrawerTitle className="sr-only">Modal</DrawerTitle>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
