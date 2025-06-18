import Image from "next/image"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Props {
  name: string
  image?: string
  className?: string
}

export const WorkspaceAvatar = ({ name, image, className }: Props) => {
  if (image) {
    return (
      <div className={cn("size-10 relative rounded-md overflow-hidden", className)}>
        <Image fill src={image} alt={name} className="object-cover" />
      </div>
    )
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
