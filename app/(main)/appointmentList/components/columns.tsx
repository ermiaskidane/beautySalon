"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellAction from "./cell-action";

export type MembersColumn = {
  id: string;
  name: string;
  phone: string;
  email: string;
  amount: number;
  updatedAt: string;
  donations: {
    id: string;
    dtime: string;
    amount: number;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
}

// we alter the createdAt to updateAt cz on creation of the donation 
// we update the the member and on update the updateAt is only match with the current time
// so to see the latest time I had to go with updateAt

export const columns: ColumnDef<MembersColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
