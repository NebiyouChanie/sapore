import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { Badge } from "@/components/ui/badge";

export interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numberOfGuests: number;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  message?: string;
}

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "numberOfGuests",
    header: "Guests",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const createdDate = new Date(row.original.date);
      if (isNaN(createdDate.getTime())) return "Invalid Date";
      const date = createdDate.getDate().toString().padStart(2, "0");
      const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
      const year = createdDate.getFullYear();
      return `${date}-${month}-${year}`;
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.original.message || "N/A";
      return message.length > 50 ? `${message.substring(0, 50)}...` : message;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

// StatusBadge Component
const StatusBadge = ({ status }: { status: "Pending" | "Confirmed" | "Cancelled" }) => {
  switch (status) {
    case "Confirmed":
      return <Badge variant="success">Confirmed</Badge>;
    case "Pending":
      return <Badge variant="warning">Pending</Badge>;
    case "Cancelled":
      return <Badge variant="destructive">Canceled</Badge>;
  }
};