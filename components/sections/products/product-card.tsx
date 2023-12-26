"use client";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { Edit, Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "@/components/ui/icon-button";

// import Currency  from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import Currency from "./currency";
import useCart from "@/hooks/use-cart";
import { Product, User } from "@prisma/client";
import ProductModal from "@/components/Modal/product-modal";
import axios from "axios";
import toast from "react-hot-toast";

interface ProductCard {
  items: Product,
  currentUser: User | null
}

const ProductCard: React.FC<ProductCard> = ({
  items,
  currentUser
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    // router.push(`/product/${data?.id}`);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.patch(`/api/products/${items.id}`, data);
      router.refresh();
      router.push(`/services`);
      toast.success("product updated");
      // close the productmodal
      setOpen(false)
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const OpenModal = (currentUser: User) => {
    if (!currentUser || currentUser.role !== "ADMIN") {
      return null
    }

    setOpen(true)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(items);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(items);
  };
  
  return ( 
    <>
    <ProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
        initialData={items}
      />

    {/* note: that parentto and childto (defined global css) are working the hover effect instead of group tailwindcss property */}
    <div onClick={handleClick} className="bg-white parentto cursor-pointer rounded-xl border p-3 space-y-4 relative" >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        {currentUser?.role === "ADMIN" && (
          <div className="absolute top-1 right-2 z-50 opacity-0 childto bg-white p-2 rounded-full" onClick={() => OpenModal(currentUser!)}>
            <Edit className=" text-[#ff817e] rounded hover:scale-110" />
          </div>
        )}
        <Image 
          // src={data.images?.[0]?.url} 
          src={items.image}
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 childto transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-medium text-lg m-0 text-gray-900">{items.name}</p>
        <p className="text-sm text-gray-500">hair beauty oil</p>
        {/* <p className="text-sm text-gray-500">{data.category?.name}</p> */}
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={items?.price} />
      </div>
    </div>
    </>
  );
}

export default ProductCard;