"use client";

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
// import { Modal } from '../ui/modal';
import { Input } from './ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from './ui/button';
import ImageUpload from './image-upload';
import Modal from "@/components/Modal/modal";
import useProductModal from "@/hooks/use-product-modal";
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const formSchema = z.object({
  // imageUrl: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
})

type ProductModalValues = z.infer<typeof formSchema>
 
const ProductModals = () => {
  const productModal = useProductModal();
  const products = useProductModal((state) => state.data);

  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ProductModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // imageUrl: '',
      name: "",
      description: "",
      price:0
    }
  })


  const onSubmit = async (data: ProductModalValues) => {
    console.log("DDDDDDDd", data)
    try {
      setLoading(true);
      // await axios[products ? 'put' : 'post']("/api/products", data, {
      // if (initialData) {
      //   await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      // } else {
      //   await axios.post(`/api/${params.storeId}/billboards`, data);
      // }
      // router.refresh();
      // router.push(`/${params.storeId}/billboards`);
      // toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  console.log("AAAAAAAAAAAAAAAA", products)

  if (!products) {
    return null;
  }

  return ( 
    <Modal 
      open={productModal.isOpen} 
      onClose={productModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
          {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={loading} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Detail of product" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-1/2 mt-8 self-center" type="submit">
              create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
 
export default ProductModals;