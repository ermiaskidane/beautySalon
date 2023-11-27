"use client";

import axios from "axios";
import React, { useState} from 'react'
import { toast } from "react-hot-toast";

import { MembersColumn } from './columns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BarChart4, Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
// import { AlertModal } from '@/components/Modal/alert-modal';
// import useMemberStore from "@/hooks/useUserRole";

interface CellActionProps {
  data: MembersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [userRole, setUserRole ] = useState("")

  // const { roleUser} = useMemberStore()

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/member/${data.id}`);
      toast.success('Member deleted.');
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
    {/* <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      /> */}
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
            onClick={() => router.push(`/${data.id}/chart`)}
          >
            <BarChart4 className="mr-2 h-4 w-4" /> BarChart
          </DropdownMenuItem>
          {/* {roleUser === "ADMIN" && ( */}
            <>
              <DropdownMenuItem
              // the long hex string is a random number I place inorder to create a new donation
              // otherwise it will go for update donation
                onClick={() =>  router.push(`/members/650eaede98613587b24e4d7b/donation?id=${data.id}` )}
              >
                <Copy className="mr-2 h-4 w-4" /> Add Donation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/members/${data.id}/donation`)}
              >
                <Copy className="mr-2 h-4 w-4" /> Update Donation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/members/${data.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" /> Update member
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete member
              </DropdownMenuItem>
            </>
          {/* )}  */}
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction