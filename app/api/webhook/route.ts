import Stripe from "stripe"
import { headers} from "next/headers"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request, res: Response) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  console.log("FFFFFFFFFFFf", body)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  console.log("AAAAAAAAAAAAAAAA", session)

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  console.log("eeeeeeeeeeeeee", event.type)

  const user = await db.user.findUnique({
    where: {
      id: session?.metadata?.userId
    }
  })

  if (!user) {
    return new NextResponse("No such user exists.", { status: 404 });
  }

  // check the event we want to listen
  if (event.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: {
        // check from the metadata we saved
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || '',
      },
      include: {
        orderItems: true,
      }
    })
  }
  // send receipt email
  try {
    const data = await resend.emails.send({
      from: 'LeospaBeauty <onboarding@resend.dev>',
      to: [user.email],
      subject:
          'Thanks for your order! This is your receipt.',
      html: `<p>Sent from: <onboarding@resend.dev></p>`,
    })
    
     NextResponse.json(data);
  } catch(error) {
    console.log('[WEBHOOK_POST]', error)
    return new NextResponse("Internal Error", {status: 500})
  }

  return new NextResponse(null, { status: 200 });
}