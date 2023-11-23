import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';

// CREATE A COMMENT
export const POST = async (req: Request, 
  {params}: {params: {userId: string}}) => {
  try {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const body = await req.json();

  const { nestDesc} = body

  console.log("£££££££££££", nestDesc)
  
  if (!id) {
    return new NextResponse("comment id is required", { status: 400 });
  }
  
  if(!params.userId) {
    return new NextResponse("User id is required", { status: 400 });
  }

  if(!nestDesc) {
    return new NextResponse("nestDesc is required", { status: 400 });
  }

  const user = await db.user.findFirst({
    where: {
      userId: params.userId
    }
  });


  // Handle the possibility that user?.email is undefined
  const userEmail = user?.email || "default@example.com";

  if(userEmail === "default@example.com") {
    return new NextResponse("userEmail can not be null", { status: 400 });
  }

  const comments = await db.comment.findFirst({
    where: {
      ...(id && { id }), // Only include the condition if comment id is provided.
    }
  });

  const commentsId = comments?.id || null;

  if(commentsId === null) {
    return new NextResponse("commentsId can not be null", { status: 400 });
  }
  
  const nestComment = await db.nestComment.create({
    data: {
      desc: nestDesc,
      userEmail,
      commentId: commentsId
    },
    include: {
      user: true,
      parentNest: true
    }
  })

  console.log("nestComment", nestComment)

    return NextResponse.json(nestComment);
  } catch (err) {
    console.log('[NESTCOMMENT_POST]', err)
    return new NextResponse("Internal Error", {status: 500})
  }
}