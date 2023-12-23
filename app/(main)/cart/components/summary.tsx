"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {Button} from "@/components/ui/button";
// import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Currency, { formatter } from "@/components/sections/products/currency";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  console.log(items)
  const removeAll = useCart((state) => state.removeAll);

  const fee = 1


  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id)
    });


    window.location = response.data.url;

    removeAll();
  }

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between w-full border-t border-gray-200 pt-4"></div>

          <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>
                  Subtotal
                </p>
                <p className='text-sm font-medium text-gray-900'>
                    {formatter.format(totalPrice)}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>Flat Transaction Fee</span>
                </div>
                <div className='text-sm font-medium text-gray-900'>
                  ${(fee)}
                </div>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='text-base font-medium text-gray-900'>
                  Order Total
                </div>
                <div className='text-base font-medium text-gray-900'>
                  {formatter.format(totalPrice + fee)}
                </div>
              </div>
            </div>

         {/* <Currency value={totalPrice} /> */}
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
 
export default Summary;