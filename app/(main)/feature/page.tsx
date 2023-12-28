import React from 'react'
import Procedure from '@/components/sections/Procedure'
import Appointment from '@/components/sections/Appointment'
import { initialProfile } from '@/lib/initail-profile'
import { redirect } from 'next/navigation'

const Feature = async () => {
  const user = await initialProfile()
  console.log("@@@@@@@@@@@@@", user)

  if (user) {
    return redirect(`/`);
  }

  return null
  //   return (
  //       <>
  //         {/* <Procedure /> */}
  //         <Appointment />
  //       </>
  //   )
}

export default Feature