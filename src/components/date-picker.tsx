"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface Props {
  value?: Date
  className?: string
  placeholder?: string
  onChange: (date: Date) => void
}

export const DatePicker = ({ value, className, onChange, placeholder = "Select date" }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="text-accent-foreground" />
          {value ? (
            format(value, "PPP")
          ) : (
            <span className="text-accent-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
        />
      </PopoverContent>
    </Popover>
  )
}
