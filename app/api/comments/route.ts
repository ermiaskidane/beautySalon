import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';

// GET ALL COMMENTS OF A POST
export const GET = async (req: Request) => {
  try {

    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get('postSlug');


    if (!postSlug) {
      return new NextResponse("postSlug is required", { status: 400 });
    }

    const comments = await db.comment.findMany({
      where: {
        ...(postSlug && { postSlug }), // Only include the condition if postSlug is provided.
      },
      include: {
        NestComments: {
          include: {
            user:{
              select: {
                name: true,
                imageUrl: true
              }
            }
          }
        },
        user: true,
      }
    });
    
    // console.log("SDSFDds", comments)

    return NextResponse.json(comments);
  } catch (err) {
    console.log("[COMMENT_ROUTES]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// // CREATE A COMMENT
export const POST = async (req: Request) => {
  try {
  // check if there is user

  
  const {userId} = auth()

  // console.log("WWWWWWWWWWWWWW", userId)
 
  const body = await req.json();

  // const body = await req.json();
  // console.log('Request Body:', body);

  const {comment, blogSlug, blogId} = body

  // console.log("FSJdgjsdfgksdfh", body)

  
  if(!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if(!comment) {
    return new NextResponse("comment is required", { status: 400 });
  }

  if(!blogId) {
    return new NextResponse("blogId is required", { status: 400 });
  }

  if(!blogSlug) {
    return new NextResponse("blogSlug is required", { status: 400 });
  }

  const user = await db.user.findFirst({
    where: {
      userId
    }
  });

  // Handle the possibility that user?.email is undefined
  const userEmail = user?.email || "default@example.com";

  if(userEmail === "default@example.com") {
    return new NextResponse("userEmail can not be null", { status: 400 });
  }
  
  const comments = await db.blog.update({
    where: {
      id: blogId
    },
    data: {
      comments: {
        create: {
          desc: comment,
          // postSlug: blogSlug, // Make sure to include postSlug here
          userEmail
        }
      }
    }
  });

  // console.log(">>>>>>>>>>>", comments)
    return NextResponse.json(comments);

  } catch (err) {
    console.log('[COMMENT_POST]', err)
    return new NextResponse("Internal Error", {status: 500})
  }
}