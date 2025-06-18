"use client"

import { ResponsiveModal } from "@/components/responsive-modal"

import { CreateTaskFormWrapper } from "./create-task-form-wrapper"

import { useCreateTaskModal } from "../hooks/use-create-task-modal"

export const CreateTaskModal = () => {
  const { isOpen, close, setIsOpen } = useCreateTaskModal()

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  )
}
