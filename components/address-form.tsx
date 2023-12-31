"use client"

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from './ui/modal';
import { Input } from './ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';
// import ImageUpload from '../image-upload';
import { FileUpload } from './file-upload';
import { Product } from '@prisma/client';
import useCart from '@/hooks/use-cart';
import axios from 'axios';
import useCountries from '@/hooks/useCountry';
import { useRouter } from 'next/navigation';

interface ProductModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  // loading: boolean;
  // onSubmit?: (data: ProductModalValues) => void;
  // initialData?: Product
}

const formSchema = z.object({
  country: z.string().min(1),
  streetAddress1: z.string().min(1),
  // to make optional minimam validation set to 0
  streetAddress2: z.string().min(0),
  city: z.string().min(1),
  county: z.string().min(0),
  postcode: z.string().min(1),
  phone: z.coerce.number().min(1),
  email: z.string().min(1),
})

type ProductModalValues = z.infer<typeof formSchema>

const AddressForm: React.FC<ProductModalProps> = ({
  // isOpen,
  // onClose,
  // loading,
  // onSubmit,
  // initialData
}) => {

  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const items = useCart((state) => state.items);

  const form = useForm<ProductModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      country: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      county: "",
      postcode: "",
      phone: null as any,
      email: ""
    }
  })

  const location = form.watch('country');

  const removeAll = useCart((state) => state.removeAll);
  const { getAll } = useCountries();

  //  cz setValue by it self doesnt rerender
  // // we have to customiz it 
  // const setCustomValue = (id: any, value: any) => {
  //   form.setValue(id, value, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true
  //   })
  // }

  // console.log("fhdjss", form.getValues)

//  const demo = [
//     {
//       value: 'AW',
//       label: 'Aruba',
//       flag: '🇦🇼',
//       latlng: [ 12.5, -69.96666666 ],
//       region: 'Americas'
//     },
//     {
//       value: 'AF',
//       label: 'Afghanistan',
//       flag: '🇦🇫',
//       latlng: [ 33, 65 ],
//       region: 'Asia'
//     },
//     {
//       value: 'AB',
//       label: 'India',
//       flag: '🇦🇫',
//       latlng: [ 33, 65 ],
//       region: 'Asia'
//     },
//     {
//       value: 'AC',
//       label: 'Pakistan',
//       flag: '🇦🇫',
//       latlng: [ 33, 65 ],
//       region: 'Asia'
//     }
//   ]

    // const result = demo.map((item) => {
    //   const { value, label } = item;
    //   return { value, label };
    // });

//     console.log(result);


  const onSubmit = async (data: any) => {
    console.log("gggggggggggggggg", data)
      const response = await axios.post(`/api/checkout`, {
      productIds: items.map((item) => item.id),
      addresses: data
    });

    // console.log("dsfsfsfs", response)
    // window.location = response.data.url;
    router.push(response.data.url)
    removeAll()
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full pb-3">
        <Form {...form}>
          {/* @ts-ignore */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-10/12 mx-auto md:w-3/4 lg:w-3/5">
          <div className="gap-2 flex flex-col md:gap-6 md:w-11/12 mx-auto">
          {/* <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Country/Region</FormLabel>
                    <FormControl>  */}
                      {/* Ensure that your Input components are initialized with a default value, 
                      even if it's an empty string, to prevent them from being uncontrolled initially.
                      by using the value we are overide the abstruct "value" from react-hook-form with the 
                      value={field.value || ''} to give them initialized default value  */}
                     {/* <Input disabled={loading} placeholder="Country" {...field} value={field.value || ''} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country</SelectLabel>
                      {getAll()
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map((nation) => (
                        <SelectItem key={nation.value}  value={nation.label}>
                          {nation.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </FormItem>
              )}
              />
              {/* <FormField
                control={form.control}
                name="country"
                defaultValue={demo[4]}
                render={({ field }) => (
                  // <Select
                  //   components={{ Option: CustomOption }}
                  //   options={getAll().map(country => ({ label: country.label, value: country.value }))}
                  //   isSearchable
                  //   // {...field}
                  //   value={field.value || ''}
                  //   onChange={(value) => setCustomValue("country", value)}
                  // />
                )}
              /> */}
            <FormField
                control={form.control}
                name="streetAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="House number and Street name" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="streetAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                    <Input disabled={loading} placeholder="Apartment, suite, unit, etc. (optional)" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Town/City</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="" {...field} value={field.value || ''} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="postal code" {...field} value={field.value || ''} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" disabled={loading} placeholder="" {...field} value={field.value ?? ''} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={loading} placeholder="" {...field}  value={field.value || ''} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-1/2 mt-8 self-center" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
      // </Modal>
      
  )
}



export default AddressForm