"use client";

import { Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading  from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
 
import { CustomerColumn, columns } from "./columns";
import { Appointment, User as userRole} from "@prisma/client";
import { useEffect } from "react";
import useUserRoleStore from "@/hooks/useUser";
// import AlertDemo from "@/components/UserInformation";

interface CustomerClientProps {
  data: CustomerColumn[]
  userRole: userRole
}
  
export const CustomerClient: React.FC<CustomerClientProps> = ({
  data,
  userRole
}) => {
  const router = useRouter();

  const { roleUser, setRoleUser} = useUserRoleStore()

  // change the defualt Zustand Guest to the actual current userrole
  useEffect(() => {
      setRoleUser(userRole.role);
  }, [userRole, setRoleUser]);

  return  (
    <>
    {/* <div className="flex items-center justify-between"> */}
    <Heading title={`Clients (${data.length})`} subtitle="" />
    {/* </div> */}
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    </>
  )
}
