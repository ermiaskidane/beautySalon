"use client";

import axios from "axios";
import React, { useState} from 'react'
import { toast } from "react-hot-toast";

import { CustomerColumn } from './columns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BarChart4, Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from "@/components/Modal/alert-modal";
// import { AlertModal } from '@/components/Modal/alert-modal';
import useUserStore from "@/hooks/useUser";

interface CellActionProps {
  data: CustomerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [userRole, setUserRole ] = useState("")

  const { roleUser} = useUserStore()

  const onConfirm = async () => {
    try {
      setLoading(true);
      // console.log("DASDDDDDDDDDDDDDD", data.id)
      await axios.delete(`/api/appointment/${data.id}`);
      toast.success('appointment deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  return(
    <>
    <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      {roleUser === "ADMIN" && (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete member
                </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
      )}
    </>
  )
}

export default CellAction