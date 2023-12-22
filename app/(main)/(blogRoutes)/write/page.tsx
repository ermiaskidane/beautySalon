import WriteBlog from '@/components/sections/blogSec/writeBlog'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
// import { initialUser } from '@/lib/initial-user'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const WritePage = async() =>{

  const currentuser = await currentProfile()

  if (!currentuser) {
    return redirectToSignIn();
  } 

  // if(currentuser.role === "GUEST"  ){
  //   redirect("/");
  // }

  const categories = await db.category.findMany()
  // console.log("categories", categories)
  return (
    <div className='m-4'>
      <WriteBlog categories={categories}/>
    </div>
  )
}

export default WritePage