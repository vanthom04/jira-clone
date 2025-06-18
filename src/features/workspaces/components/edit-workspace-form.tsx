"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
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

import { Workspace } from "../types"
import { updateWorkspaceSchema } from "../schemas"
import { useUpdateWorkspace } from "../api/use-update-workspace"
import { useDeleteWorkspace } from "../api/use-delete-workspace"
import { useResetInviteCode } from "../api/use-reset-invite-code"

interface Props {
  onCancel?: () => void
  initialValues: Workspace
}

export const EditWorkspaceForm = ({ initialValues, onCancel }: Props) => {
  const router = useRouter()

  const { mutate: updateWorkspace, isPending } = useUpdateWorkspace()
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } = useDeleteWorkspace()
  const { mutate: resetInviteCode, isPending: isResettingInviteCode } = useResetInviteCode()

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action cannot be undone.",
    "destructive"
  )

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite link",
    "This will invalidate the current invite link.",
    "destructive"
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? ""
    }
  })

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    updateWorkspace({
      form: values,
      param: {
        workspaceId: initialValues.$id
      }
    })
  }

  const handleResetInviteCode = async () => {
    const ok = await confirmReset()

    if (ok) {
      resetInviteCode({
        param: { workspaceId: initialValues.$id }
      })
    }
  }

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (ok) {
      deleteWorkspace({ param: { workspaceId: initialValues.$id } }, {
        onSuccess: () => {
          window.location.href = "/"
        }
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }

  const fullInviteLink =
    `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied to clipboard"))
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ResetDialog />
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 px-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}
          >
            <ArrowLeftIcon />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
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
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="px-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  variant="secondary"
                  className="size-12"
                  onClick={handleCopyInviteLink}
                >
                  <CopyIcon className="size-5 text-neutral-600" />
                </Button>
              </div>
            </div>
            <DottedSeparator className="mt-6" />
            <Button
              size="sm"
              type="button"
              variant="destructive"
              className="mt-6 w-fit ml-auto"
              onClick={handleResetInviteCode}
              disabled={isPending || isResettingInviteCode}
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="px-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all associated data.
            </p>
            <DottedSeparator className="mt-6" />
            <Button
              size="sm"
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isDeletingWorkspace}
            >
              Delete workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
