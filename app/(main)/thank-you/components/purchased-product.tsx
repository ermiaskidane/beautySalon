"use client"

import { formatter } from '@/components/sections/products/currency'
import { Order, Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface PurchasedProductProps {
  product: Product
  order: Order
}

const PurchasedProduct: React.FC<PurchasedProductProps> = ({
  product, order
}) => {
  return (
    <>
       <li
        key={product.id}
        className='flex space-x-6 py-3'>
        <div className='relative h-16 w-16'>
            <Image
              fill
              src={product.image}
              alt={`${product.name} image`}
              className='flex-none rounded-md bg-gray-100 object-cover object-center'
            />
        </div>

        <div className='flex-auto flex flex-col justify-between'>
          <div className='space-y-1'>
            <h3 className='text-lg text-gray-900'>
              {product.name}
            </h3>

            {/* <p className='my-1'>
              Category: {label}
            </p> */}
          </div>

          {order.isPaid ? (
            <a
              // href={downloadUrl}
              download={product.name}
              className='text-blue-600 hover:underline underline-offset-2'>
              Download asset
            </a>
          ) : null}
        </div>

        <p className='flex-none font-medium text-gray-900'>
          {formatter.format(product.price)}
        </p>
      </li>
    </>
  )
}

export default PurchasedProduct