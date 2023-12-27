import Image from 'next/image'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { currentProfile } from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { Product, User } from '@prisma/client'
import { formatter } from '@/components/sections/products/currency'
import PurchasedProduct from './components/purchased-product'
import TotalPrice from './components/totalPrice'
import PaymentStatus from './components/paymentStatus'
// import PaymentStatus from '@/components/PaymentStatus'

interface PageProps {
  searchParams: {
    orderId: string | undefined
  }
  // searchParams: {
  //   [key: string]: string | string[] | undefined
  // }
}

const ThankYouPage = async ({
  searchParams,
}: PageProps) => {
  const orderId = searchParams.orderId

  const order = await db.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      user: true,
      orderItems: {
        include:{
          product: true
        }
      }
    }
  })

  // console.log("order", order)
  if (!order) return notFound()

  const currentuser = await currentProfile()

  // console.log("currentuser", currentuser)
  // http://localhost:3001/thank-you?orderId=6580976ba358785352886e7f
  // http://localhost:3000/thank-you?orderId=6580976ba358785352886e7f
  // http://localhost:3000/thank-you?orderId=6581cc0fb2cf1faf314e66e0
  if (order.userId !== currentuser?.id) {
    return redirect(
      `/sign-in?origin=thank-you?orderId=${orderId}`
    )
  } 

  // console.log("EEEEEEEEEEE", orderId)
  
  const products = order.orderItems.map((item) => item.product) as Product[]

  // console.log("SSSSSSSSSSSSSSSS", products)

  const orderTotal = products.reduce((total, product) => {
    return total + product.price
  }, 0)

  // console.log("AAAAAAAAAAAAAAAAA", orderTotal, typeof orderTotal)

  return (
    <main className='relative lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        {/* <Image
          fill
          src='/checkout-thank-you.jpg'
          className='h-full w-full object-cover object-center'
          alt='thank you for your order'
        /> */}
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-20 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium text-blue-600'>
              Order successful
            </p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Thanks for ordering
            </h1>
            {order.isPaid ? (
              <p className='mt-2 text-base text-muted-foreground'>
                Your order was processed and your assets are
                available to download below. We&apos;ve sent
                your receipt and order details to{' '}
                {typeof order.user !== 'string' ? (
                  <span className='font-medium text-gray-900'>
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className='mt-2 text-base text-muted-foreground'>
                We appreciate your order, and we&apos;re
                currently processing it. So hang tight and
                we&apos;ll send you confirmation very soon!
              </p>
            )}

            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>
                Order nr.
              </div>
              <div className='mt-2 text-gray-900'>
                {order.id}
              </div>

              <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                {(products as Product[]).map(
                  (product) => (
                    <PurchasedProduct key={product.id} product={product} order={order} />
                  )
                )}
              </ul>

              <TotalPrice orderTotal={orderTotal}/>

              <PaymentStatus
                isPaid={order.isPaid}
                orderEmail={(order.user as User).email}
                orderId={order.id}
              />

              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                <Link
                  href='/services'
                  className='text-sm font-medium text-blue-600 hover:text-blue-500'>
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage
