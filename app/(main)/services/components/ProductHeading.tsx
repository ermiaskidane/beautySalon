"use client"

import ProductModal from '@/components/Modal/product-modal'
import { User } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { MouseEventHandler } from "react";
// import useProductModal from '@/hooks/use-product-modal'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

interface ProductHeadingProps {
  // OpenModal: (currentuser: User) => void
  currentUser: User | null
}


const ProductHeading: React.FC<ProductHeadingProps> = ({
  currentUser
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);

  // const ProductModal = useProductModal();

  const OpenModal = (currentUser: User) => {
    if (!currentUser || currentUser.role !== "ADMIN") {
      return null
    }

    setOpen(true)
  }

  console.log("SDDDDDDDDD", open)
  console.log("ASSSSSSSSSSSSSS", currentUser)

  // const onProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.stopPropagation();

  //   if (!currentUser || currentUser.role !== "ADMIN") {
  //     return null
  //   }

  //   ProductModal.onOpen({id: 1, name: "hello"});
  // };

  const onSubmit = async (data: any) => {
    console.log("gHHHHHHHHHHHHH", data)
    try {
      setLoading(true);
      // if (initialData) {
      //   await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      // } else {
        await axios.post(`/api/products`, data);
      // }
      router.refresh();
      router.push(`/services`);
      toast.success("successfully added");
      // close the productmodal
      setOpen(false)
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
    <ProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
      />
      <div className="flex justify-between items-center ">
        <h3 className="text-3xl font-bold text-gray-900">Feature Product</h3>

        {currentUser?.role === "ADMIN" && (
          <p className="font-bold !mb-0 text-[#FF817E] cursor-pointer"
          onClick={() => OpenModal(currentUser!)}
          // onClick={onProduct} 
          ><Plus className='inline w-5 h-5 -translate-y-0.5'/> Add Products</p>
        )}
      </div>
    </>
  )
}

export default ProductHeading