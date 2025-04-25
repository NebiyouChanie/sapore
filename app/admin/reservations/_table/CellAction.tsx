 "use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, Edit, MoreHorizontal, Trash2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Reservation } from "./Column";

interface CellActionProps {
  data: Reservation;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   
  const router = useRouter();

  // Delete functionality
  const onDelete = async () => {
    try {
       
      const response = await fetch(`/api/reservations/${data.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete reservation");
      toast.success("Reservation deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("~ onDelete ~ error:", error)
      toast.error("Something went wrong");
    }  
  };

  // Confirm functionality
const onConfirm = async () => {
  try {
    const response = await fetch(`/api/reservations/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Confirmed" }),
    });
    if (!response.ok) throw new Error("Failed to confirm reservation");
    toast.success("Reservation confirmed");
    window.location.reload();
  } catch (error) {
    console.log("~ onConfirm ~ error:", error)
    toast.error("Something went wrong");
  }
};

// Cancel functionality
const onCancel = async () => {
  try {
    const response = await fetch(`/api/reservations/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Cancelled" }),
    });
    if (!response.ok) throw new Error("Failed to cancel reservation");
    toast.success("Reservation cancelled.");
    window.location.reload();
  } catch (error) {
    console.log("~ onCancel ~ error:", error)
    toast.error("Something went wrong");
  }
};


  const Delete = async () => {
    await onDelete();
  };

  return (
    <>
     
    <ConfirmDialog
      title="Delete Reservation"
      description={`Are you sure you want to delete this reservation?`}
      variant="destructive"
      actionLabel="Delete"
      onConfirm={Delete}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      }
    />

      {/* Dropdown Menu for Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Update Reservation */}
          <DropdownMenuItem
            onClick={() => router.push(`/admin/reservations/${data.id}/update`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>

          {/* Confirm Reservation */}
          <DropdownMenuItem onClick={onConfirm}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm
          </DropdownMenuItem>

          {/* Cancel Reservation */}
          <DropdownMenuItem onClick={onCancel}>
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
