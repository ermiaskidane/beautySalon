import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import {db} from '@/lib/db';

// CREATE A POST
export async function POST (
  req: Request
)  {
  try {
    
  // const { userId } = auth();

  // console.log("mmmmmmmmmmmmmmmmmmm", auth())
  

  const body = await req.json();


  const { name, email, service, phone, appointmentDate, appointmentTime, notes} = body

  console.log("kkkkkkkkkkkkk", body)
  console.log("dddddddddddd", typeof phone)
  console.log("dddddddddddd", typeof appointmentDate)

  if (!name) {
    return new NextResponse("name is required", { status: 400 });
  }

  if (!email) {
    return new NextResponse("email is required", { status: 400 });
  }

  if (!service ) {
    return new NextResponse("service are required", { status: 400 });
  }

  if (!phone) {
    return new NextResponse("phone is required", { status: 400 });
  }

  if (!appointmentDate ) {
    return new NextResponse("appointmentDate are required", { status: 400 });
  }

  if (!appointmentTime ) {
    return new NextResponse("appointmentTime are required", { status: 400 });
  }
  if (!notes ) {
    return new NextResponse("notes are required", { status: 400 });
  }

  // const UserAdmin = await db.user.findFirst({
  //   where: {
  //     userId,
  //   },
  //   include: {
  //     blogs: true
  //   }
  // })
  // // console.log("kkkkkkkkkkkkk", UserAdmin)

  // if (UserAdmin?.role !== "ADMIN"){
  //   return new NextResponse("Unauthorized", { status: 405 });
  // }

  const book = await db.appointment.create({
    data: {
      name, 
      email,
      service, 
      phone,
      appointmentDate,
      appointmentTime,
      notes
    }
  })

  // // console.log(":::::::::::::::::::", post)

  return NextResponse.json(book);
  } catch(error) {
    console.log('[APPOINTMENT_API]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
