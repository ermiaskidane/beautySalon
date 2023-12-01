"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellAction from "./cell-action";
import { currentProfile } from "@/lib/current-profile";
import { User } from "@prisma/client";


export type CustomerColumn = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  // createdAt: string;
  // donations: {
  //   id: string;
  //   dtime: string;
  //   amount: number;
  //   memberId: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  // }[]
}

// we alter the createdAt to updateAt cz on creation of the donation 
// we update the the member and on update the updateAt is only match with the current time
// so to see the latest time I had to go with updateAt


export const columns: ColumnDef<CustomerColumn>[] = [
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
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "appointmentDate",
    // header: "AppointmentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          AppointmentDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "appointmentTime",
    header: "AppointmentTime",
  },
  {
    accessorKey: "notes",
    header: "notes",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
