'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({
  orderEmail,
  orderId,
  isPaid,
}: PaymentStatusProps) => {
  const router = useRouter()
  const [polling, setPolling] = useState(true)

  useEffect(() => {
    const pollOrderStatus = async () => {
      try {
        const response = await axios.get(`/api/checkout?orderId=${orderId}`);
        const { isPaid: updatedIsPaid} = response.data;

        if(updatedIsPaid) {
          setPolling(false)
          router.refresh
        }
      } catch(error) {
          console.log('Error polling for payment status', error)
        }
      };

      //make the periodic request every 5 second
      const intervalId = setInterval(() => {
        if (!isPaid && polling) {
          pollOrderStatus()
      }
    },5000);

    return () => clearInterval(intervalId) // cleanUp on component unmount
    }, [isPaid, orderId, polling, router])

  return (
    <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
      <div>
        <p className='font-medium text-gray-900'>
          Shipping To
        </p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className='font-medium text-gray-900'>
          Order Status
        </p>
        <p>
          {isPaid
            ? 'Payment successful'
            : 'Pending payment'}
        </p>
      </div>
    </div>
  )
}

export default PaymentStatus
