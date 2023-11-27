"use client";

import { Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading  from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
 
import { MembersColumn, columns } from "./columns";
import { Appointment, User as userRole} from "@prisma/client";
import { useEffect } from "react";
// import useUserRoleStore from "@/hooks/useUserRole";
// import AlertDemo from "@/components/UserInformation";

interface MembersClientProps {
  data: Appointment[]
  userRole: userRole
}
  
export const MembersClient: React.FC<MembersClientProps> = ({
  data,
  userRole
}) => {
  const router = useRouter();

  // const { roleUser, setRoleUser} = useUserRoleStore()

  // change the defualt Zustand Guest to the actual current userrole
  // useEffect(() => {
  //     setRoleUser(userRole.role);
  // }, [userRole, setRoleUser]);

  // const totalDonationsAmount = data.reduce((total, item) => {
  //   const donationsAmount = item.donations.reduce((donationTotal, donation) => {
  //       return donationTotal + donation.amount;
  //   }, 0);

  //   return total + donationsAmount;
  // }, 0);

  return  (
    <>
    {/*     <AlertDemo/> */}
    <div className="flex items-center justify-between">
    <Heading title={`Members `} subtitle={`Total Amount of Money £`} />
    {userRole.role === "ADMIN" && (
      <div className="flex flex-col gap-2 md:flex-row">
        <Button onClick={() => router.push(`/users`)} >
          <User className="mr-2 h-4 w-4" /> Manage User
        </Button>
        {/* as mongodb has to check through ObjectIDwhich has hex string with 12 bytes I used a random number insted of string */}
        <Button onClick={() => router.push(`/members/6512c326f323f44d75c5414d`)} >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
    )}
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    </>
  )
}
