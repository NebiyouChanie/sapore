import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"
  
  interface ConfirmDialogProps {
    title: string
    description: string
    trigger: ReactNode
    actionLabel?: string
    cancelLabel?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    onConfirm: () => void
  }
  
  export function ConfirmDialog({
    title,
    description,
    trigger,
    actionLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "default",
    onConfirm,
  }: ConfirmDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className={
                variant === "destructive" ? "bg-destructive text-white hover:bg-destructive/90" : ""
              }
            >
              {actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  