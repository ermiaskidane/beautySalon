import React from 'react'
import Procedure from '@/components/sections/Procedure'
import Appointment from '@/components/sections/Appointment'
import { initialProfile } from '@/lib/initail-profile'

const Feature = async () => {
  const user = await initialProfile()
  console.log("@@@@@@@@@@@@@", user)
    return (
        <>
          {/* <Procedure /> */}
          <Appointment />
        </>
    )
}

export default Feature