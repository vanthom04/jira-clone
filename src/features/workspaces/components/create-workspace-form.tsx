"use client"

import { z } from "zod"
import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"

import { createWorkspaceSchema } from "../schemas"
import { useCreateWorkspace } from "../api/use-create-workspace"

interface Props {
  onCancel?: () => void
}

export const CreateWorkspaceForm = ({ onCancel }: Props) => {
  const router = useRouter()

  const { mutate, isPending } = useCreateWorkspace()

  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : ""
    }

    mutate({ form: finalValues }, {
      onSuccess: ({ data }) => {
        form.reset()
        router.push(`/workspaces/${data.$id}`)
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex px-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        spellCheck="false"
                        autoComplete="off"
                        disabled={isPending}
                        placeholder="Enter workspace name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            fill
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Logo"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max 1MB
                        </p>
                        <input
                          type="file"
                          ref={inputRef}
                          className="hidden"
                          disabled={isPending}
                          accept=".jpg, .png, .jpeg, .svg"
                          onChange={handleImageChange}
                        />
                        {field.value ? (
                          <Button
                            size="xs"
                            type="button"
                            disabled={isPending}
                            variant="destructive"
                            className="w-fit mt-2"
                            onClick={() => {
                              field.onChange(null)

                              if (inputRef.current) {
                                inputRef.current.value = ""
                              }
                            }}
                          >
                            Remove image
                          </Button>
                        ) : (
                          <Button
                            size="xs"
                            type="button"
                            variant="tertiary"
                            disabled={isPending}
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                size="lg"
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button size="lg" type="submit" disabled={isPending}>
                Create workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
