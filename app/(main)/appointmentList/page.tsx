import React from 'react'
import { MembersClient } from './components/client'
import { format, parseISO } from "date-fns";
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

  // Function to check if a given appointment is in the past
const isAppointmentInPast = (bookedAppointment) => {
  const currentDate = new Date();
  const appointmentDateTime = new Date(`${bookedAppointment.appointmentDate}T${bookedAppointment.appointmentTime}:00`);
  return appointmentDateTime < currentDate;
};

// Filter out appointments that are in the past
const upcomingAppointments = bookedAppointment.filter((appointment) => !isAppointmentInPast(appointment));

// const formattedAppointments = upcomingAppointments.map((item) => ({
//   id: item.id,
//   name: item.name,
//   phone: item.phone,
//   email: item.email,
//   service: item. service,
//   appointmentDate: format(parseISO(item.appointmentDate), "MMMM do, yyyy"),
//   appointmentTime: item.appointmentTime,
//   notes: item.notes
// }))

// console.log("££EEFRWEQWEFDSFSD", formattedAppointments)

  // console.log(upcomingAppointments);

  // console.log("£££££££££££££333", bookedAppointment)
    return (
      <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <h1>Hello who ever booked quest</h1>
        <MembersClient data={upcomingAppointments} userRole={currentuser}/>
      </div>
    </div>
    )
}

export default AppointmentList