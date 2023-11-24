"use client"

import React, { useState, useEffect } from 'react'
import * as z from "zod"
import axios from "axios"
import { Category } from '@prisma/client'
import Image from 'next/image'
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from 'react-quill'
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface WriteBlogProps {
  categories?: Category[]
}
interface State {
  title: string;
  catSlug: string;
  open: boolean;
}

const WriteBlog = ({
  categories
}: WriteBlogProps) => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null)
  const [value, setValue] = useState<string>("")
  const [state, setState] = useState<State>({
    title: '',
    catSlug: '',
    open: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

   const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleChangeCatSlug = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      catSlug: e.target.value,
    }));
  };

  const toggleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  // Define the slugify function
const slugify = (str: string): string =>
str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');

  const handleSubmit = async () => {
    // submit blog here
    if (!file) {
      return; // Don't proceed if file is null
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'upload')

      // send the image to cloudinary first
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )

      const { url } = uploadRes.data
      const response = await axios.post('/api/blog', {
        title: state.title,
        desc: value,
        img: url,
        slug: slugify(state.title),
        catSlug: state.catSlug || 'cloth', // If not selected, choose the general category
      });

      router.refresh();
      //set them back to initail state
      setState({
        title: '',
        catSlug: '',
        open: false,
      });
      router.push('/');
      toast.success("blog posted successfully")
    } catch(error: any){
      toast.error('Something went wrong.');
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className='relative flex flex-col'>
      <input 
        type="text" 
        placeholder='Title' 
        className='p-12 text-6xl border-none outline-none bg-transparent text-red'
        value={state.title}
        onChange={handleChangeTitle}
       />
       <select 
        className='mb-12 py-2 px-5 w-max'
        onChange={handleChangeCatSlug}
        value={state.catSlug}
       >
       {categories?.map((cat, i) =>  (
          <option key={i} value={cat.slug}>{cat?.title}</option>
       ))}
       </select>

       <div className="flex gap-5 h-full relative">
          <button 
          className="w-9 h-9 rounded-full 
          bg-transparent border-2 border-solid 
          border-gray-400 flex items-center 
          justify-center cursor-pointer"
          onClick={toggleOpen}
          >
            <Image src='/images/plus.png' alt='' width={14} height={14} />
          </button>

          {state.open && (
            <div className="flex gap-5 absolute bg-transparent w-screen z-50 left-12">
              <input 
                type="file"
                id="image"
                // onChange={(e) =>
                // setState((prevState) => ({
                //   ...prevState,
                //   file: e.target.files?.[0] || null,
                // }))}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className='hidden' />

                <button className='w-9 h-9 rounded-full 
                  bg-transparent border-2 border-solid 
                  flex items-center justify-center cursor-pointer 
                  border-lime-500'>
                    <label htmlFor='image'>
                      <Image src='/images/image.png' alt='' width={16} height={16} />
                    </label>
                  </button>
            </div>
          )}

          <ReactQuill 
            className='w-screen text-4xl'
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="Write your Blog..."/>
       </div>
       <button className="
        absolute top-0 right-0 py-2 
        px-5 border-none bg-green-600 
        text-white cursor-pointer rounded-2xl"
        onClick={handleSubmit}
        disabled={loading}
        >
        Publish
       </button>
    </div>
  )
}

export default WriteBlog