import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { format } from "date-fns";

import { db } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { appointmentId: string} }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.appointmentId) {
      return new NextResponse("appointment id is required", { status: 400 });
    }

    const UserAdmin = await db.user.findFirst({
      where: {
        userId
      }
    });
 
    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // console.log("SSSSSSSSSSSSSSSS", params.appointmentId, userId)
    const product = await db.appointment.delete({
      where: {
        id: params.appointmentId
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[MEMBER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};