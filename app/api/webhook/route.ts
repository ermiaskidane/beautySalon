import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { Resend } from "resend"
import { ReceiptEmailHtml } from "@/components/emails/ReceiptEmail"
import { Product } from "@prisma/client"
import { formatISO } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY)

// defined custome type of OrderItems
interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
}


export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  // console.log("FFFFFFFFFFFf", body)

  // Webhook Error: The "key" argument must be of type string or an instance of ArrayBuffer, Buffer, TypedArray, DataView, KeyObject, or CryptoKey. Received undefined
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
  const email = session?.customer_details?.email;
  const shippingAddress = session?.shipping_details?.address

  console.log("AAAAAAAAAAAAAAAA", session)
  console.log("AAAAAAAAAAAAAAAA", session?.shipping_details?.address)
  
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

  const shippingComponents = [
    shippingAddress?.line1,
    shippingAddress?.line2,
    shippingAddress?.city,
    shippingAddress?.state,
    shippingAddress?.postal_code,
    shippingAddress?.country
  ]

  const addressString = addressComponents.filter((c) => c !== null).join(', ');
  const shippingString = shippingComponents.filter((c) => c !== null).join(', ');

  // console.log("eeeeeeeeeeeeee", addressString)


  const user = await db.user.findFirst({
    where: {
      id: session?.metadata?.userId
    }
  })

  console.log("$$$$$$$$$$$$$$$", user)
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
        ShippingAddress: shippingString,
        email: email || '',
        phone: session?.customer_details?.phone || '',
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
      }
    })
 
    console.log("%%%%%%%%%%%%%%%", order)
    // send receipt email
    const formattedDate = formatISO(new Date());
    try {
      const data = await resend.emails.send({
        from: 'LeospaBeauty <onboarding@resend.dev>',
        to: [user.email],
        subject:
            'Thanks for your order! This is your receipt.',
        // html: `<p>Sent from: <onboarding@resend.dev></p>`,
        html: ReceiptEmailHtml({
          date: formattedDate,
          email: user.email,
          orderId: session?.metadata?.orderId,
          products: order.orderItems as OrderItem[],
        }),
      })
      
        NextResponse.json(data);
    } catch(error) {
      console.log('[WEBHOOK_POST]', error)
      return new NextResponse("Internal Error", {status: 500})
    }
  }

  
  

  return new NextResponse(null, { status: 200 });
}