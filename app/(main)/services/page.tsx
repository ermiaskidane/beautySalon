import React from 'react'
// import Procedure from '@/components/sections/Procedure'
import Appointment from '@/components/sections/Appointment'
import Service from '@/components/sections/Service'

const services = () => {
    return (
        <>
        <h3 className="text-center mt-3">Our Service</h3>
          <Service />
          <Appointment />
        </>
    )
}

export default services