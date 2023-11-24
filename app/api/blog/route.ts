import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import {db} from '@/lib/db';

// CREATE A POST
export async function POST (
  req: Request
)  {
  try {
    
  const { userId } = auth();

  // console.log("mmmmmmmmmmmmmmmmmmm", auth())
  

  const body = await req.json();

  const { title, desc, slug, catSlug, img} = body

  console.log("kkkkkkkkkkkkk", body)

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if (!title) {
    return new NextResponse("title is required", { status: 400 });
  }

  if (!desc ) {
    return new NextResponse("desc are required", { status: 400 });
  }

  if (!slug) {
    return new NextResponse("slug is required", { status: 400 });
  }

  if (!catSlug ) {
    return new NextResponse("catSlug are required", { status: 400 });
  }

  const UserAdmin = await db.user.findFirst({
    where: {
      userId,
    },
    include: {
      blogs: true
    }
  })
  // console.log("kkkkkkkkkkkkk", UserAdmin)

  if (UserAdmin?.role !== "ADMIN"){
    return new NextResponse("Unauthorized", { status: 405 });
  }

  const post = await db.blog.create({
    data: {
      title, 
      desc,
      img, 
      slug, 
      catSlug,
      userEmail: UserAdmin.email
    }
  })

  // console.log(":::::::::::::::::::", post)

  return NextResponse.json(post);
  } catch(error) {
    console.log('[BLOG_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
