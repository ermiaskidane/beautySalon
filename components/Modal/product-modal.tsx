"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from '../ui/modal';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from '../ui/button';
import ImageUpload from '../image-upload';
import { FileUpload } from '../file-upload';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onSubmit?: (data: ProductModalValues) => void;
}

const formSchema = z.object({
  imageUrl: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
})

type ProductModalValues = z.infer<typeof formSchema>

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  loading,
  onSubmit
}) => {

  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<ProductModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: '',
      name: "",
      description: "",
      price: 0
    }
  })

  // const onSubmit = async (data: ProductModalValues) => {
  //   console.log("DDDDDDDd", data)
  // };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal 
      title="Add products for sell"
      description=""
      isOpen={isOpen}
      onClose={onClose}>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                  <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                    {/* <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={loading} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
  )
}


export default ProductModal