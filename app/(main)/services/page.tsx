import React from 'react'
// import Procedure from '@/components/sections/Procedure'
import Appointment from '@/components/sections/Appointment'
import Service from '@/components/sections/Service'
import NoResults from "@/components/ui/no-results";
import ProductCard from '@/components/sections/products/product-card';
import { db } from '@/lib/db';
import { Plus } from 'lucide-react';
import { currentProfile } from '@/lib/current-profile';
import { User } from '@prisma/client';
import ProductHeading from './components/ProductHeading';


const Services = async () => {
  const products = await db.product.findMany()

  const currentuser = await currentProfile()
  // console.log(":::::::::", currentuser) 

  // console.log("@@@@@@@@@@@@@@@", products) 

    return (
        <>
        <h3 className="text-center mt-3">Our Service</h3>
          <Service />

          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <div className=" space-y-4">
              <ProductHeading currentUser={currentuser}/>
              {products.length === 0 && <NoResults/>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
              </div>
            </div>
          </div>
          {/* <Appointment /> */}
        </>
    )
}

export default Services