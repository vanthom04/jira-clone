import Image from "next/image"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Props {
  name: string
  image?: string
  className?: string
  fallbackClassName?: string
}

export const ProjectAvatar = ({ name, image, className, fallbackClassName }: Props) => {
  if (image) {
    return (
      <div className={cn("size-5 relative rounded-md overflow-hidden", className)}>
        <Image fill src={image} alt={name} className="object-cover" />
      </div>
    )
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
          fallbackClassName
        )}
      >
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
