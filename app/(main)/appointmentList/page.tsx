import React from 'react'
import { CustomerClient } from './components/client'
import { format, parseISO } from "date-fns";
import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { Appointment, User } from '@prisma/client'
import { redirectToSignIn } from '@clerk/nextjs';

const AppointmentList = async () => {
  const currentuser: User | null = await currentProfile()
  const bookedAppointment = await db.appointment.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  })


  if (!currentuser) {
    return redirectToSignIn();
  }

  // Function to check if a given appointment is in the past
const isAppointmentInPast = (bookedAppointment: Appointment) => {
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

    return (
      <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className='text-center'>List of client appointment</h2>
        <CustomerClient data={upcomingAppointments} userRole={currentuser}/>
      </div>
    </div>
    )
}

export default AppointmentList