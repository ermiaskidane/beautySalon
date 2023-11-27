import React from 'react'
import { MembersClient } from './components/client'
import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { User } from '@prisma/client'
// import Procedure from '@/components/sections/Procedure'
// import Appointment from '@/components/sections/Appointment'
// import { initialProfile } from '@/lib/initail-profile'

const AppointmentList = async () => {
  // const user = await initialProfile()
  // console.log("@@@@@@@@@@@@@", user)
  const currentuser: User | null = await currentProfile()
  const bookedAppointment = await db.appointment.findMany({
    // include:{
    //   donations: true
    // },
    orderBy: {
      createdAt: 'desc',
    }
  })

  console.log("£££££££££££££333", bookedAppointment)
    return (
      <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <h1>Hello who ever booked quest</h1>
        <MembersClient data={bookedAppointment} userRole={currentuser}/>
      </div>
    </div>
    )
}

export default AppointmentList